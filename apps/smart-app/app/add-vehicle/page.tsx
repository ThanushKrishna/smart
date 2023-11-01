'use client'
import { GET_APP_USERS } from '../../graphql/queries'
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

type AppUserType = {
  firstname: String,
  lastname: String
}

const addVehiclePage = () => {
  const { data, loading, error } = useQuery(GET_APP_USERS)


  if(loading) return <p> Loading... </p>
  if(error) return <p> Oops!, Something went wrong. </p>
  console.log(data);


  return (
    <div>    
      { data && data.app_user.map((val: AppUserType ) => <h1> { val.firstname }</h1>) } 
    </div>
  
    )

}

export default addVehiclePage