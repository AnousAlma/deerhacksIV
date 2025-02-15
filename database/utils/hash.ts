import bcrypt from "bcrypt";

const saltRounds = 10;

async function hashPassword(password: string) {
    return bcrypt.hash(password, saltRounds);
}

async function comparePassword(plainPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainPassword, hashedPassword);
}