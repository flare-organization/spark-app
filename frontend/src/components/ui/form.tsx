'use client'

import { CircleAlert } from 'lucide-react'
import { Label as LabelPrimitive, Slot } from 'radix-ui'
import {
    Controller,
    type ControllerProps,
    type FieldPath,
    type FieldValues,
    FormProvider,
    useFormContext,
    useFormState,
} from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { createContext, useContext, useId } from 'react'

const Form = FormProvider

type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    name: TName
}

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue)

const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    ...props
}: ControllerProps<TFieldValues, TName>) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    )
}

const useFormField = () => {
    const fieldContext = useContext(FormFieldContext)
    const itemContext = useContext(FormItemContext)
    const { getFieldState } = useFormContext()
    const formState = useFormState({ name: fieldContext.name })
    const fieldState = getFieldState(fieldContext.name, formState)

    if (!fieldContext) {
        throw new Error('useFormField should be used within <FormField>')
    }

    const { id } = itemContext

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    }
}

type FormItemContextValue = {
    id: string
}

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue)

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
    const id = useId()

    return (
        <FormItemContext.Provider value={{ id }}>
            <div data-slot="form-item" className={cn('grid gap-2', className)} {...props} />
        </FormItemContext.Provider>
    )
}

function FormLabel({
    className,
    optional,
    ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & { optional?: boolean }) {
    const { error, formItemId } = useFormField()

    return (
        <Label
            data-slot="form-label"
            data-error={Boolean(error)}
            className={cn('data-[error=true]:text-destructive gap-2', className)}
            htmlFor={formItemId}
            {...props}
        >
            {props.children}
            {optional && (
                <span className="text-muted-foreground text-xs font-normal">optional</span>
            )}
        </Label>
    )
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot.Root>) {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

    return (
        <Slot.Root
            data-slot="form-control"
            id={formItemId}
            aria-describedby={error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId}
            aria-invalid={Boolean(error)}
            {...props}
        />
    )
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
    const { formDescriptionId } = useFormField()

    return (
        <p
            data-slot="form-description"
            id={formDescriptionId}
            className={cn('text-muted-foreground text-xs', className)}
            {...props}
        />
    )
}

function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error?.message ?? '') : props.children

    if (!body) {
        return null
    }

    return (
        <p
            data-slot="form-message"
            id={formMessageId}
            className={cn('text-destructive flex items-center gap-1 text-xs', className)}
            {...props}
        >
            <CircleAlert className="size-3 shrink-0" aria-hidden="true" />
            {body}
        </p>
    )
}

function FormCharCount({
    value,
    max,
    className,
    ...props
}: React.ComponentProps<'p'> & { value: string; max: number }) {
    const over = value.length > max

    return (
        <p
            data-slot="form-char-count"
            className={cn(
                'text-muted-foreground ml-auto text-xs tabular-nums',
                over && 'text-destructive font-medium',
                className,
            )}
            {...props}
        >
            {value.length}/{max}
        </p>
    )
}

export {
    Form,
    FormCharCount,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    useFormField,
}
