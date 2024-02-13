"use client";
import Head from 'next/head'
import { getStringBetween } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FcAddDatabase } from "react-icons/fc";
const tabs = [
    { name: "New ", href: '/orders/new' },
    { name: "Pending", href: '/orders/pending' },
    { name: "Past ", href: '/orders/past' },
]
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;

}>) {
    const pathname = usePathname()
    return (
        <div className="my-2 w-svw">
            <Head>
                <title>Orders</title>
            </Head>



            <ul className="grid grid-flow-col text-center text-gray-500 bg-gray-100 rounded-full p-1">
                {
                    tabs.map(tab => {

                        const path = getStringBetween(pathname);
                        const href = getStringBetween(tab.href)
                        const isActive = path[path.length - 1] === href[href.length - 1];
                        return (
                            isActive ? <li key={tab.name}>
                                <Link href={tab.href} className="flex justify-center bg-white rounded-full shadow py-4 text-sm text-blue-600 font-bold mr-5">{tab.name}</Link>
                            </li> : <li>
                                <Link href={tab.href} className="flex justify-center py-4 text-sm text-gray-400 hover:text-gray-500 mr-5">{tab.name}</Link>
                            </li>
                        )
                    })
                }



            </ul>
            {children}
        </div>
    );
}
