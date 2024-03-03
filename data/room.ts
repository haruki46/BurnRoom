import { db } from "@/lib/db";
export const getroomEmail = async (auth: string) => {
    try {
      const getroomEmail = await db.room.findFirst({
        where: { authorId: auth}
      });
  
      return getroomEmail;
    } catch {
      return null;
    }
  };
export const getroom = async (room: number) => {
  try {
    const getroom = await db.room.findFirst({
      where: { room }
    });

    return getroom;
  } catch {
    return null;
  }
}

export const getroomnumber = async (roomnumber: number) => {
  try {
    const getroomnumber = await db.room.findFirst({
      where: { roomnumber }
    });

    return getroomnumber;
  } catch {
    return null;
  }
}
  