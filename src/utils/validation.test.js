/**
 * Unit tests for validation utility functions
 * These tests verify the core validation logic works correctly
 */

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

describe('Validation Utilities', () => {
    describe('validateName', () => {
        test('returns error for names shorter than 3 characters', () => {
            expect(validateName('ab')).toBe('The length of the name should be minimum 3 character.');
            expect(validateName('')).toBe('The length of the name should be minimum 3 character.');
        });

        test('returns empty string for valid names', () => {
            expect(validateName('abc')).toBe('');
            expect(validateName('John Doe')).toBe('');
        });
    });

    describe('validatePhone', () => {
        test('returns error for invalid phone numbers', () => {
            expect(validatePhone('123')).toBe('the Phone number should have 10 digits.');
            expect(validatePhone('12345678901')).toBe('the Phone number should have 10 digits.');
            expect(validatePhone('abcdefghij')).toBe('the Phone number should have 10 digits.');
        });

        test('returns empty string for valid 10-digit phone numbers', () => {
            expect(validatePhone('1234567890')).toBe('');
        });
    });

    describe('validateEmail', () => {
        test('returns error for invalid email formats', () => {
            expect(validateEmail('invalid')).toBe('the Email should match the basic email format.');
            expect(validateEmail('test@')).toBe('the Email should match the basic email format.');
            expect(validateEmail('@test.com')).toBe('the Email should match the basic email format.');
        });

        test('returns empty string for valid email formats', () => {
            expect(validateEmail('test@example.com')).toBe('');
            expect(validateEmail('user.name@domain.org')).toBe('');
        });
    });

    describe('validatePassword', () => {
        test('returns error for empty password', () => {
            expect(validatePassword('')).toBe('password is a required field.');
        });

        test('returns error for passwords outside 8-12 character range', () => {
            expect(validatePassword('short')).toBe('The length of the password should be between 8 and 12 characters');
            expect(validatePassword('thispasswordistoolong')).toBe('The length of the password should be between 8 and 12 characters');
        });

        test('returns empty string for valid passwords', () => {
            expect(validatePassword('password1')).toBe('');
            expect(validatePassword('12345678')).toBe('');
            expect(validatePassword('123456789012')).toBe('');
        });
    });

    describe('validateStartDate', () => {
        test('returns error for dates not after today', () => {
            const today = new Date().toISOString().split('T')[0];
            const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
            expect(validateStartDate(today)).toBe('the starting date should be after today\'s date.');
            expect(validateStartDate(yesterday)).toBe('the starting date should be after today\'s date.');
        });

        test('returns empty string for future dates', () => {
            const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
            expect(validateStartDate(tomorrow)).toBe('');
        });
    });

    describe('validateEndDate', () => {
        test('returns error when end date is before start date', () => {
            expect(validateEndDate('2025-01-10', '2025-01-15')).toBe('the End date should be greater than or equal to start date.');
        });

        test('returns empty string when end date is equal to or after start date', () => {
            expect(validateEndDate('2025-01-15', '2025-01-15')).toBe('');
            expect(validateEndDate('2025-01-20', '2025-01-15')).toBe('');
        });
    });

    describe('validatePersons', () => {
        test('returns error for persons outside 1-5 range', () => {
            expect(validatePersons(0)).toBe('the The number of persons should be greater than 0 and less than or equal to 5');
            expect(validatePersons(6)).toBe('the The number of persons should be greater than 0 and less than or equal to 5');
            expect(validatePersons(-1)).toBe('the The number of persons should be greater than 0 and less than or equal to 5');
        });

        test('returns empty string for valid person counts', () => {
            expect(validatePersons(1)).toBe('');
            expect(validatePersons(3)).toBe('');
            expect(validatePersons(5)).toBe('');
        });
    });

    describe('validateRooms', () => {
        test('returns error for rooms outside 1-3 range', () => {
            expect(validateRooms(0)).toBe('the The number of rooms should be greater than 0 and less than or equal to 3');
            expect(validateRooms(4)).toBe('the The number of rooms should be greater than 0 and less than or equal to 3');
        });

        test('returns empty string for valid room counts', () => {
            expect(validateRooms(1)).toBe('');
            expect(validateRooms(2)).toBe('');
            expect(validateRooms(3)).toBe('');
        });
    });
});
