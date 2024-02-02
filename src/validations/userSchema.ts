import { z } from 'zod'

const plans = ['basic', 'free', 'premium', 'pro'] as const

export type Plan = (typeof plans)[number]

export const mappedPlans = plans.reduce((acc, plan) => {
  acc[plan] = plan.toUpperCase()
  return acc
}, {} as Record<Plan, string>)
// const mappedPlans = plans.reduce((acc, plan) => {
//   acc[plan] = plan
//   return acc
// }, {} as Record<Plan, Plan>)

export const userSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Name must be at least 3 characters')
      .max(200, 'Name must be at most 255 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
    dateOfBirth: z
      .string()
      .refine(
        (dob) => new Date(dob).toString() !== 'Invalid Date',
        'Invalid date of birth'
      ),
    weight: z
      .string()
      .refine(
        (weight) => !isNaN(parseFloat(weight)),
        'Weight must be a number'
      ),
    plan: z.enum(plans, {
      errorMap: () => ({ message: 'Invalid plan' })
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })
