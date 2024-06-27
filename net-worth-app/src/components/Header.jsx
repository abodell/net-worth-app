import { useEffect, useState, useCallback } from 'react'
import { IconButton } from 'rsuite'
import Link from 'next/link'
import Button from '@/components/Button'
import { AiOutlineGithub } from 'react-icons/ai';
import { HiOutlineLightBulb } from 'react-icons/hi'
import { MdDarkMode, MdLogin } from 'react-icons/md'
import { useTheme } from 'next-themes'
import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';

export default function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { data: currentUser } = useCurrentUser();
    const loginModal = useLoginModal();

    useEffect( () => {
        setMounted(true);
    }, [])

    const onClick = useCallback( () => {
        if (!currentUser) {
            loginModal.onOpen();
        }
    }, [loginModal])

    return (
        <div className="max-w-7xl mx-auto px-2 py-10 md:py-20">
            <div className="flex md:flex-row justify-between items-center">
            {/* create a button component for login/register, etc and delete div below */}
                <div>
                    { mounted && <Button label={currentUser ? "Sign Out" : "Login"} secondary={theme === 'dark'} onClick={onClick}/> }
                </div>

                <Link href="/">
                    <h1 className="break-all font-semibold text-4xl dark:text-gray-100">
                        Wealth Wise
                    </h1>
                </Link>

                <div className="space-x-4 flex flex-row items-center">
                    <a href='https://github.com/abodell'>
                        <AiOutlineGithub 
                            size="1.75em"
                        />
                    </a>
                    { mounted && 
                    <IconButton 
                        icon={theme === 'dark' ? (<HiOutlineLightBulb size="1.75em" color="#fcd34d"/>) : (<MdDarkMode size="1.75em" color="#1f2937"/>)}
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    /> }
                </div>
            </div>
        </div>
    )
}