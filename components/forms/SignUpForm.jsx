'use client'
import React from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import GoogleSignInButton from '../ui/GoogleSignInButton'
import Link from 'next/link'


const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }).regex(/[!@#$%^&*(),.?":{}|<>]/, { message: 'Password must contain at least one special character' }),
  passwordConfirmation: z.string()
}).refine((data) => {
  return data.password === data.passwordConfirmation
}, {
  message: 'Passwords do not match',
  path: ['passwordConfirmation']
})

const SignInForm = () => {
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: ''
    },
  })

  const handleSubmit = async (values) => {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        passwordConfirmation: values.passwordConfirmation
      })
    })
    if(response.ok) {
      const data = await response.json()
      console.log(data, { message: 'Registraion Successful' })
    } else {
      const error = await response.json()
      console.log(error, { message: 'Registration Failed' })
    }
  }

  return (
      <Form {...form} className='flex flex-col items-center justify-center'>
        <h1 className=''>Enter your info to sign up</h1>
        <form 
            onSubmit={form.handleSubmit(handleSubmit)} 
            className='flex flex-col gap-4 mt-8 leading-7'>
          
          <FormField control={form.control} name='email' 
          render={({field}) => {
            return <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Email Address' type='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          }}/> 
          
          <FormField control={form.control} name='password' 
          render={({field}) => {
            return <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder='Password' type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          }}/>

          <FormField control={form.control} name='passwordConfirmation' 
          render={({field}) => {
            return <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder='Confirm Password' type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          }}/>
          <Button type='submit' className='w-full'>Sign Up</Button>
        </form>
        <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>or</div>
        <GoogleSignInButton>Sign up with Google</GoogleSignInButton>
      </Form>
    
  )
}

export default SignInForm