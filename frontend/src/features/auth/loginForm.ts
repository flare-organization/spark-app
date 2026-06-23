import { z } from 'zod'

export const loginFormSchema = z.object({
    username: z
        .string('Username is required')
        .toLowerCase()
        .regex(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/, 'Invalid username'),
    password: z.string('Password is required'),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>
