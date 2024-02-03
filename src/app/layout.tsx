import Navbar from "@/components/Navbar";
import "./globals.css";
import StoreProvider from "./StroreProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <StoreProvider>
          <Navbar />
          {children}
        </StoreProvider>
       
      </body>
    </html>
  );
}
