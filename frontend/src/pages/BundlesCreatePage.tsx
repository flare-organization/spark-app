import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, CircleAlert, Globe, Lock, Upload } from 'lucide-react'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
    Form,
    FormCharCount,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { createBundle } from '@/services/bundleService'
import { type CreateBundle, CreateBundleVisibilityEnum } from '@openapi/model/createBundle.ts'

import {
    type BundleFormValues,
    DESCRIPTION_MAX,
    NAME_MAX,
    bundleFormDefaults,
    bundleFormSchema,
} from '@/features/bundles/bundleForm.ts'

export default function BundlesCreatePage() {
    const navigate = useNavigate()
    const [submitError, setSubmitError] = useState<string | null>(null)

    const form = useForm<BundleFormValues>({
        resolver: zodResolver(bundleFormSchema),
        mode: 'onSubmit',
        defaultValues: bundleFormDefaults,
    })

    const name = useWatch({ control: form.control, name: 'name' })
    const description = useWatch({ control: form.control, name: 'description' })

    async function onSubmit(values: BundleFormValues) {
        setSubmitError(null)

        const request: CreateBundle = {
            name: values.name,
            description: values.description,
            visibility: values.visibility,
        }

        try {
            await createBundle(request)
            navigate('/')
        } catch {
            setSubmitError('Failed to create bundle. Please try again.')
        }
    }

    return (
        <div className="mx-auto flex max-w-2xl flex-col gap-7 px-6 py-8">
            <header className="flex flex-col gap-1.5">
                <h1 className="flex items-center gap-2.5 font-mono text-2xl font-semibold tracking-tight">
                    <Upload className="text-primary size-6" aria-hidden="true" />
                    Publish a bundle
                </h1>
                <p className="text-muted-foreground text-sm">
                    Give your bundle a name and description.
                </p>
            </header>

            <Card>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-6"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bundle name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="my-bundle" autoFocus {...field} />
                                        </FormControl>
                                        <div className="flex items-start gap-2">
                                            <FormMessage />
                                            <FormCharCount value={name} max={NAME_MAX} />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel optional>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="What's in this bundle?"
                                                rows={3}
                                                {...field}
                                            />
                                        </FormControl>
                                        <div className="flex items-start gap-2">
                                            <FormMessage />
                                            <FormCharCount
                                                value={description}
                                                max={DESCRIPTION_MAX}
                                            />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="visibility"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Visibility</FormLabel>
                                        <FormControl>
                                            <ToggleGroup
                                                type="single"
                                                variant="outline"
                                                spacing={0}
                                                value={field.value}
                                                onValueChange={(value) =>
                                                    value && field.onChange(value)
                                                }
                                                className="w-full *:flex-1"
                                            >
                                                <ToggleGroupItem
                                                    value={CreateBundleVisibilityEnum.PUBLIC}
                                                >
                                                    <Globe className="size-4" aria-hidden="true" />
                                                    Public
                                                </ToggleGroupItem>
                                                <ToggleGroupItem
                                                    value={CreateBundleVisibilityEnum.PRIVATE}
                                                >
                                                    <Lock className="size-4" aria-hidden="true" />
                                                    Private
                                                </ToggleGroupItem>
                                            </ToggleGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {submitError && (
                                <p className="text-destructive flex items-center gap-1.5 text-sm">
                                    <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
                                    {submitError}
                                </p>
                            )}

                            <div className="flex justify-end gap-2 border-t pt-5">
                                <Button type="submit" disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? 'Publishing…' : 'Publish bundle'}
                                    <ArrowRight className="size-4" aria-hidden="true" />
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
