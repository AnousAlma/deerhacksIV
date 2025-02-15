import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getUserByEmail } from "/database/dal/user";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        // CredentialsProvider({
        //     name: "Credentials",
        //     credentials: {
        //         email: { label: "Email", type: "email" },
        //         password: { label: "Password", type: "password" },
        //     },
        //     async authorize(credentials) {
        //         const { email, password } = credentials!;
        //         const user = await getUserByEmail(email);

        //         if (user && bcrypt.compareSync(password, user.password)) {
        //             return { id: user.id, email: user.email };
        //         }
        //         return null;
        //     },
        // }),
    ],
    // pages: {
    //     signIn: "/login",
    // },
    session: {
        strategy: "jwt",
    },
    // secret: process.env.NEXTAUTH_SECRET,
    // callbacks: {
    //     async jwt({ token, user }) {
    //         if (user) {
    //             token.id = user.id;
    //             token.email = user.email;
    //         }
    //         return token;
    //     },
    //     async session({ session, token }) {
    //         session.user.id = token.id;
    //         session.user.email = token.email;
    //         return session;
    //     },
    // },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };