import { z } from 'zod'

// Submit Case Form Schema
export const submitCaseSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name is too long'),

    email: z.string()
        .email('Please enter a valid email address'),

    telegram: z.string()
        .optional()
        .refine((val) => !val || val.startsWith('@') || val.length === 0, {
            message: 'Telegram handle should start with @'
        }),

    nationality: z.string()
        .min(1, 'Please select client nationality'),

    residency: z.string()
        .min(1, 'Please select residency'),

    businessActivity: z.string()
        .min(10, 'Please provide more details about business activity')
        .max(1000, 'Description is too long'),

    bankingJurisdiction: z.string()
        .min(1, 'Please select preferred banking jurisdiction'),

    sourceOfFunds: z.string()
        .min(10, 'Please provide more details about source of funds')
        .max(1000, 'Description is too long'),
})

export type SubmitCaseFormData = z.infer<typeof submitCaseSchema>

// Contact Form Schema
export const contactFormSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name is too long'),

    email: z.string()
        .email('Please enter a valid email address'),

    telegram: z.string()
        .optional()
        .refine((val) => !val || val.startsWith('@') || val.length === 0, {
            message: 'Telegram handle should start with @'
        }),

    message: z.string()
        .min(10, 'Message must be at least 10 characters')
        .max(1000, 'Message is too long'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
