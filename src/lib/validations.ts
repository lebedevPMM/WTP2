import { z } from 'zod'

// Submit Case Form Schema (simplified — 3 open fields)
export const submitCaseSchema = z.object({
    whoAreYou: z.string()
        .min(2, 'Please tell us who you are')
        .max(200, 'Text is too long'),

    howToContact: z.string()
        .min(5, 'Please provide contact details')
        .max(300, 'Text is too long'),

    howCanWeHelp: z.string()
        .min(10, 'Please describe your request')
        .max(2000, 'Description is too long'),

    consentPrivacy: z.literal(true, 'You must agree to the Privacy Policy'),
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

    consentPrivacy: z.literal(true, 'You must agree to the Privacy Policy'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
