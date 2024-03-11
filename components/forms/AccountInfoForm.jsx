'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '../ui/calendar'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { Textarea } from '../ui/textarea'
import { Controller } from 'react-hook-form'


const formSchema = z.object({
    username: z.string().min(2, { message: 'Username must be at least 2 characters long' }),
    dateOfBirth: z.date(),
    genderIdentity: z.string(),
    pronouns: z.string(),
    phoneNumber: z.string().min(10, { message: 'Phone number must be at least 10 characters long' }),
    bio: z.string().max(200, { message: 'Bio cannot be more the 200 characters long.' })
})

const AccountInfoForm = () => {
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: '',
          dateOfBirth: '',
          genderIdentity: '',
          pronouns: '',
          phoneNumber: '',
          bio: ''
        },
      })

      const handleSubmit = async (values) => {
        const userId = JSON.parse(localStorage.getItem('userIdForAccountInfo'))
        console.log(userId)
        const response = await fetch(`/api/user/profile/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: values.username,
                dateOfBirth: values.dateOfBirth,
                genderIdentity: values.genderIdentity,
                pronouns: values.pronouns,
                phoneNumber: values.phoneNumber,
                bio: values.bio
            })
        })
        if(response.ok) {
            localStorage.removeItem('userIdForAccountInfo')
            const data = await response.json()
            router.push('/sign-in')
            console.log(data, { message: 'Account Info Updated Successfully' })
      } else {
            const error = await response.json()
            console.log(error, { message: 'Account Info Update Failed' })
        
      }

    }

  return (
    <Form {...form}>
        <h1 className='text-center md:text-left'>Let&apos;s create your profile.</h1>
        <form onSubmit={form.handleSubmit(handleSubmit)}
            className='flex flex-col gap-4 mt-8'>

            <FormField
               control={form.control}
               name='username'
               render={({field}) => (
                <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input placeholder='Pick a username' {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
               )}
            />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    fromYear={1960}
                    toYear={2030}
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="genderIdentity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pick a gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                  <SelectItem value="PNTS">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="pronouns"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pronouns</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="What are your pronouns" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="He/Him">He/Him</SelectItem>
                  <SelectItem value="She/Her">She/Her</SelectItem>
                  <SelectItem value="They/Them">They/Them</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                  <SelectItem value="PNTS">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        

        <FormField
               control={form.control}
               name='phoneNumber'
               render={({field}) => (
                <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                        <Input placeholder='+1 234 567 9800' {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
               )}
            />

        <FormField
               control={form.control}
               name='bio'
               render={({field}) => (
                <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                        <Textarea placeholder='Tell us about yourself ( Max 200 characters )' {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
               )}
            />
            <Button type='submit'>Continue to Sign In</Button>
    </form>
        
    </Form>
  )
}

export default AccountInfoForm