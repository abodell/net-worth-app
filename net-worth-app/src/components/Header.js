import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AiOutlineGithub } from 'react-icons/ai';
import { useTheme } from 'next-themes'

export default function Header() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-20">
            <div className="flex md:flex-row justify-between items-center">
                <Link href="/">
                    <h1 className="font-semibold text-xl dark:text-gray-100">
                        Net Worth Tracker
                    </h1>
                </Link>

                <div className='space-x-8 hidden md:block'>
                    <h1 className="font-semibold text-xl dark:text-gray-100">
                        Login Button
                    </h1>
                </div>

                <div className="space-x-4 flex flex-row items-center">
                    <a href='https://github.com/abodell/net-worth-app'>
                        <AiOutlineGithub 
                            size="1.75em"
                        />
                    </a>
                    <button>
                        
                    </button>
                </div>
            </div>
        </div>
    )
}