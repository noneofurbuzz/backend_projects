import { z } from "zod"
import { userSchema } from "./schema"

export interface FormProps{
    showForm: boolean
    handleForm: () => void
}
export type userSchemaType = z.infer<typeof userSchema>

export type userSchemaError = z.inferFormattedError<typeof userSchema>

