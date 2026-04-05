import {  z } from "zod";

let schema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT_ADMIN_API: z.string().default("7844"),
    NEXT_PUBLIC_PORT_ADMIN_WEB: z.string().default("7845"),
    PORT_API: z.string().default("4000"),
    NEXT_PUBLIC_PORT_WEB: z.string().default("3000"),
})

export const env = schema.parse(process.env)
