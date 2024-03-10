import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
    try {
        const { userId } = params
        console.log('this is my userId', userId)
        const body = await req.json();
        const { username, dateOfBirth, genderIdentity, pronouns, phoneNumber, bio, image, location } = body

        if(!userId) {
            return NextResponse.json({ message: 'Missing userId' }, { status: 400 })
        }

       const createProfile = await prisma.profile.create({
        data: {
            username,
            dateOfBirth,
            genderIdentity,
            pronouns,
            phoneNumber,
            bio,
            image,
            location
        }
       })

       const user = await prisma.user.update({
           where: {
               id: userId
           },
           data: {
               profile: {
                   connect: {
                       id: createProfile.id
                   }
               }
           }
         })
        
        return NextResponse.json({ message: 'Account Info updated successfully' }, { status: 201 })


    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}