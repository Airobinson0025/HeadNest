import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center bg-cover bg-center h-[700px] px-14 '>

        <div className='my-6'>
            <h1>Logo Here</h1>
        </div>

        <div className='flex flex-col text-center space-y-3'>
            <Link href='/sign-up'>
                <Button>Sign Up</Button>
            </Link>
        </div>
    </div>
  )
}

export default Hero