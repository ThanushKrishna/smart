'use client'
import React from 'react';
import { Button } from '@radix-ui/themes'
import Link from 'next/link';



const AutomobilePage = () => {
 
  return (
        <div>
          <Button>
            <Link href='/addClient/new'> Add Automobile </Link>
          </Button>
        </div>
    )

}

export default AutomobilePage