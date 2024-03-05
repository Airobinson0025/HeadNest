import React from 'react'
import { Button } from './button'


const GoogleSignInButton = ({ children }) => {
    const loginWithGoogle = () => {
        console.log('Login with Google')
    }
  return <Button onClick={loginWithGoogle} className='w-full'>{children}</Button>
}

export default GoogleSignInButton