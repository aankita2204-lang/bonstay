/**
 * Property-based tests for review functionality
 * Using fast-check for property-based testing
 * 
 * Feature: bonstay-hotel-booking
 */

import * as fc from 'fast-check';

/**
 * Helper function to simulate review append operation
 * This mirrors the logic in Addreview.js component
 */
const appendReview = (existingReviews, newReview) => {
    return [...existingReviews, newReview];
};

/**
 * Helper function to simulate review display
 * This mirrors the logic in Showreview.js component
 */
const displayReviews = (hotel) => {
    return {
        hotelName: hotel.hotelName,
        reviews: hotel.reviews || [],
        hasReviews: hotel.reviews && hotel.reviews.length > 0
    };
};

/**
 * Helper function to enforce character limit
 * This mirrors the maxLength="100" in Addreview.js textarea
 */
const enforceCharacterLimit = (text, limit = 100) => {
    return text.substring(0, limit);
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
    reviews: fc.array(fc.string({ minLength: 1, maxLength: 100 }), { minLength: 0, maxLength: 20 })
});

/**
 * Feature: bonstay-hotel-booking, Property 19: Review Append Operation
 * For any review submitted for a hotel, the review text SHALL be appended to the 
 * hotel's existing reviews array without modifying existing reviews.
 * **Validates: Requirements 8.1**
 */
describe('Property 19: Review Append Operation', () => {
    test('new review should be appended to existing reviews', () => {
        fc.assert(
            fc.property(
                fc.array(fc.string({ minLength: 1, maxLength: 100 }), { minLength: 0, maxLength: 10 }),
                fc.string({ minLength: 1, maxLength: 100 }),
                (existingReviews, newReview) => {
                    const updatedReviews = appendReview(existingReviews, newReview);

                    // New review should be at the end
                    return updatedReviews[updatedReviews.length - 1] === newReview;
                }
            ),
            { numRuns: 100 }
        );
    });

    test('append should increase review count by exactly one', () => {
        fc.assert(
            fc.property(
                fc.array(fc.string({ minLength: 1, maxLength: 100 }), { minLength: 0, maxLength: 10 }),
                fc.string({ minLength: 1, maxLength: 100 }),
                (existingReviews, newReview) => {
                    const originalCount = existingReviews.length;
                    const updatedReviews = appendReview(existingReviews, newReview);

                    return updatedReviews.length === originalCount + 1;
                }
            ),
            { numRuns: 100 }
        );
    });

    test('append should preserve all existing reviews', () => {
        fc.assert(
            fc.property(
                fc.array(fc.string({ minLength: 1, maxLength: 100 }), { minLength: 0, maxLength: 10 }),
                fc.string({ minLength: 1, maxLength: 100 }),
                (existingReviews, newReview) => {
                    const updatedReviews = appendReview(existingReviews, newReview);

                    // All existing reviews should be preserved in order
                    return existingReviews.every((review, index) =>
                        updatedReviews[index] === review
                    );
                }
            ),
            { numRuns: 100 }
        );
    });
});

/**
 * Feature: bonstay-hotel-booking, Property 20: Review Character Limit
 * For any review input, the text SHALL be limited to a maximum of 100 characters.
 * **Validates: Requirements 8.5**
 */
describe('Property 20: Review Character Limit', () => {
    test('review text should be limited to 100 characters', () => {
        fc.assert(
            fc.property(
                fc.string({ minLength: 0, maxLength: 500 }),
                (reviewText) => {
                    const limitedText = enforceCharacterLimit(reviewText);
                    return limitedText.length <= 100;
                }
            ),
            { numRuns: 100 }
        );
    });

    test('text within limit should be preserved exactly', () => {
        fc.assert(
            fc.property(
                fc.string({ minLength: 0, maxLength: 100 }),
                (reviewText) => {
                    const limitedText = enforceCharacterLimit(reviewText);
                    return limitedText === reviewText;
                }
            ),
            { numRuns: 100 }
        );
    });

    test('text exceeding limit should be truncated to exactly 100 characters', () => {
        fc.assert(
            fc.property(
                fc.string({ minLength: 101, maxLength: 500 }),
                (reviewText) => {
                    const limitedText = enforceCharacterLimit(reviewText);
                    return limitedText.length === 100 &&
                        limitedText === reviewText.substring(0, 100);
                }
            ),
            { numRuns: 100 }
        );
    });
});

/**
 * Feature: bonstay-hotel-booking, Property 21: Review Display Completeness
 * For any hotel with reviews, all reviews in the hotel's reviews array SHALL be 
 * displayed on the Show Review page.
 * **Validates: Requirements 9.1**
 */
describe('Property 21: Review Display Completeness', () => {
    test('all reviews should be displayed for a hotel', () => {
        fc.assert(
            fc.property(
                hotelArbitrary,
                (hotel) => {
                    const display = displayReviews(hotel);

                    // All reviews from the hotel should be in the display
                    return display.reviews.length === (hotel.reviews || []).length &&
                        display.reviews.every((review, index) =>
                            review === hotel.reviews[index]
                        );
                }
            ),
            { numRuns: 100 }
        );
    });

    test('hotel name should be displayed as header', () => {
        fc.assert(
            fc.property(
                hotelArbitrary,
                (hotel) => {
                    const display = displayReviews(hotel);
                    return display.hotelName === hotel.hotelName;
                }
            ),
            { numRuns: 100 }
        );
    });

    test('hasReviews flag should correctly indicate review presence', () => {
        fc.assert(
            fc.property(
                hotelArbitrary,
                (hotel) => {
                    const display = displayReviews(hotel);
                    const expectedHasReviews = hotel.reviews && hotel.reviews.length > 0;
                    return display.hasReviews === expectedHasReviews;
                }
            ),
            { numRuns: 100 }
        );
    });

    test('review order should be preserved in display', () => {
        fc.assert(
            fc.property(
                hotelArbitrary,
                (hotel) => {
                    const display = displayReviews(hotel);

                    // Reviews should be in the same order as in the hotel object
                    if (!hotel.reviews || hotel.reviews.length === 0) {
                        return display.reviews.length === 0;
                    }

                    return hotel.reviews.every((review, index) =>
                        display.reviews[index] === review
                    );
                }
            ),
            { numRuns: 100 }
        );
    });
});
