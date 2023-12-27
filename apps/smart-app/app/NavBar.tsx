"use client"
import React, { useState } from 'react';
import { FaBookOpen } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const currentPath = usePathname();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Baseline', href: '/master' },
    { label: 'Clients', href: '/clients' },    
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <FaBookOpen />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li
            key={link.href}
            onMouseOver={() => setDropdownOpen(true)}
            onMouseOut={() => setDropdownOpen(false)}
            className="group relative"
          >
            <Link
              href={link.href}
              className={`${
                link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'
              } hover:text-zinc-800 transition-colors cursor-pointer`}
            >
              {link.label}
            </Link>
            {link.href === '/clients' && isDropdownOpen && (
              <div className="absolute z-10 mt-2 space-y-2 bg-white border rounded-md shadow-lg">
                <Link href="/clients/add">
                  <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                    Add Client
                  </span>
                </Link>
                <Link href="/clients/update">
                  <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                    Update Client
                  </span>
                </Link>
                <Link href="/clients/delete">
                  <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                    Delete Client
                  </span>
                </Link>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;