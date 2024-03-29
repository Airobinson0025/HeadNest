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
import { RiMenu3Line } from 'react-icons/ri'

const MainNav = () => {
  
  const { data: session } = useSession()

  const firstName = session?.user.name.split(' ')[0]
  

  return (
    <div className='flex items-center justify-between sticky w-full p-3 bg-transparent backdrop-blur-lg border-b'>
      
      <div>
        <Link href='/'>
          <Image src='/BlackLogoNoBg.png' height={160} width={160} alt='logo' />
        </Link>
      </div>

      <nav className='hidden lg:inline'>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
              </NavigationMenuItem>
              <NavigationMenuLink href='/admin' className={navigationMenuTriggerStyle()}>Dashboard</NavigationMenuLink>
              <NavigationMenuLink href='/pricing' className={navigationMenuTriggerStyle()}>Pricing</NavigationMenuLink>
              <NavigationMenuLink href='/mission' className={navigationMenuTriggerStyle()}>Mission</NavigationMenuLink>
              <NavigationMenuItem>
                 <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
             </NavigationMenuItem>
           </NavigationMenuList>
         </NavigationMenu>
      </nav>

      <div className='lg:hidden border border-primary p-1 rounded-md'>
        <RiMenu3Line size={22} color='black'/>
      </div>
    </div>
  )
}

export default MainNav 