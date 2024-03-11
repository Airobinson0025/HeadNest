'use client'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { useSession } from 'next-auth/react'

const Hero = () => {

  const { data: session } = useSession()
  const firstName = session?.user.name.split(' ')[0]

  return (
    <div className='flex flex-col items-start justify-center gap-8 bg-[url(https://images.unsplash.com/photo-1689028293838-a6a66b0ae2c5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center h-[675px] md:m-5 lg:m-4 md:rounded-md text-primary px-8 hero'>

        <div className='max-w-lg'>
            { session ? ( <h1 className='my-4'>Welcome Back {firstName}.</h1>) : ( <h1 className='my-4'>Welcome to Headnest.</h1>)}
            <h3 className='hidden md:inline leading-8'> Headnest is a Comprehensive Solution for Nurturing Personal Well-Being and Cultivating Team Harmony in Pursuit of Mental Wellness.</h3>
        </div>

        <div className=''>
            { session ? ( <Link href='/admin'>
                <Button className='hover:scale-105 transition duration-200 shadow-lg' variant='default' size='lg'>Go to Dashboard</Button>
            </Link> ) : ( <Link href='/sign-up'>
                <Button className='hover:scale-105 transition duration-200 shadow-lg' variant='default' size='lg'>Begin your journey</Button>
            </Link>)}
        </div>
    </div>
  )
}

export default Hero