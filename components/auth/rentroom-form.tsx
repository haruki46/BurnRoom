"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { use, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,  
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-rent"
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { RentRoomSchema } from "@/schemas/room";
import { rentroom } from "@/actions/rentroom";
import { DatePickerWithRange } from "./calender-button";

export const RentRoomForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof RentRoomSchema>>({
        resolver: zodResolver(RentRoomSchema),
            defaultValues: {
                email: "",
                room: "",
                roomnumber: "",
                date: "",
            }});

        const  onSubmit = (values: z.infer<typeof RentRoomSchema>) => {
            setError("");
            setSuccess("");

            startTransition(() =>{
                rentroom(values)
                    .then((data) => {
                        setError(data.error);
                        setSuccess(data.success);
                    })
            });
        }

    return (
        
        <CardWrapper
        headerLabel="Rent a room"
        backButtonLabel=" "
        backButtonHref="/"
        showSocial
        >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(() => {})}
                
                className="space-y-6"
            >
                <div className="space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                        {...field}
                                        placeholder="RhythmOwO@email.com"
                                        disabled={isPending}
                                        type="email"
                                            />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="room"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="room">Room Floor</FormLabel>
                                    <FormControl>
                                        <Input
                                        {...field}
                                        placeholder="Room Floor"
                                        type="room"
                                            />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="roomnumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="roomnumber">Room Number</FormLabel>
                                    <FormControl>
                                        <Input
                                        {...field}
                                        placeholder="Room Number"
                                        type="roomnumber"
                                            />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="date">Set Date</FormLabel>
                                    <FormControl>
                                        <Input
                                        {...field}
                                        placeholder="Date"
                                        type="date"
                                            />
                                    </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
                
                <Button
                    disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                     Rent Room
          </Button>
            </form>
        </Form>
        </CardWrapper>
        
    );
    }