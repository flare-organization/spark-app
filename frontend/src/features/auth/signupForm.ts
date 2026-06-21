import { z } from 'zod'

export const USERNAME_MIN = 2
export const USERNAME_MAX = 64

export const PASSWORD_MIN = 8
export const PASSWORD_MAX = 128

export const signUpFormSchema = z.object({
    username: z
        .string('Username is required')
        .min(USERNAME_MIN, `Username must be at least ${USERNAME_MIN} characters.`)
        .max(USERNAME_MAX, `Username must be ${USERNAME_MAX} characters or fewer.`)
        .regex(
            /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/,
            'Username can only contain letters, numbers and dashes (e.g. example-username-123).',
        ),
    email: z.email('Input must be a valid email address'),
    password: z
        .string('Password is required')
        .regex(/^\S+$/, 'Password cannot contain spaces')
        .min(PASSWORD_MIN, `Password must be at least ${PASSWORD_MIN} characters.`)
        .max(PASSWORD_MAX, `Password must be ${PASSWORD_MAX} characters or fewer.`),
})

export type SignUpFormValues = z.infer<typeof signUpFormSchema>
