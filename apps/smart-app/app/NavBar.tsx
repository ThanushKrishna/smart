'use client'
import React, { useState, useMemo, useCallback } from 'react';
import { FaBookOpen } from 'react-icons/fa';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import { usePathname } from 'next/navigation';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TiptapEditor from './components/TiptapEditor';
import { removeToken } from '../utils/auth';
import { useRouter } from 'next/navigation';
import { getToken } from '../utils/auth';

const NavBar = () => {
  const router = useRouter();
  const token = getToken();
  const currentPath = usePathname();
  const [anchorEl, setAnchorEl] = useState(null); 

  const handleMenuOpen = useCallback((event: any) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLogout = useCallback(() => {
    removeToken();
    router.push('/');
  }, [router]);

  const links = useMemo(() => {
    return token
      ? [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Baseline', href: '/master' },
          { label: 'Clients', href: '/clients' },
        ]
      : [];
  }, [token]);

  if ( currentPath === '/' || currentPath && currentPath.startsWith('/product/') || currentPath === '/login' || currentPath === '/signup') {
    return null;
  }


  return (
    <AppBar position="static">
      <Toolbar>
        <div style={{ display: 'flex' }}>
          <Link href="/">
            <IconButton color="inherit" edge="start" aria-label="menu">
              <FaBookOpen />
            </IconButton>
          </Link>
          <Typography variant="h6">SMART LEADS</Typography>
        </div>
        <div style={{ display: 'flex', marginLeft: 'auto' }}>
          {token &&
            links.map((link) => (
              <div key={link.href} className="group relative">
                {link.href === '/clients' ? (
                  <Button
                    color={link.href === currentPath ? 'primary' : 'inherit'}
                    onClick={handleMenuOpen}                                                                   
                    
                  >
                    {link.label}
                  </Button>
                ) : (
                  <Link href={link.href} passHref>
                    <Button
                      color={link.href === currentPath ? 'primary' : 'inherit'}
                    >
                      {link.label}
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          {links.some((link) => link.href === '/clients') && (
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
              <MenuItem onClick={handleMenuClose}>
                <Link href="/clients/add">Add Client</Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link href="/clients/update">Update Client</Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link href="/clients/delete">Delete Client</Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link href="/clients">Report View</Link>
              </MenuItem>
            </Menu>
          )}
          {token != null ? (
            <>
              <TiptapEditor />
              <Button color="inherit" onClick={handleLogout}>
                LogOut
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <Button color="inherit">Login</Button>
              </Link>
              <Link href="/signup" passHref>
                <Button color="inherit">Signup</Button>
              </Link>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(NavBar);