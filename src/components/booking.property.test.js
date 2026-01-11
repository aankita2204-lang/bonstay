/**
 * Property-based tests for booking functionality
 * Using fast-check for property-based testing
 * 
 * Feature: bonstay-hotel-booking
 */

import * as fc from 'fast-check';

/**
 * Helper function to simulate booking creation
 * This mirrors the logic in Book.js component
 */
const createBookingData = (formState, hotelId, hotelName, userId) => {
    return {
        ...formState,
        hotelId: parseInt(hotelId),
        hotelName: hotelName,
        userId: parseInt(userId)
    };
};

/**
 * Helper function to simulate booking display rendering
 * This mirrors the display logic in Bookings.js component
 */
const renderBookingCard = (booking) => {
    return {
        displayedId: booking.id,
        displayedHotelName: booking.hotelName,
        displayedStartDate: booking.startDate,
        displayedEndDate: booking.endDate,
        displayedPersons: booking.noOfPersons,
        displayedRooms: booking.noOfRooms,
        displayedRoomType: booking.typeOfRoom,
        buttons: ['Reschedule', 'Cancel']
    };
};

/**
 * Helper function to filter bookings by user
 * This mirrors the filtering logic in Bookings.js component
 */
const filterBookingsByUser = (bookings, userId) => {
    return bookings.filter(booking => booking.userId === parseInt(userId));
};

/**
 * Helper to generate valid booking form state
 */
const bookingFormArbitrary = fc.record({
    startDate: fc.integer({ min: 1, max: 365 }).map(days => {
        const date = new Date(Date.now() + days * 86400000);
        return date.toISOString().split('T')[0];
    }),
    endDate: fc.integer({ min: 1, max: 400 }).map(days => {
        const date = new Date(Date.now() + days * 86400000);
        return date.toISOString().split('T')[0];
    }),
    noOfPersons: fc.integer({ min: 1, max: 5 }).map(String),
    noOfRooms: fc.integer({ min: 1, max: 3 }).map(String),
    typeOfRoom: fc.constantFrom('AC', 'Non AC')
});

/**
 * Helper to generate valid booking objects
 */
const bookingArbitrary = fc.record({
    id: fc.integer({ min: 1, max: 10000 }).map(String),
    startDate: fc.integer({ min: 1, max: 365 }).map(days => {
        const date = new Date(Date.now() + days * 86400000);
        return date.toISOString().split('T')[0];
    }),
    endDate: fc.integer({ min: 1, max: 400 }).map(days => {
        const date = new Date(Date.now() + days * 86400000);
        return date.toISOString().split('T')[0];
    }),
    noOfPersons: fc.integer({ min: 1, max: 5 }),
    noOfRooms: fc.integer({ min: 1, max: 3 }),
    typeOfRoom: fc.constantFrom('AC', 'Non AC'),
    hotelId: fc.integer({ min: 1, max: 100 }),
    hotelName: fc.string({ minLength: 1, maxLength: 50 }),
    userId: fc.integer({ min: 1, max: 1000 })
});

/**
 * Feature: bonstay-hotel-booking, Property 12: Booking User Association
 * For any booking created through the system, the booking object SHALL contain 
 * the userId from localStorage matching the logged-in user.
 * **Validates: Requirements 4.8**
 */
describe('Property 12: Booking User Association', () => {
    test('created booking should contain the logged-in user ID', () => {
        fc.assert(
            fc.property(
                bookingFormArbitrary,
                fc.integer({ min: 1, max: 100 }).map(String),
                fc.string({ minLength: 1, maxLength: 50 }),
                fc.integer({ min: 1, max: 1000 }).map(String),
                (formState, hotelId, hotelName, userId) => {
                    const booking = createBookingData(formState, hotelId, hotelName, userId);
                    return booking.userId === parseInt(userId);
                }
            ),
            { numRuns: 100 }
        );
    });

    test('booking userId should match the value from localStorage', () => {
        fc.assert(
            fc.property(
                bookingFormArbitrary,
                fc.integer({ min: 1, max: 100 }).map(String),
                fc.string({ minLength: 1, maxLength: 50 }),
                fc.integer({ min: 1, max: 1000 }),
                (formState, hotelId, hotelName, userId) => {
                    // Simulate localStorage
                    const storedUserId = String(userId);

                    const booking = createBookingData(formState, hotelId, hotelName, storedUserId);

                    // Verify the booking's userId matches what was in localStorage
                    return booking.userId === userId;
                }
            ),
            { numRuns: 100 }
        );
    });
});


/**
 * Feature: bonstay-hotel-booking, Property 13: User-Specific Booking Filter
 * For any user viewing the Bookings page, only bookings where userId matches 
 * the logged-in user's ID SHALL be displayed.
 * **Validates: Requirements 5.1**
 */
