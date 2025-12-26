import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const metadata: Metadata = {
  title: "NoteHub – Notes App",
  description: "Created by GoIT",
  openGraph: {
    title: "NoteHub – Notes App",
    description: "Created by GoIT",
    url: `https://08-zustand-livid.vercel.app/`,
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
    type: "website",
  },
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
            <div id="modal-root"></div>
          </main>
          <Footer />
          <ReactQueryDevtools initialIsOpen={false} />
        </TanStackProvider>
      </body>
    </html>
  );
}
