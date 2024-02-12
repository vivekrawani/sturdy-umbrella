"use client"
import { usePathname } from "next/navigation"
import { FcDoughnutChart } from "react-icons/fc";
import { useEffect, useState } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import Link from 'next/link'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { gLogout } from "@/lib/features/auth/authSlice";
import { useRouter } from 'next/navigation'
import { CiSearch } from "react-icons/ci";
import SearchBox from "./SearchBox";
import { fetchAllProducts } from "@/lib/features/products/productSlice";

const links = [
	{
		name: "Home",
		href: "/"
	},
	{
		name: "Products",
		href: "/products/grocery"
	},
	{
		name: "Orders",
		href: "/orders/new"
	},

	{
		name: "Dashboard",
		href: "/dashboard"
	}
	,
	{
		name: "Users",
		href: "/users"
	},


]

export default function Navbar() {
	const pathname = usePathname()
	const router = useRouter()
	const user = useAppSelector(state => state.authReducer.user);
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState(false);
	const [openSearch, setOpenSearch] = useState(false);
	useEffect(()=>{
		dispatch(fetchAllProducts())
	}, [dispatch])

	const menuModal = (
		<div className="navbar-menu relative z-50">
			<div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
			<nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
				<div className="flex items-center mb-8">
					<Link className="text-3xl font-bold leading-none mr-auto" href="/">
						<FcDoughnutChart className="text-4xl" />
					</Link>
					<button className="navbar-close" onClick={() => {
						setOpen(false)
					}}>
						<IoIosCloseCircleOutline className="text-4xl text-gray-500 hover:text-black" />
					</button>
				</div>
				<div>
					{
						links.map((link) => <Link key={link.name}
							className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded mb-1 " href={link.href}
							onClick={() => { setOpen(false) }}
						>{link.name}</Link>
						)
					}
				</div>
				<div className="mt-auto">
					<div className="pt-6">
						{
							user ?
								<div
									onClick={e => {
										dispatch(gLogout())
										router.push('/')
									}}
									className="block px-4 py-3 mb-3 text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-200 rounded-xl" ></div>
								:
								<Link
									onClick={(e) => {
										setOpen(false);

									}}
									className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl" href="/login">Login</Link>
						}
					</div>
					<p className="my-4 text-xs text-center text-gray-400">
						<span>Copyright © {new Date().getFullYear()}</span>
					</p>
				</div>
			</nav >
		</div >
	)
	return (
		<div className=" sticky top-0 z-50 bg-black bg-opacity-70 ">

			<nav className="relative px-4 py-2 flex justify-between items-center bg-transparent backdrop-blur-lg ">
				<Link className="text-3xl font-bold leading-none" href="/">
					<FcDoughnutChart className="text-4xl" />
				</Link>
				<div className="md:hidden">
					<button className="navbar-burger flex items-center text-blue-600 p-3"
						onClick={(e) => {
							setOpen(true);
						}}
					>
						<GiHamburgerMenu />
					</button>
				</div>


				<div className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 md:flex md:mx-auto md:items-center md:w-auto md:space-x-6">
					{
						links.map((link, index) => {
							const isActive = pathname.includes(link.href)
							const ll = isActive ?
								<Link className="text-sm text-blue-600 font-bold mr-5" href={link.href}>{link.name}</Link> :
								<Link className="text-sm text-gray-400 hover:text-gray-500 mr-5" href={link.href}>{link.name}</Link>
							return (
								<div key={link.name} className="flex items-center">
									{ll}
									{index !== (links.length - 1) && <IoEllipsisVerticalSharp className="text-gray-300" />}
								</div>
							)
						})
					}
					<div className="">
						<button className="navbar-burger flex items-center text-blue-600 p-3"
								onClick={e=> setOpenSearch(p=>!p)}
						>
							<CiSearch className="h-8 w-8" />
						
						</button>
						{ openSearch && <SearchBox />}
					</div>

				</div>


				{
					user ?
						<div className="hidden md:ml-auto md:mr-3 md:flex gap-2 " >
							<button
								onClick={e => {
									dispatch(gLogout())
									router.push('/')
								}}

								className="bg-gray-200 hover:bg-gray-100 py-2 px-6 text-sm text-gray-900 font-bold  rounded-xl transition duration-200">Logout</button>

							<Image src={user.photoURL} width={35} height={30} alt={user.displayName} className="rounded-full" />
						</div>
						:
						<Link className="hidden md:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
							href={'/login'} >Login</Link>
				}

			</nav>

			{open && menuModal}

		</div>
	)
}
