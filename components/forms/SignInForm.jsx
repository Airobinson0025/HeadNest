'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import GoogleSignInButton from '../ui/GoogleSignInButton'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string().min(1, 'Password is required').
    min(6, 'Password must be at least 6 characters long').
    regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')

})


const SignInForm = () => {

    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const handleSubmit = async (values) => {
        const signInData = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false
        });
        if(signInData.error) {
            console.log(signInData.error)
        } else {
            router.push('/admin')
        }
    }

  return (
    <Form {...form} className='flex flex-col items-center'>
        <h1 className='text-center'>Sign In</h1>
        <form 
            onSubmit={form.handleSubmit(handleSubmit)}
            className='flex flex-col gap-4 mt-6'>
            
            <FormField
               control={form.control}
               name='email'
               render={({field}) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder='Mail@example.com' {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name='password'
               render={({field}) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input placeholder='Enter your password' type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
               )}
            />
            <Button type='submit'>Sign In</Button>
        </form>
        <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>or</div>
        <GoogleSignInButton>Sign In with Google</GoogleSignInButton>
        <p className='text-center text-sm text-gray-600 mt-2'>If you don&apos;t have an account, please&nbsp;
          <Link className='text-blue-500 hover:underline' href='/sign-up'>Sign up</Link>
        </p>
    </Form>
  )
}

export default SignInForm