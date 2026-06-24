import { Button } from '@/components/ui/button'
import { Field, FieldDescription } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { login } from '@/services/authService.ts'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { CircleAlert } from 'lucide-react'
import { loginFormSchema, LoginFormValues } from '@/features/auth/loginForm.ts'
import {LoginRequest} from "@openapi/model/loginRequest.ts";

export function LoginForm() {
    const [submitError, setSubmitError] = useState<string | null>(null)

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
        mode: 'onBlur',
        reValidateMode: 'onSubmit',
    })

    async function onSubmit(values: LoginRequest) {
        setSubmitError(null)

        const request: LoginRequest = {
            username: values.username,
            password: values.password,
        }

        try {
            await login(request)
        } catch {
            setSubmitError('Failed to login. Please try again.')
        }
    }

    return (
        <Form {...form}>
            <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Login to your account</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter your credentials below to login to your account
                    </p>
                </div>

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <FormControl>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Spark-user"
                                    {...field}
                                />
                            </FormControl>
                            <div className="flex items-start gap-2">
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <FormControl>
                                <Input id="password" type="password" {...field} />
                            </FormControl>
                            <div className="flex items-start gap-2">
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />

                {submitError && (
                    <p className="text-destructive flex items-center gap-1.5 text-sm">
                        <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
                        {submitError}
                    </p>
                )}

                <Field>
                    <Button type="submit">Create Account</Button>
                </Field>

                <Field>
                    <FieldDescription className="text-center">
                        Don&apos;t have an account? <Link to="/signup">Sign up</Link>
                    </FieldDescription>
                </Field>
            </form>
        </Form>
    )
}