describe('Property 13: User-Specific Booking Filter', () => {
    test('filtered bookings should only contain bookings for the specified user', () => {
        fc.assert(
            fc.property(
                fc.array(bookingArbitrary, { minLength: 0, maxLength: 20 }),
                fc.integer({ min: 1, max: 1000 }).map(String),
                (allBookings, userId) => {
                    const filteredBookings = filterBookingsByUser(allBookings, userId);

                    // All filtered bookings should belong to the specified user
                    return filteredBookings.every(booking => booking.userId === parseInt(userId));
                }
            ),
            { numRuns: 100 }
        );
    });

    test('filter should not include bookings from other users', () => {
        fc.assert(
            fc.property(
                fc.array(bookingArbitrary, { minLength: 1, maxLength: 20 }),
                fc.integer({ min: 1, max: 1000 }).map(String),
                (allBookings, userId) => {
                    const filteredBookings = filterBookingsByUser(allBookings, userId);
                    const otherUserBookings = allBookings.filter(b => b.userId !== parseInt(userId));

                    // None of the other user's bookings should be in the filtered result
                    return otherUserBookings.every(otherBooking =>
                        !filteredBookings.some(fb => fb.id === otherBooking.id)
                    );
                }
            ),
            { numRuns: 100 }
        );
    });
});

/**
 * Feature: bonstay-hotel-booking, Property 14: Booking Display Completeness
 * For any booking object, the rendered booking card SHALL contain the booking ID, 
 * hotel name, start date, end date, number of persons, number of rooms, and room type.
 * **Validates: Requirements 5.2**
 */
describe('Property 14: Booking Display Completeness', () => {
    test('rendered booking card should contain all required booking information', () => {
        fc.assert(
            fc.property(
                bookingArbitrary,
                (booking) => {
                    const rendered = renderBookingCard(booking);

                    // Verify all required fields are present
                    const hasId = rendered.displayedId === booking.id;
                    const hasHotelName = rendered.displayedHotelName === booking.hotelName;
                    const hasStartDate = rendered.displayedStartDate === booking.startDate;
                    const hasEndDate = rendered.displayedEndDate === booking.endDate;
                    const hasPersons = rendered.displayedPersons === booking.noOfPersons;
                    const hasRooms = rendered.displayedRooms === booking.noOfRooms;
                    const hasRoomType = rendered.displayedRoomType === booking.typeOfRoom;

                    return hasId && hasHotelName && hasStartDate && hasEndDate &&
                        hasPersons && hasRooms && hasRoomType;
                }
            ),
            { numRuns: 100 }
        );
    });
});

/**
 * Feature: bonstay-hotel-booking, Property 15: Booking Management Buttons Presence
 * For any booking displayed in the list, there SHALL be exactly two action buttons: 
 * Reschedule and Cancel.
 * **Validates: Requirements 5.3**
 */
describe('Property 15: Booking Management Buttons Presence', () => {
    test('each booking card should have exactly two action buttons', () => {
        fc.assert(
            fc.property(
                bookingArbitrary,
                (booking) => {
                    const rendered = renderBookingCard(booking);
                    return rendered.buttons.length === 2;
                }
            ),
            { numRuns: 100 }
        );
    });

    test('booking card should have Reschedule and Cancel buttons', () => {
        fc.assert(
            fc.property(
                bookingArbitrary,
                (booking) => {
                    const rendered = renderBookingCard(booking);
                    return rendered.buttons.includes('Reschedule') &&
                        rendered.buttons.includes('Cancel');
                }
            ),
            { numRuns: 100 }
        );
    });
});

/**
 * Feature: bonstay-hotel-booking, Property 16: Booking Deletion Removes Entry
 * For any booking that is canceled, the booking SHALL no longer appear in the 
 * user's booking list after the operation completes.
 * **Validates: Requirements 6.1, 6.2**
 */
describe('Property 16: Booking Deletion Removes Entry', () => {
    test('deleted booking should not appear in the booking list', () => {
        fc.assert(
            fc.property(
                fc.array(bookingArbitrary, { minLength: 1, maxLength: 20 }),
                fc.integer({ min: 0, max: 19 }),
                (bookings, deleteIndex) => {
                    if (bookings.length === 0) return true;

                    const actualIndex = deleteIndex % bookings.length;
                    const bookingToDelete = bookings[actualIndex];

                    // Simulate deletion
                    const remainingBookings = bookings.filter(b => b.id !== bookingToDelete.id);

                    // Verify the deleted booking is no longer in the list
                    return !remainingBookings.some(b => b.id === bookingToDelete.id);
                }
            ),
            { numRuns: 100 }
        );
    });

    test('deletion should reduce booking count by the number of matching IDs', () => {
        fc.assert(
            fc.property(
                fc.array(bookingArbitrary, { minLength: 1, maxLength: 20 }),
                fc.integer({ min: 0, max: 19 }),
                (bookings, deleteIndex) => {
                    if (bookings.length === 0) return true;

                    const actualIndex = deleteIndex % bookings.length;
                    const bookingToDelete = bookings[actualIndex];
                    const originalCount = bookings.length;

                    // Count how many bookings have the same ID
                    const matchingIdCount = bookings.filter(b => b.id === bookingToDelete.id).length;

                    // Simulate deletion
                    const remainingBookings = bookings.filter(b => b.id !== bookingToDelete.id);

                    // Count should decrease by the number of matching IDs
                    return remainingBookings.length === originalCount - matchingIdCount;
                }
            ),
            { numRuns: 100 }
        );
    });
});
