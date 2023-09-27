import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react'
import axios from 'axios'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'

import Input from '@/components/Input'
import Modal from '@/components/Modal'

const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback( () => {
        if (isLoading) return;
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal, isLoading])

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            await axios.post('/api/register', {
                email,
                password,
                name
            });
            
            setIsLoading(false);

            toast.success('Account created!')

            signIn('credentials', {
                email,
                password
            });
            registerModal.onClose()
        } catch (err) {
            console.log(err);
            toast.error('Something went wrong!')
        } finally {
            setIsLoading(false)
        }
    }, [email, password, registerModal, name]);

    const body = (
        <div className="flex flex-col gap-4">
            <Input 
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
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
            <p>Already reigstered?
                <span
                onClick={onToggle}
                className="
                    text-white
                    cursor-pointer
                    hover:underline
                    ml-1
                "
                >
                Login
                </span>
            </p>
        </div>
    )

    return (
        <Modal 
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Create Account"
            actionLabel="Create Account"
            onClose={registerModal.onClose}
            onSubmit={onSubmit}
            body={body}
            footer={footer}
        />
    )

}

export default RegisterModal;