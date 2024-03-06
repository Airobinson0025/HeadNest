'use client'
import React from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import ImageUpload from '../ImageUpload'

const formSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
    image: z.string().url(),
    dateofBirth: z.string(),
    phoneNumber: z.string().min(10, { message: 'Phone number must be at least 10 characters long' }),
  })

const AccountInfoForm = () => {
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: '',
          image: '',
          dateofBirth: '',
          genderIndentity: '',
          pronouns: '',
          location: '',
          phoneNumber: '',

        },
      })

      const handleSubmit = (values) => {
        console.log(values)
      }
    


  return (
    <Form {...form}>
        <form>
        <FormField control={form.control} name='email' 
          render={({field}) => {
            return <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter Full Name' type='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          }}/> 
        </form>
    </Form>
  )
}

export default AccountInfoForm