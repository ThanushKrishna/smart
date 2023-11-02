'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { FaBookOpen } from 'react-icons/fa'
import classnames from 'classnames';

const NavBar = () => {
  const currentPath = usePathname();
    const links = [
        { label: 'Dashboard', href: '/'},
        { label: 'Add Client', href: '/addClient'}
    ]

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href="/"> < FaBookOpen/ > </Link>    
        <ul  className='felx space-x-6'>
            {links.map(link => 
            <Link 
                key={link.href} 
                className={classnames({
                  'text-zinc-900': link.href === currentPath,
                  'text-zinc-500': link.href !== currentPath,
                  'hover:text-zinc-800 trasition-colors': true
                })}
                href={link.href}> {link.label} </Link>)}            
        </ul>
    </nav>
  )
}

export default NavBar