'use client'
import Link from 'next/link'
import React from 'react'
import { useSession } from 'next-auth/react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import ProfileAvatar from './ProfileAvatar'
import { Button } from './ui/button'
import Image from 'next/image'

const MainNav = () => {
  
  const { data: session } = useSession()
  // console.log(session)

  const firstName = session?.user.name.split(' ')[0]
  

  return (
    <div className='flex items-center justify-between sticky w-full p-3 bg-transparent backdrop-blur-lg border-b'>
      
      <div>
        <Link href='/'>
          <Image src='/BlackLogoNoBg.png' height={180} width={180} alt='logo' />
        </Link>
      </div>

      <nav className='hidden md:inline'>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
              </NavigationMenuItem>
              <NavigationMenuLink href='/admin' className={navigationMenuTriggerStyle()}>Dashboard</NavigationMenuLink>
              <NavigationMenuLink href='/pricing' className={navigationMenuTriggerStyle()}>Pricing</NavigationMenuLink>
              <NavigationMenuItem>
                 <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
             </NavigationMenuItem>
           </NavigationMenuList>
         </NavigationMenu>
      </nav>

      <div className='hidden lg:inline'>
        { session ? (
          <div className='flex items-center gap-3'>
            <p className='text-sm font-semibold'>Welcome back, {firstName}!</p>
            <ProfileAvatar />
          </div>
        ) : (
          <Link href='/sign-in'>
            <Button>Sign in</Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default MainNav