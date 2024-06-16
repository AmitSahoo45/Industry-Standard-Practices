'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const LoginPage = () => {
    const [isNewUser, setIsNewUser] = useState<boolean>(false);

    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const router = useRouter();

    return (
        <div>
            <button className='text-zinc-400 hover:text-zinc-200 backdrop-blur-lg bg-gradient-to-tr from-transparent via-[rgba(121,121,121,0.16)] to-transparent rounded-md py-2 px-6 shadow hover:shadow-zinc-800 duration-700 ml-8 mt-6'
            onClick={() => router.push('/')}
            >
                Back
            </button>
            <div className="w-1/4 sm:w-1/4 mx-auto text-center">
                <div>
                    <h1 className="text-2xl text-zinc-400 pt-5 pb-2">
                        {isNewUser ? 'Register' : 'Login'}
                    </h1>

                    {isNewUser && (
                        <div>
                            <input type='email'
                                className='bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition'
                                placeholder='Enter your email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    )}

                    <div>
                        <input type='text'
                            className='bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 my-4 text-base hover:border-[#fff] cursor-pointer transition'
                            placeholder='Enter your username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <input
                            type='password'
                            className='bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 mb-4 text-base hover:border-zinc-600 duration-300 transition selection:bg-zinc-600 selection:text-zinc-200'
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className='flex justify-center'>
                        {isNewUser ? (
                            <button className='text-zinc-500 hover:text-zinc-200 backdrop-blur-lg bg-gradient-to-tr from-transparent via-[rgba(121,121,121,0.16)] to-transparent rounded-md py-2 px-6 shadow hover:shadow-zinc-400 duration-700'>Sign Up</button>
                        ) : (
                            <button className='text-zinc-500 hover:text-zinc-200 backdrop-blur-lg bg-gradient-to-tr from-transparent via-[rgba(121,121,121,0.16)] to-transparent rounded-md py-2 px-6 shadow hover:shadow-zinc-600 duration-700'>Login</button>
                        )}
                    </div>

                    <div className='mt-5 text-xs'>
                        {isNewUser ?
                            <>
                                <p>
                                    Already have an account? <span className='transition-all text-zinc-500 cursor-pointer hover:text-zinc-200 duration-200' onClick={() => setIsNewUser(false)}>Login</span>
                                </p>
                            </>
                            :
                            <>
                                <p>
                                    Don't have an account? <span className='text-zinc-500 cursor-pointer hover:text-zinc-200' onClick={() => setIsNewUser(true)}>Register</span>
                                </p>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;