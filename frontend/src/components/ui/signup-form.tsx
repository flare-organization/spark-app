import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import { SignUpFormValues, PASSWORD_MIN, signUpFormSchema } from '@/features/auth/signupForm.ts'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {  useAuth } from "@/hooks/use-auth.ts";
import { useNavigate } from "react-router-dom";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { CircleAlert } from 'lucide-react'
import {SignUpRequest} from "@openapi/model/signUpRequest.ts";

export function SignupForm() {
    const [submitError, setSubmitError] = useState<string | null>(null)
    const { register } = useAuth();
    const navigate = useNavigate()

    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpFormSchema),
        mode: 'onBlur',
        reValidateMode: 'onSubmit',
    })

    async function onSubmit(values: SignUpFormValues) {
        setSubmitError(null)

        const request: SignUpRequest = {
            username: values.username,
            email: values.email,
            password: values.password,
        }

        try {
            await register(request)
            navigate('/')
        } catch {
            setSubmitError('Failed to signup. Please try again.')
        }
    }

    return (
        <Form {...form}>
            <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h1 className="text-2xl font-bold">Create your account</h1>
                        <p className="text-muted-foreground text-sm text-balance">
                            Fill in the form below to create your account
                        </p>
                    </div>

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="email@example.com"
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input id="password" type="password" {...field} />
                                </FormControl>
                                <div className="flex flex-col items-start gap-2">
                                    <FieldDescription>
                                        Must be at least {PASSWORD_MIN} characters long.
                                    </FieldDescription>
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
                            Already have an account? <Link to="/login">Sign in</Link>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </form>
        </Form>
    )
}
