/**
 * Property-based tests for validation utility functions
 * Using fast-check for property-based testing
 * 
 * Feature: bonstay-hotel-booking
 */

import * as fc from 'fast-check';
import {
    validateName,
    validatePhone,
    validateEmail,
    validatePassword,
    validateStartDate,
    validateEndDate,
    validatePersons,
    validateRooms
} from './validation';

describe('Validation Property Tests', () => {
    /**
     * Feature: bonstay-hotel-booking, Property 1: Name Validation Length Check
     * For any string with length less than 3 characters, the name validation function 
     * SHALL return an error message, and for any string with length >= 3 characters, 
     * it SHALL return no error.
     * **Validates: Requirements 1.2**
     */
    describe('Property 1: Name Validation Length Check', () => {
        test('names with fewer than 3 characters should return error', () => {
            fc.assert(
                fc.property(
                    fc.string({ minLength: 0, maxLength: 2 }),
                    (name) => {
                        const result = validateName(name);
                        return result === "The length of the name should be minimum 3 character.";
                    }
                ),
                { numRuns: 100 }
            );
        });

        test('names with 3 or more characters should return no error', () => {
            fc.assert(
                fc.property(
                    fc.string({ minLength: 3, maxLength: 100 }),
                    (name) => {
                        const result = validateName(name);
                        return result === "";
                    }
                ),
                { numRuns: 100 }
            );
        });
    });


    /**
     * Feature: bonstay-hotel-booking, Property 2: Phone Number Validation Format Check
     * For any string that does not match exactly 10 digits, the phone validation function 
     * SHALL return an error message, and for any string matching exactly 10 digits, 
     * it SHALL return no error.
     * **Validates: Requirements 1.4**
     */
    describe('Property 2: Phone Number Validation Format Check', () => {
        test('strings that are not exactly 10 digits should return error', () => {
            fc.assert(
                fc.property(
                    fc.string().filter(s => !/^\d{10}$/.test(s)),
                    (phone) => {
                        const result = validatePhone(phone);
                        return result === "the Phone number should have 10 digits.";
                    }
                ),
                { numRuns: 100 }
            );
        });

        test('strings with exactly 10 digits should return no error', () => {
            fc.assert(
                fc.property(
                    fc.array(fc.integer({ min: 0, max: 9 }), { minLength: 10, maxLength: 10 }),
                    (digits) => {
                        const phone = digits.join('');
                        const result = validatePhone(phone);
                        return result === "";
                    }
                ),
                { numRuns: 100 }
            );
        });
    });

    /**
     * Feature: bonstay-hotel-booking, Property 3: Email Validation Format Check
     * For any string that does not match the email regex pattern, the email validation 
     * function SHALL return an error message.
     * **Validates: Requirements 1.5**
     */
    describe('Property 3: Email Validation Format Check', () => {
        test('valid email format should return no error', () => {
            const alphanumChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
            const alphaChars = 'abcdefghijklmnopqrstuvwxyz';

            fc.assert(
                fc.property(
                    fc.tuple(
                        fc.array(fc.constantFrom(...alphanumChars.split('')), { minLength: 1, maxLength: 10 }),
                        fc.array(fc.constantFrom(...alphanumChars.split('')), { minLength: 1, maxLength: 10 }),
                        fc.array(fc.constantFrom(...alphaChars.split('')), { minLength: 2, maxLength: 4 })
                    ),
                    ([localArr, domainArr, tldArr]) => {
                        const email = `${localArr.join('')}@${domainArr.join('')}.${tldArr.join('')}`;
                        const result = validateEmail(email);
                        return result === "";
                    }
                ),
                { numRuns: 100 }
            );
        });

        test('strings without @ should return error', () => {
            fc.assert(
                fc.property(
                    fc.string().filter(s => !s.includes('@')),
                    (email) => {
                        const result = validateEmail(email);
                        return result === "the Email should match the basic email format.";
                    }
                ),
                { numRuns: 100 }
            );
        });
    });

    /**
     * Feature: bonstay-hotel-booking, Property 4: Password Validation Length Check
     * For any password string with length < 8 or length > 12, the password validation 
     * function SHALL return an error message, and for any password with length between 
     * 8-12 inclusive, it SHALL return no error.
     * **Validates: Requirements 1.6, 2.3**
     */
    describe('Property 4: Password Validation Length Check', () => {
        test('empty password should return required error', () => {
            const result = validatePassword('');
            expect(result).toBe('password is a required field.');
        });

        test('passwords shorter than 8 characters should return length error', () => {
            fc.assert(
                fc.property(
                    fc.string({ minLength: 1, maxLength: 7 }),
                    (password) => {
                        const result = validatePassword(password);
                        return result === "The length of the password should be between 8 and 12 characters";
                    }
                ),
                { numRuns: 100 }
            );
        });

        test('passwords longer than 12 characters should return length error', () => {
            fc.assert(
                fc.property(
                    fc.string({ minLength: 13, maxLength: 50 }),
                    (password) => {
                        const result = validatePassword(password);
                        return result === "The length of the password should be between 8 and 12 characters";
                    }
                ),
                { numRuns: 100 }
            );
        });

        test('passwords between 8-12 characters should return no error', () => {
            fc.assert(
                fc.property(
                    fc.string({ minLength: 8, maxLength: 12 }),
                    (password) => {
                        const result = validatePassword(password);
                        return result === "";
                    }
                ),
                { numRuns: 100 }
            );
        });
    });


    /**
     * Feature: bonstay-hotel-booking, Property 9: Start Date Future Validation
     * For any date that is less than or equal to today's date, the start date validation 
     * SHALL return an error message.
     * **Validates: Requirements 4.2**
     */
    describe('Property 9: Start Date Future Validation', () => {
        test('dates in the past or today should return error', () => {
            fc.assert(
                fc.property(
                    fc.integer({ min: 0, max: 365 }),
                    (daysAgo) => {
                        const pastDate = new Date(Date.now() - daysAgo * 86400000);
                        const dateStr = pastDate.toISOString().split('T')[0];
                        const result = validateStartDate(dateStr);
                        return result === "the starting date should be after today's date.";
                    }
                ),
                { numRuns: 100 }
            );
        });

        test('dates in the future should return no error', () => {
            fc.assert(
                fc.property(
                    fc.integer({ min: 1, max: 365 }),
                    (daysAhead) => {
                        const futureDate = new Date(Date.now() + daysAhead * 86400000);
                        const dateStr = futureDate.toISOString().split('T')[0];
                        const result = validateStartDate(dateStr);
                        return result === "";
                    }
                ),
                { numRuns: 100 }
            );
        });
    });

    /**
     * Feature: bonstay-hotel-booking, Property 10: Date Range Validation
     * For any end date that is less than the start date, the end date validation 
     * SHALL return an error message.
     * **Validates: Requirements 4.3**
     */
    describe('Property 10: Date Range Validation', () => {
        test('end date before start date should return error', () => {
            fc.assert(
                fc.property(
                    fc.integer({ min: 1, max: 100 }),
                    fc.integer({ min: 1, max: 100 }),
                    (startOffset, daysBefore) => {
                        const startDate = new Date(Date.now() + startOffset * 86400000);
                        const endDate = new Date(startDate.getTime() - daysBefore * 86400000);
                        const startStr = startDate.toISOString().split('T')[0];
                        const endStr = endDate.toISOString().split('T')[0];
                        const result = validateEndDate(endStr, startStr);
                        return result === "the End date should be greater than or equal to start date.";
                    }
                ),
                { numRuns: 100 }
            );
        });

        test('end date equal to or after start date should return no error', () => {
            fc.assert(
                fc.property(
                    fc.integer({ min: 1, max: 100 }),
                    fc.integer({ min: 0, max: 100 }),
                    (startOffset, daysAfter) => {
                        const startDate = new Date(Date.now() + startOffset * 86400000);
                        const endDate = new Date(startDate.getTime() + daysAfter * 86400000);
                        const startStr = startDate.toISOString().split('T')[0];
                        const endStr = endDate.toISOString().split('T')[0];
                        const result = validateEndDate(endStr, startStr);
                        return result === "";
                    }
                ),
                { numRuns: 100 }
            );
        });
    });

    /**
     * Feature: bonstay-hotel-booking, Property 11: Numeric Range Validation
     * For any number of persons outside the range 1-5, or number of rooms outside 
     * the range 1-3, the respective validation SHALL return an error message.
     * **Validates: Requirements 4.4, 4.5**
     */
    describe('Property 11: Numeric Range Validation', () => {
        test('persons outside 1-5 range should return error', () => {
            fc.assert(
                fc.property(
                    fc.integer().filter(n => n < 1 || n > 5),
                    (persons) => {
                        const result = validatePersons(persons);
                        return result === "the The number of persons should be greater than 0 and less than or equal to 5";
                    }
                ),
                { numRuns: 100 }
            );
        });

        test('persons within 1-5 range should return no error', () => {
            fc.assert(
                fc.property(
                    fc.integer({ min: 1, max: 5 }),
                    (persons) => {
                        const result = validatePersons(persons);
                        return result === "";
                    }
                ),
                { numRuns: 100 }
            );
        });

        test('rooms outside 1-3 range should return error', () => {
            fc.assert(
                fc.property(
                    fc.integer().filter(n => n < 1 || n > 3),
                    (rooms) => {
                        const result = validateRooms(rooms);
                        return result === "the The number of rooms should be greater than 0 and less than or equal to 3";
                    }
                ),
                { numRuns: 100 }
            );
        });

        test('rooms within 1-3 range should return no error', () => {
            fc.assert(
                fc.property(
                    fc.integer({ min: 1, max: 3 }),
                    (rooms) => {
                        const result = validateRooms(rooms);
                        return result === "";
                    }
                ),
                { numRuns: 100 }
            );
        });
    });
});
