/**
 * Validation utility functions for BonStay Hotel Booking System
 * These functions are extracted for testability and reusability across components.
 */

/**
 * Validates that a name has at least 3 characters.
 * @param {string} name - The name to validate
 * @returns {string} Error message if invalid, empty string if valid
 * Validates: Requirements 1.2
 */
export const validateName = (name) => {
    return name.length >= 3 ? "" : "The length of the name should be minimum 3 character.";
};

/**
 * Validates that a phone number is exactly 10 digits.
 * @param {string} phone - The phone number to validate
 * @returns {string} Error message if invalid, empty string if valid
 * Validates: Requirements 1.4
 */
export const validatePhone = (phone) => {
    return phone.match(/^\d{10}$/) ? "" : "the Phone number should have 10 digits.";
};

/**
 * Validates that an email matches the standard email format.
 * @param {string} email - The email to validate
 * @returns {string} Error message if invalid, empty string if valid
 * Validates: Requirements 1.5
 */
export const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? "" : "the Email should match the basic email format.";
};

/**
 * Validates that a password is between 8 and 12 characters.
 * @param {string} password - The password to validate
 * @returns {string} Error message if invalid, empty string if valid
 * Validates: Requirements 1.6, 2.3
 */
export const validatePassword = (password) => {
    if (!password) {
        return "password is a required field.";
    }
    if (password.length < 8 || password.length > 12) {
        return "The length of the password should be between 8 and 12 characters";
    }
    return "";
};

/**
 * Validates that a start date is after today's date.
 * @param {string} startDate - The start date in ISO format (YYYY-MM-DD)
 * @returns {string} Error message if invalid, empty string if valid
 * Validates: Requirements 4.2
 */
export const validateStartDate = (startDate) => {
    const today = new Date().toISOString().split('T')[0];
    return startDate > today ? "" : "the starting date should be after today's date.";
};

/**
 * Validates that an end date is greater than or equal to the start date.
 * @param {string} endDate - The end date in ISO format (YYYY-MM-DD)
 * @param {string} startDate - The start date in ISO format (YYYY-MM-DD)
 * @returns {string} Error message if invalid, empty string if valid
 * Validates: Requirements 4.3
 */
export const validateEndDate = (endDate, startDate) => {
    return endDate >= startDate ? "" : "the End date should be greater than or equal to start date.";
};

/**
 * Validates that the number of persons is between 1 and 5.
 * @param {number|string} persons - The number of persons
 * @returns {string} Error message if invalid, empty string if valid
 * Validates: Requirements 4.4
 */
export const validatePersons = (persons) => {
    const num = Number(persons);
    return (num > 0 && num <= 5) ? "" : "the The number of persons should be greater than 0 and less than or equal to 5";
};

/**
 * Validates that the number of rooms is between 1 and 3.
 * @param {number|string} rooms - The number of rooms
 * @returns {string} Error message if invalid, empty string if valid
 * Validates: Requirements 4.5
 */
export const validateRooms = (rooms) => {
    const num = Number(rooms);
    return (num > 0 && num <= 3) ? "" : "the The number of rooms should be greater than 0 and less than or equal to 3";
};

/**
 * Validates that a review is not empty and not more than 100 characters.
 * @param {string} review - The review text
 * @returns {string} Error message if invalid, empty string if valid
 * Validates: Requirements 8.1, 8.2
 */
export const validateReview = (review) => {
    if (!review) {
        return "Review is required";
    }
    if (review.length > 100) {
        return "Review should not exceed 100 characters";
    }
    return "";
};
