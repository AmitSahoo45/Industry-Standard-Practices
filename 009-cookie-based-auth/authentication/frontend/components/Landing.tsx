'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const router = useRouter();

    useEffect(() => {
    }, []);

    return (
        <div>
            <p><span className="font-semibold text-3xl">Hi👋🏼</span>, <br />
                <span className="text-2xl">I am Amit.</span> A software developer
            </p>
            <p>this is a simple web application that demonstrates cookie based authentication.</p>

            {isLoggedIn ?
                <>
                    <p className="text-green-500">Well done. You are logged in</p>
                    <button className="text-zinc-400 hover:text-zinc-200 backdrop-blur-lg bg-gradient-to-tr from-transparent via-[rgba(121,121,121,0.16)] to-transparent rounded-md py-2 px-6 shadow hover:shadow-zinc-800 duration-700 mt-3">Logout</button>
                </>
                :
                <>
                    <p className="text-red-500">Oops!!! You are not logged in</p>
                    <button className="text-zinc-400 hover:text-zinc-200 backdrop-blur-lg bg-gradient-to-tr from-transparent via-[rgba(121,121,121,0.16)] mt-3 to-transparent rounded-md py-2 px-6 shadow hover:shadow-zinc-800 duration-700" 
                    onClick={() => router.push('/login')}>Login</button>
                </>
            }
        </div>
    );
};

export default LandingPage;
