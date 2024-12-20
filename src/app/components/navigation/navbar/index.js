import React from "react";
import Link from "next/link";
import Logo from "./logo"
import Button from "./button"

import styles from "./index.module.css"

export default function Navbar({toggle}) {
    return (
        <>
            <div className={`w-full h-20 sticky top-0 ${styles.navbarGradient}`}>
                <div className="container mx-auto px-4 h-full">
                    <div className="flex justify-between items-center h-full">
                        <Logo/>
                        <ul className="hidden md:flex gap-x-6 text-black">
                            <li>
                                <Link href="/">
                                    <p className="link link-underline">Home</p>
                                </Link>
                            </li>
                        </ul>

                        <button type="button" className="inline-flex items-center md:hidden" onClick={toggle}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 width={40}
                                 height={40}
                                 viewBox="0 0 30 30">
                                <path fill="#fff"
                                      d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
