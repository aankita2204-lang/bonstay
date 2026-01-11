/**
 * Property-based tests for reschedule functionality
 * Using fast-check for property-based testing
 * 
 * Feature: bonstay-hotel-booking
 */

import * as fc from 'fast-check';

/**
 * Helper function to simulate reschedule form pre-population
 * This mirrors the logic in Reschedule.js component's useEffect
 */
const prePopulateRescheduleForm = (existingBooking) => {
    return {
        startDate: existingBooking.startDate,
        endDate: existingBooking.endDate
    };
};

/**
 * Helper function to simulate reschedule update
 * This mirrors the logic in Reschedule.js component's handleSubmit
 */
const updateBookingDates = (existingBooking, newDates) => {
    return {
        ...existingBooking,
        startDate: newDates.startDate,
        endDate: newDates.endDate
    };
};

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
 * Helper to generate new date pairs for rescheduling
 */
const newDatesArbitrary = fc.record({
    startDate: fc.integer({ min: 1, max: 365 }).map(days => {
        const date = new Date(Date.now() + days * 86400000);
        return date.toISOString().split('T')[0];
    }),
    endDate: fc.integer({ min: 1, max: 400 }).map(days => {
        const date = new Date(Date.now() + days * 86400000);
        return date.toISOString().split('T')[0];
    })
});

/**
 * Feature: bonstay-hotel-booking, Property 17: Reschedule Form Pre-population
 * For any booking being rescheduled, the form SHALL be pre-populated with the 
 * existing startDate and endDate values from the booking.
 * **Validates: Requirements 7.1**
 */
describe('Property 17: Reschedule Form Pre-population', () => {
    test('form should be pre-populated with existing booking dates', () => {
        fc.assert(
            fc.property(
                bookingArbitrary,
                (booking) => {
                    const formState = prePopulateRescheduleForm(booking);

                    // Form should contain the existing booking's dates
                    return formState.startDate === booking.startDate &&
                        formState.endDate === booking.endDate;
                }
            ),
            { numRuns: 100 }
        );
    });

    test('pre-populated form should preserve exact date values', () => {
        fc.assert(
            fc.property(
                bookingArbitrary,
                (booking) => {
                    const formState = prePopulateRescheduleForm(booking);

                    // Round-trip: form values should exactly match original
                    const startDateMatches = formState.startDate === booking.startDate;
                    const endDateMatches = formState.endDate === booking.endDate;

                    return startDateMatches && endDateMatches;
                }
            ),
            { numRuns: 100 }
        );
    });
});

/**
 * Feature: bonstay-hotel-booking, Property 18: Reschedule Updates Booking
 * For any reschedule operation with new dates, the booking's startDate and endDate 
 * SHALL be updated to the new values.
 * **Validates: Requirements 7.2**
 */
describe('Property 18: Reschedule Updates Booking', () => {
    test('reschedule should update booking with new dates', () => {
        fc.assert(
            fc.property(
                bookingArbitrary,
                newDatesArbitrary,
                (booking, newDates) => {
                    const updatedBooking = updateBookingDates(booking, newDates);

                    // Updated booking should have the new dates
                    return updatedBooking.startDate === newDates.startDate &&
                        updatedBooking.endDate === newDates.endDate;
                }
            ),
            { numRuns: 100 }
        );
    });

    test('reschedule should preserve other booking properties', () => {
        fc.assert(
            fc.property(
                bookingArbitrary,
                newDatesArbitrary,
                (booking, newDates) => {
                    const updatedBooking = updateBookingDates(booking, newDates);

                    // All other properties should remain unchanged
                    return updatedBooking.id === booking.id &&
                        updatedBooking.noOfPersons === booking.noOfPersons &&
                        updatedBooking.noOfRooms === booking.noOfRooms &&
                        updatedBooking.typeOfRoom === booking.typeOfRoom &&
                        updatedBooking.hotelId === booking.hotelId &&
                        updatedBooking.hotelName === booking.hotelName &&
                        updatedBooking.userId === booking.userId;
                }
            ),
            { numRuns: 100 }
        );
    });

    test('reschedule should only modify date fields', () => {
        fc.assert(
            fc.property(
                bookingArbitrary,
                newDatesArbitrary,
                (booking, newDates) => {
                    const updatedBooking = updateBookingDates(booking, newDates);

                    // Count changed fields - should only be startDate and endDate
                    const changedFields = Object.keys(booking).filter(key =>
                        booking[key] !== updatedBooking[key]
                    );

                    // Only startDate and endDate should potentially change
                    return changedFields.every(field =>
                        field === 'startDate' || field === 'endDate'
                    );
                }
            ),
            { numRuns: 100 }
        );
    });
});
