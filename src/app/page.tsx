'use client'

import { mappedPlans, userSchema } from '@/validations/userSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

type Inputs = {
  name: string
  email: string
  password: string
  confirmPassword: string
  weight: string
  plan: string
}

function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(userSchema)
  })

  const plansOptions = Object.entries(mappedPlans).map(([key, value]) => (
    <option
      key={key}
      value={key}
    >
      {value}
    </option>
  ))

  return (
    <div>
      <form onSubmit={handleSubmit((data) => console.log({ data }))}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          {...register('name')}
        />

        {errors.name && <p>{errors.name.message}</p>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register('email')}
        />

        {errors.email && <p>{errors.email.message}</p>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register('password')}
        />

        {errors.password && <p>{errors.password.message}</p>}

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          {...register('confirmPassword')}
        />

        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

        <label htmlFor="weight">Weight</label>
        <input
          type="text"
          id="weight"
          {...register('weight')}
        />

        {errors.weight && <p>{errors.weight.message}</p>}

        <label htmlFor="plan">Plan</label>
        <select
          id="plan"
          {...register('plan')}
        >
          {plansOptions}
        </select>

        {errors.plan && <p>{errors.plan.message}</p>}

        <button type="submit">Submit</button>
      </form>

      <div>
        <h2>Errors</h2>
        <pre>{JSON.stringify(watch(), null, 2)}</pre>
      </div>
    </div>
  )
}

export default Home
