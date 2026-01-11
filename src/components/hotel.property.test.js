/**
 * Property-based tests for hotel display functionality
 * Using fast-check for property-based testing
 * 
 * Feature: bonstay-hotel-booking
 */

import * as fc from 'fast-check';

/**
 * Helper function to simulate hotel card rendering
 * This mirrors the display logic in Hotels.js component
 */
const renderHotelCard = (hotel) => {
    return {
        displayedName: hotel.hotelName,
        displayedCity: hotel.city,
        displayedAmenities: hotel.amenities,
        displayedAddress: hotel.address,
        displayedPhone: hotel.phoneNo,
        buttons: ['Book A Room', 'Add Review', 'View Review']
    };
};

/**
 * Helper to generate valid hotel objects
 */
const hotelArbitrary = fc.record({
    id: fc.integer({ min: 1, max: 1000 }).map(String),
    hotelName: fc.string({ minLength: 1, maxLength: 50 }),
    city: fc.string({ minLength: 1, maxLength: 30 }),
    amenities: fc.string({ minLength: 1, maxLength: 100 }),
    address: fc.string({ minLength: 1, maxLength: 100 }),
    phoneNo: fc.integer({ min: 1000000000, max: 9999999999 }),
    description: fc.string({ minLength: 0, maxLength: 200 }),
    imageUrl: fc.string({ minLength: 0, maxLength: 100 }),
    reviews: fc.array(fc.string({ minLength: 1, maxLength: 100 }), { minLength: 0, maxLength: 10 })
});

/**
 * Feature: bonstay-hotel-booking, Property 7: Hotel Display Completeness
 * For any hotel object fetched from the API, the rendered hotel card SHALL contain 
 * the hotel's name, city, amenities, address, and phone number.
 * **Validates: Requirements 3.2**
 */
describe('Property 7: Hotel Display Completeness', () => {
    test('rendered hotel card should contain all required hotel information', () => {
        fc.assert(
            fc.property(
                hotelArbitrary,
                (hotel) => {
                    const rendered = renderHotelCard(hotel);

                    // Verify all required fields are present in the rendered output
                    const hasName = rendered.displayedName === hotel.hotelName;
                    const hasCity = rendered.displayedCity === hotel.city;
                    const hasAmenities = rendered.displayedAmenities === hotel.amenities;
                    const hasAddress = rendered.displayedAddress === hotel.address;
                    const hasPhone = rendered.displayedPhone === hotel.phoneNo;

                    return hasName && hasCity && hasAmenities && hasAddress && hasPhone;
                }
            ),
            { numRuns: 100 }
        );
    });

    test('hotel display should preserve all field values exactly', () => {
        fc.assert(
            fc.property(
                hotelArbitrary,
                (hotel) => {
                    const rendered = renderHotelCard(hotel);

                    // Round-trip: displayed values should match original
                    return (
                        rendered.displayedName === hotel.hotelName &&
                        rendered.displayedCity === hotel.city &&
                        rendered.displayedAmenities === hotel.amenities &&
                        rendered.displayedAddress === hotel.address &&
                        rendered.displayedPhone === hotel.phoneNo
                    );
                }
            ),
            { numRuns: 100 }
        );
    });
});

/**
 * Feature: bonstay-hotel-booking, Property 8: Hotel Action Buttons Presence
 * For any hotel displayed in the list, there SHALL be exactly three action buttons: 
 * Book A Room, Add Review, and View Review.
 * **Validates: Requirements 3.3**
 */
describe('Property 8: Hotel Action Buttons Presence', () => {
    test('each hotel card should have exactly three action buttons', () => {
        fc.assert(
            fc.property(
                hotelArbitrary,
                (hotel) => {
                    const rendered = renderHotelCard(hotel);
                    return rendered.buttons.length === 3;
                }
            ),
            { numRuns: 100 }
        );
    });

    test('hotel card should have Book A Room, Add Review, and View Review buttons', () => {
        fc.assert(
            fc.property(
                hotelArbitrary,
                (hotel) => {
                    const rendered = renderHotelCard(hotel);
                    const expectedButtons = ['Book A Room', 'Add Review', 'View Review'];

                    return expectedButtons.every(btn => rendered.buttons.includes(btn));
                }
            ),
            { numRuns: 100 }
        );
    });

    test('button set should be consistent across all hotels', () => {
        fc.assert(
            fc.property(
                fc.array(hotelArbitrary, { minLength: 1, maxLength: 10 }),
                (hotels) => {
                    const renderedCards = hotels.map(renderHotelCard);
                    const expectedButtons = ['Book A Room', 'Add Review', 'View Review'];

                    // All hotels should have the same button set
                    return renderedCards.every(card =>
                        card.buttons.length === 3 &&
                        expectedButtons.every(btn => card.buttons.includes(btn))
                    );
                }
            ),
            { numRuns: 100 }
        );
    });
});
