import React from 'react'
import AuthLinks from './AuthLinks'
import getServerUser from '@/lib/getServerUser'

const Navbar = async () => {

    const user = await getServerUser()
  return (
    <AuthLinks user={user} />
  )
}

export default Navbar