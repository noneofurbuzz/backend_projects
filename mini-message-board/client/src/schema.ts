import { z } from "zod";

export const userSchema = z.object({
    name: z.string().trim().min(1, {message: "Name must contain at least 1 valid character"}),
    message: z.string().trim().min(1, {message: "Message must contain at least 1 valid character"})
})
