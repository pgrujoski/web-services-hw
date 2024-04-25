const crypto = require('crypto');

// Generate a random string of specified length
const generateRandomString = (length) => {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') // Convert to hexadecimal format
        .slice(0, length); // Trim to desired length
};

// Generate a JWT secret key
const generateJWTSecret = () => {
    return generateRandomString(32); // Adjust the length as needed
};

// Usage
const jwtSecret = generateJWTSecret();
console.log("JWT Secret Key:", jwtSecret);
