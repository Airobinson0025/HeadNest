import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const Page = async () => {
  const session = await getServerSession(authOptions)
  // console.log(session)

  if(!session) {
    return (
      <div>Please sign in to view dashboard</div>
    )
  } else {
  return (
    <div>Welcome {session.user.name}</div>
  )}
}

export default Page