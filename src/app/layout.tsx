import Navbar from "@/components/Navbar";
import "./globals.css";
import StoreProvider from "./StroreProvider";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Johar Basket',
  description: 'Buy groceries, cosmetics, stationaries.',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-orange-100">
        <StoreProvider>
          <Navbar />
          {children}
        </StoreProvider>
       
      </body>
    </html>
  );
}
