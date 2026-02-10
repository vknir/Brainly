import * as crypto from 'crypto';

function generateUnique8DigitCode(): string {
    // Generate a random number between 0 and 99,999,999
    const randomNumber = crypto.randomInt(0, 100000000);
    return randomNumber.toString().padStart(8, '0');
}

export {generateUnique8DigitCode}