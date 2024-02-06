import Navbar from "@/components/Navbar";
import "./globals.css";
import StoreProvider from "./StroreProvider";
import theme from './theme'
import { ColorModeScript } from '@chakra-ui/react'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <StoreProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Navbar />
          {children}
        </StoreProvider>
       
      </body>
    </html>
  );
}
