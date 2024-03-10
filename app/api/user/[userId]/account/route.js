import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const { username, dateOfBirth, gender, pronouns, phoneNumber, bio } = body;

        const { userId } = req.query


        //update user
        const updateUser = await prisma.user.update({
            where: { id: userId },
            data: {
                account: {
                    create: {
                        username,
                        dateOfBirth,
                        gender,
                        pronouns,
                        phoneNumber,
                        bio
                    }
                }
            }
        })

        return NextResponse.json({ updateUser: updateUser, message: 'Account info updated successfully' }, { status: 201 })

    } catch (error) {

        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
        
    }
}