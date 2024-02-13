"use client";
import Head from 'next/head'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FcAddDatabase } from "react-icons/fc";
const sub = [
    { name: "Cosmetics", href: '/products/cosmetics' },
    { name: "Grocery", href: '/products/grocery' },
    { name: "Stationary", href: '/products/stationary' }
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
                <title>My page title</title>
            </Head>

            <div>
                <main className="grid w-full place-items-center">
                    <div className="grid w-full md:w-[40rem] grid-cols-3 gap-2 rounded-full bg-gray-200 p-2">
                        {
                            sub.map((val) => {
                                const isActive = pathname.startsWith(val.href);
                                return (<div key={val.name}>
                                    <input type="radio" name="option" className="peer hidden" checked={isActive} readOnly />
                                    <label className="block cursor-pointer select-none rounded-full p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                                        <Link href={val.href} className="w-full h-full">{val.name}</Link>
                                    </label>
                                </div>
                                )
                            }
                            )
                        }
                    </div>

                </main>
                <div className="flex w-full justify-center items-center gap-5 mt-5">
                    <FcAddDatabase className="text-3xl" />
                    <Link className="hidden md:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
                        href={'/products'} >Add New</Link>
                </div>
            </div>

            {children}
        </div>
    );
}
