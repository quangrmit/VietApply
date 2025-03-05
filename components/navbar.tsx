"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import SearchDialog from "./search/search-dialog";


export default function Navbar() {
    const pathname = usePathname();


    // refactor this code to loop through an obj for cleaner code.

    return (
        <nav className=" w-full border-b border-zinc-800 bg-black m-0 z-100 sticky top-0 z-10 ">
            <div className="flex h-20 items-center justify-between px-4 ">
                <div className=" text-xl relative left-4 font-bold">VietApply</div>
                <nav className="flex space-x-6 text-lg font-extralight items-center">
                    <Link
                        href="/"
                        className={cn(
                            " transition-colors hover:text-white",
                            pathname === "/" ? "text-white" : "text-zinc-400"
                        )}
                    >
                        Home
                    </Link>
                    <Link
                        href="/dashboard"
                        className={cn(
                            " transition-colors hover:text-white",
                            pathname === "/dashboard" ? "text-white" : "text-zinc-400"
                        )}
                    >
                        Dashboard
                    </Link>


                    <SearchDialog />
                </nav>
            </div>
        </nav>
    );
}
