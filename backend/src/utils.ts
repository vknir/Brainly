import * as crypto from 'crypto'


function generateHash(value: string) {
    const salt = crypto.randomBytes(16).toString('hex'); // 16 bytes = 32 hex chars

    // 2. Derive the key using PBKDF2 (Password-Based Key Derivation Function 2)
    const hashBuffer = crypto.pbkdf2Sync(
        value,
        salt,
        100,
        16,
        'sha512'
    );

    // 3. Store the salt and the hash in the database
    return hashBuffer.toString('hex')
}

export { generateHash }