import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // Import Poppins
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/Footer";
import AuthProvider from "./components/AuthProvider";


// Poppins font
const poppins = Poppins({
    weight: ["400", "500", "600", "700"], // Specify the weights you need
    subsets: ["latin"],
    variable: "--font-poppins", // Optional: Define a CSS variable for Poppins
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${poppins.className} antialiased`}>
                <AuthProvider>
                    <Header />
                    {children}
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
