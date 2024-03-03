import * as z from "zod"

export const RentRoomSchema = z.object({
    email: z.string().email({ message: "Email is required" }),
    room: z.string().min(1,({ message: "Floor is required" })),
    roomnumber: z.string().min(1,{ message: "Room number is required" }),
    date: z.string().min(1,{ message: "Date is required" }),
  });
