import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
            profile(profile) {
                return {
                    id: profile.id.toString(),
                    name: profile.name,
                    email: profile.email || profile.login + "@users.noreply.github.com", // Fallback
                    image: profile.avatar_url,
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    pages: {
        signIn: "/login",
    },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
