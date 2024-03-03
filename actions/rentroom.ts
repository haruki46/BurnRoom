"use server";
import * as z from "zod"
import { db } from "@/lib/db";
import { RentRoomSchema } from "@/schemas/room";
export const rentroom = async (values: z.infer<typeof RentRoomSchema>) =>{
    const validatedFields = RentRoomSchema.safeParse(values);

    if (!validatedFields.success){
        return {error:"Invaild Field"}; 
    }
    const { email,room,roomnumber,date} = validatedFields.data;
    const exitroom = await db.room.findFirst({
        where: {
            
        }});
    if (exitroom){
        return {error: "Room is already rented!"};
    }
        // await db.room.create({
        //     data: {
        //         email,
        //         room,
        //         roomnumber,
        //         date,
        //     },
        // });
    return {success: "Rent Room!"};
};