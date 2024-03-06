import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

const ProfileAvatar = () => {
  return (
    <Avatar className='w-8 h-8'>
       <AvatarImage src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile avatar" />
       <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

export default ProfileAvatar