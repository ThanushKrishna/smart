'use client'
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { removeToken, getToken } from '../utils/auth';
import { useRouter } from 'next/navigation';
import TiptapEditor from './components/TiptapEditor';

const NavBar = () => {
  const router = useRouter();
  const token = getToken();
  const currentPath = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [clientsMenuOpen, setClientsMenuOpen] = useState(false);

  const homeLinks = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/product/pricing' },
    { label: 'About Us', href: '/product/about-us' },
    { label: 'LogIn', href: '/login' },
    { label: 'Sign Up', href: '/signup' },
  ];

  const links = useMemo(() => {
    return token
      ? [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Baseline', href: '/master' },
          { label: 'Clients', href: '/clients' },          
        ]
      : [];
  }, [token]);

  const handleMenuOpen = () => setMenuOpen(true);
  const handleMenuClose = () => {
    setMenuOpen(false);
    setClientsMenuOpen(false);
  };
  const handleLogout = () => {
    removeToken();
    router.push('/');
  };

  // Home page headers
  if (
    currentPath === '/' ||
    (currentPath && currentPath.startsWith('/product/')) ||
    currentPath?.includes('login') ||
    currentPath?.includes('signup') ||
    currentPath?.includes('Password')
  ) {
    return (
      <nav className="w-full bg-gradient-to-r from-gray-300 via-white to-gray-300 text-purple-900 shadow h-16 flex items-center px-4 md:px-8 z-10 relative">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <div className="relative translate-y-1/4 -translate-x-2 scale-150 z-20">
              <img
                src="/images/SmartLeads01-Logo.png"
                alt="SMART LEADS Logo"
                className="h-16 w-16 rounded-full border-4 border-white shadow-lg bg-white object-cover"
              />
            </div>
          </Link>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center ml-auto gap-4">
          {homeLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-3xl font-bold hover:bg-purple-800 transition ${link.href === currentPath ? 'bg-purple-700' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        {/* Hamburger for mobile */}
        <div className="md:hidden ml-auto">
          <button
            className="focus:outline-none"
            onClick={handleMenuOpen}
            aria-label="Open Menu"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            </svg>
          </button>
          {menuOpen && (
            <div className="fixed inset-0 bg-white text-purple-900 z-50 flex flex-col w-full h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-purple-200">
                <span className="font-bold text-lg">Menu</span>
                <button
                  className="text-2xl text-purple-700"
                  onClick={handleMenuClose}
                  aria-label="Close Menu"
                >
                  &times;
                </button>
              </div>
              <div className="flex flex-col gap-2 px-6 py-4 flex-1 overflow-y-auto">
                {homeLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-3 hover:bg-purple-100 rounded-3xl font-bold text-lg"
                    onClick={handleMenuClose}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }

  // Default NavBar for logged-in users
  return (
    <nav className="w-full bg-gradient-to-r from-gray-300 via-white to-gray-300 text-purple-900 shadow h-16 flex items-center px-4 md:px-8 z-10 relative">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center">
          <div className="relative translate-y-1/4 -translate-x-2 scale-150 z-20">
            <img
              src="/images/SmartLeads01-Logo.png"
              alt="SMART LEADS Logo"
              className="h-16 w-16 rounded-full border-4 border-white shadow-lg bg-white object-cover"
            />
          </div>
        </Link>
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center ml-auto gap-4">
        {token &&
          links.map((link) =>
            link.href === '/clients' ? (
              <div key={link.href} className="relative">
                <button
                  className={`px-4 py-2 rounded-3xl font-bold hover:bg-purple-800 transition ${link.href === currentPath ? 'bg-purple-700 text-white' : ''}`}
                  onClick={() => setClientsMenuOpen(true)}
                >
                  {link.label}
                </button>
                {clientsMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-purple-900 rounded shadow-lg z-20">
                    <Link href="/clients/add" className="block px-4 py-2 hover:bg-purple-100 rounded-3xl" onClick={() => setClientsMenuOpen(false)}>
                      Add Client
                    </Link>
                    <Link href="/clients/update" className="block px-4 py-2 hover:bg-purple-100 rounded-3xl" onClick={() => setClientsMenuOpen(false)}>
                      Update Client
                    </Link>
                    <Link href="/clients/delete" className="block px-4 py-2 hover:bg-purple-100 rounded-3xl" onClick={() => setClientsMenuOpen(false)}>
                      Delete Client
                    </Link>
                    <Link href="/clients" className="block px-4 py-2 hover:bg-purple-100 rounded-3xl" onClick={() => setClientsMenuOpen(false)}>
                      Report View
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-3xl font-bold hover:bg-purple-800 transition ${link.href === currentPath ? 'bg-purple-700 text-white' : ''}`}
              >
                {link.label}
              </Link>
            )
          )}
        {token && (
          <div className="flex items-center">
            <TiptapEditor />
            <button
              className="px-4 py-2 rounded-3xl font-bold hover:bg-purple-800 transition"
              onClick={handleLogout}
            >
              LogOut
            </button>
          </div>
        )}
      </div>
      {/* Hamburger for mobile */}
      <div className="md:hidden ml-auto">
        <button
          className="focus:outline-none"
          onClick={handleMenuOpen}
          aria-label="Open Menu"
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
          </svg>
        </button>
        {/* Fullscreen mobile menu */}
        {menuOpen && !clientsMenuOpen && (
          <div className="fixed inset-0 bg-white text-purple-900 z-50 flex flex-col w-full h-full">
            <div className="flex items-center justify-between px-6 py-4 border-b border-purple-200">
              <span className="font-bold text-lg">Menu</span>
              <button
                className="text-2xl text-purple-700"
                onClick={handleMenuClose}
                aria-label="Close Menu"
              >
                &times;
              </button>
            </div>
            <div className="flex flex-col gap-2 px-6 py-4 flex-1 overflow-y-auto">
              {token &&
                links.map((link) =>
                  link.href === '/clients' ? (
                    <button
                      key={link.href}
                      className="px-4 py-3 hover:bg-purple-100 rounded-3xl font-bold text-lg text-left flex items-center justify-between"
                      onClick={() => setClientsMenuOpen(true)}
                    >
                      {link.label}
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="px-4 py-3 hover:bg-purple-100 rounded-3xl font-bold text-lg"
                      onClick={handleMenuClose}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              {token && (
                <>
                  <div className="mt-2">
                    <TiptapEditor />
                  </div>
                  <button
                    className="px-4 py-3 hover:bg-purple-100 rounded-3xl font-bold text-lg text-left"
                    onClick={handleLogout}
                  >
                    LogOut
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        {/* Clients sub-menu as a new page */}
        {menuOpen && clientsMenuOpen && (
          <div className="fixed inset-0 bg-white text-purple-900 z-50 flex flex-col w-full h-full">
            <div className="flex items-center justify-between px-6 py-4 border-b border-purple-200">
              <button
                className="text-purple-700 text-xl mr-2"
                onClick={() => setClientsMenuOpen(false)}
                aria-label="Back"
              >
                &#8592;
              </button>
              <span className="font-bold text-lg">Clients</span>
              <button
                className="text-2xl text-purple-700"
                onClick={handleMenuClose}
                aria-label="Close Menu"
              >
                &times;
              </button>
            </div>
            <div className="flex flex-col gap-2 px-6 py-4 flex-1 overflow-y-auto">
              <Link href="/clients/add" className="px-4 py-3 hover:bg-purple-100 rounded-3xl font-bold text-lg" onClick={handleMenuClose}>
                Add Client
              </Link>
              <Link href="/clients/update" className="px-4 py-3 hover:bg-purple-100 rounded-3xl font-bold text-lg" onClick={handleMenuClose}>
                Update Client
              </Link>
              <Link href="/clients/delete" className="px-4 py-3 hover:bg-purple-100 rounded-3xl font-bold text-lg" onClick={handleMenuClose}>
                Delete Client
              </Link>
              <Link href="/clients" className="px-4 py-3 hover:bg-purple-100 rounded-3xl font-bold text-lg" onClick={handleMenuClose}>
                Report View
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default React.memo(NavBar);