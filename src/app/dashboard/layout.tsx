'use client'

import StateProvider from '../StroreProvider';

export default function RootLayout({
    children,
    
}: Readonly<{
    children: React.ReactNode;
    users: React.ReactNode;
}>) {
    return (
        <div>
            <StateProvider> {children}
            
            </StateProvider>
        </div>

    );
}
