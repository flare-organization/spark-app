import { z } from 'zod'

import { CreateBundleStatusEnum } from '@openapi/model/createBundle.ts'

export const NAME_MAX = 128
export const DESCRIPTION_MAX = 512

export const bundleFormSchema = z.object({
    name: z
        .string()
        .min(1, 'Bundle name is required.')
        .max(NAME_MAX, `Bundle name must be ${NAME_MAX} characters or fewer.`),
    description: z
        .string()
        .trim()
        .max(DESCRIPTION_MAX, `Description must be ${DESCRIPTION_MAX} characters or fewer.`),
    status: z.enum(CreateBundleStatusEnum),
})

export type BundleFormValues = z.infer<typeof bundleFormSchema>

export const bundleFormDefaults: BundleFormValues = {
    name: '',
    description: '',
    status: CreateBundleStatusEnum.PUBLIC,
}
