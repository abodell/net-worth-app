import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react';
import axios from 'axios'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'

import Input from '@/components/Input'
import Modal from '@/components/Modal'

const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            await signIn('credentials', {
                email,
                password
            });
            toast.success('Logged in!');
            loginModal.onClose();
        } catch (err) {
            toast.error('Something went wrong!')
        } finally {
            setIsLoading(false);
        }
    })

    const onToggle = useCallback( () => {
        if (isLoading) return;
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal])

    const body = (
        <div className="flex flex-col gap-4">
            <Input 
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input 
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            /> 
        </div>
    )

    const footer = (
        <div className="text-neutral-400 text-center mt-4">
            <p>Don&apos;t have an account?
                <span
                onClick={onToggle}
                className="
                    text-white
                    cursor-pointer
                    hover:underline
                    ml-1
                "
                >
                Create an account
                </span>
            </p>
        </div>
    )

    return (
        <Modal 
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Login"
            onClose={loginModal.onClose}
            onSubmit={onSubmit}
            body={body}
            footer={footer}
        />
    )

}

export default LoginModal;