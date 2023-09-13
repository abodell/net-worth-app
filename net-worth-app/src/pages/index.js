import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <span className="text-fuchsia-800">Hello, world!</span>
  )
}
