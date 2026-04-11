import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Sign in - My Store',
    description: 'Log in to your account to access orders, wishlist, and more.',
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return children
}
