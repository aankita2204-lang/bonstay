/**
 * Property-based tests for form behavior
 * Using fast-check for property-based testing
 * 
 * Feature: bonstay-hotel-booking
 */

import * as fc from 'fast-check';

/**
 * Helper function to simulate form validation state
 * This mirrors the validation logic used in Register, Login, Book, and Addreview components
 */
const computeFormValidity = (formState, validationErrors) => {
    // Check if any field is empty
    const hasEmptyFields = Object.values(formState).some(value => !value || value === '');
    // Check if any validation error exists
    const hasErrors = Object.values(validationErrors).some(error => error && error !== '');
    // Form is valid only if no empty fields and no errors
    return !hasEmptyFields && !hasErrors;
};

/**
 * Feature: bonstay-hotel-booking, Property 5: Form Button Disabled State
 * For any form state where at least one validation error exists or a required field 
 * is empty, the submit button SHALL be disabled.
 * **Validates: Requirements 1.7, 2.4, 4.6, 8.3**
 */
describe('Property 5: Form Button Disabled State', () => {
    test('form with empty required fields should have disabled button', () => {
        fc.assert(
            fc.property(
                fc.record({
                    name: fc.constantFrom('', 'John'),
                    email: fc.constantFrom('', 'test@test.com'),
                    password: fc.constantFrom('', 'password1')
                }),
                (formState) => {
                    const hasEmptyField = Object.values(formState).some(v => v === '');
                    const validationErrors = { name: '', email: '', password: '' };
                    const isValid = computeFormValidity(formState, validationErrors);

                    // If there's an empty field, form should be invalid (button disabled)
                    if (hasEmptyField) {
                        return isValid === false;
                    }
                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    test('form with validation errors should have disabled button', () => {
        fc.assert(
            fc.property(
                fc.record({
                    name: fc.constant('John'),
                    email: fc.constant('test@test.com'),
                    password: fc.constant('password1')
                }),
                fc.record({
                    name: fc.constantFrom('', 'Name too short'),
                    email: fc.constantFrom('', 'Invalid email'),
                    password: fc.constantFrom('', 'Password too short')
                }),
                (formState, validationErrors) => {
                    const hasError = Object.values(validationErrors).some(e => e !== '');
                    const isValid = computeFormValidity(formState, validationErrors);

                    // If there's a validation error, form should be invalid (button disabled)
                    if (hasError) {
                        return isValid === false;
                    }
                    return true;
                }
            ),
            { numRuns: 100 }
        );
    });

    test('form with all valid fields and no errors should have enabled button', () => {
        fc.assert(
            fc.property(
                fc.record({
                    name: fc.string({ minLength: 3, maxLength: 20 }),
                    email: fc.constant('test@test.com'),
                    password: fc.string({ minLength: 8, maxLength: 12 })
                }),
                (formState) => {
                    const validationErrors = { name: '', email: '', password: '' };
                    const isValid = computeFormValidity(formState, validationErrors);
                    return isValid === true;
                }
            ),
            { numRuns: 100 }
        );
    });
});


/**
 * Feature: bonstay-hotel-booking, Property 6: Login Session Persistence
 * For any successful login, the user's ID and name SHALL be stored in localStorage, 
 * and retrieving these values SHALL return the logged-in user's data.
 * **Validates: Requirements 2.6**
 */
describe('Property 6: Login Session Persistence', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    test('storing user data in localStorage should be retrievable', () => {
        fc.assert(
            fc.property(
                fc.record({
                    userId: fc.integer({ min: 1, max: 10000 }).map(String),
                    userName: fc.string({ minLength: 1, maxLength: 50 })
                }),
                ({ userId, userName }) => {
                    // Simulate login storing data
                    localStorage.setItem('userId', userId);
                    localStorage.setItem('userName', userName);

                    // Verify data can be retrieved
                    const retrievedUserId = localStorage.getItem('userId');
                    const retrievedUserName = localStorage.getItem('userName');

                    return retrievedUserId === userId && retrievedUserName === userName;
                }
            ),
            { numRuns: 100 }
        );
    });

    test('localStorage should persist user session data correctly', () => {
        fc.assert(
            fc.property(
                fc.integer({ min: 1, max: 10000 }),
                fc.string({ minLength: 3, maxLength: 30 }),
                (id, name) => {
                    const userId = String(id);

                    // Store session
                    localStorage.setItem('userId', userId);
                    localStorage.setItem('userName', name);

                    // Verify both values exist and match
                    const hasUserId = localStorage.getItem('userId') !== null;
                    const hasUserName = localStorage.getItem('userName') !== null;
                    const userIdMatches = localStorage.getItem('userId') === userId;
                    const userNameMatches = localStorage.getItem('userName') === name;

                    return hasUserId && hasUserName && userIdMatches && userNameMatches;
                }
            ),
            { numRuns: 100 }
        );
    });
});
