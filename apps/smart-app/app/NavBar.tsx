'use client'
import React, { useState } from 'react';
import { FaBookOpen } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const NavBar = () => {
  const currentPath = usePathname();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Baseline', href: '/master' },
    { label: 'Clients', href: '/clients' },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <div style={{ display: 'flex' }}>
          <Link href="/">
            <IconButton color="inherit" edge="start" aria-label="menu">
              <FaBookOpen />
            </IconButton>
          </Link>
          <Typography variant="h6">Smart Leads</Typography>
        </div>
        <div style={{ display: 'flex', marginLeft: 'auto' }}>
          {links.map((link) => (
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
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem>
                <Link href="/clients/add">Add Client</Link>
              </MenuItem>
              <MenuItem>
                <Link href="/clients/update">Update Client</Link>
              </MenuItem>
              <MenuItem>
                <Link href="/clients/delete">Delete Client</Link>
              </MenuItem>
              <MenuItem>
                <Link href="/clients">Report View</Link>
              </MenuItem>
            </Menu>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;