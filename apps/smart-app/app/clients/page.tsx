'use client'
import React from 'react';
import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_USER_DATA } from '@/graphql/queries'


const AutomobilePage = () => {
  const { loading, error, data } = useQuery(GET_USER_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  return (
        <div>
          <div className='mb-5'>
            <Button>
              <Link href='/clients/new'> Add Client </Link>
            </Button>
          </div>
          <Table.Root variant='surface'>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>DataID</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>UserDataOwnerID</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Vehicle No</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Registered Date</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.user_data.map((data:any) => (
                <Table.Row key={data.id}>
                  <Table.Cell>{data.id}</Table.Cell>
                  <Table.Cell>{data.data_owner_id}</Table.Cell>
                  <Table.Cell>{data.Vehicle_No}</Table.Cell>
                  <Table.Cell>{data.Registered_Date?.toDateString()}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>

          </Table.Root>
        </div>
    )

}

export default AutomobilePage