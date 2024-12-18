import { z } from "zod"

export type messages = {
    id: number
    text: string
    user: string,
    image: string
    added: Date,
}
export type pagination = {
    number:number
    id:number
}
