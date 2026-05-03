import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClerkWrapper } from "@/components/clerk-compatibility";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VH INTERNATIONAL | Premium Brass Collection",
  description: "Exquisite handcrafted brass products for home, kitchen, and lifestyle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkWrapper>
      <html lang="en">
        <body className={`${inter.variable} ${playfair.variable} antialiased`}>
          <Providers>{children}</Providers>
          <Toaster position="bottom-right" toastOptions={{
            style: {
              background: '#1C1C1C',
              color: '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.1)',
            },
            className: 'font-sans uppercase tracking-widest text-[10px]'
          }} />
        </body>
      </html>
    </ClerkWrapper>
  );
}
