import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const Page = async () => {
  const session = await getServerSession(authOptions)
  // console.log(session)

  if(!session) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <h2>Please create an account or sign in to view dashboard</h2>
      </div>
    )
  } else {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <h2>Welcome {session.user.name}</h2>
    </div>
  )}
}

export default Page