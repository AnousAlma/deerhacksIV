const users = [
    { id: "1", email: "user@example.com", password: "$2b$10$" },
];

async function getUserByEmail(email: string) {
    return users.find((user) => user.email === email) || null;
}