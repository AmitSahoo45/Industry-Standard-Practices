'use client';
import { createAccount } from '@/actions/createAccount'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={createAccount}>
        <h1>Sign Up</h1>

        <label htmlFor="username">
          Username
          <input
            type='text'
            name='username'
            placeholder='Type here your username'
            autoComplete='off'
            required
            className='input input-bordered w-full max-w-xs text-black'
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            type='email'
            name='email'
            placeholder='Type here your email'
            autoComplete='off'
            required
            className='input input-bordered w-full max-w-xs text-black'
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type='password'
            name='password'
            placeholder='Type here your password'
            autoComplete='off'
            required
            className='input input-bordered w-full max-w-xs text-black'
          />
        </label>

        <input type='submit' value='Submit' />
      </form>
    </main>
  );
}
