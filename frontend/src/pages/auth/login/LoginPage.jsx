import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import XSvg from '../../../components/svgs/X';
import {FaUser} from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { baseURL } from '../../../constant/url';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../../components/common/LoadingSpinner';


const LoginPage = () => {
    const [formData, setFormData] = useState({
        userName: "",
        password: "",
    });

    const queryClient = useQueryClient();
    const { mutate: logIn, isPending, isError, error } = useMutation({
        mutationFn: async ({ userName, password }) => {
            try {
                const res = await fetch(`${baseURL}/api/auth/login`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify({ userName, password })
                })

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }

            } catch (error) {
                throw error;
            }
        },
        onSuccess: () => {
            toast.success("Login Successful");
            queryClient.invalidateQueries({
                queryKey: ["authUser"]
            })
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        logIn(formData);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };


    return (
        <div className='flex h-screen max-w-screen-xl mx-auto'>
            <div className='items-center justify-center flex-1 hidden lg:flex' >
                <XSvg className='lg:w-2/3 fill-white' />
            </div>
            <div className='flex flex-col items-center justify-center flex-1'>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    <XSvg className='w-24 lg:hidden fill-white' />
                    <h1 className='text-4xl font-extrabold text-white'>{"Let's "}go.</h1>
                    <label className='flex items-center gap-2 rounded input input-bordered'>
                        <FaUser/>
                        <input
                            type='text'
                            placeholder='Username'
                            className='grow'
                            onChange={handleInputChange}
                            value={formData.userName}
                            name='userName'
                        />
                    </label>

                    <label className='flex items-center gap-2 rounded input input-bordered'>
                        <MdPassword />
                        <input
                            type='password'
                            name='password'
                            onChange={handleInputChange}
                            value={formData.password}
                            placeholder='Password'
                            className='grow'
                        />
                    </label>
                    <button className='text-white rounded-full btn btn-primary'>Login</button>
                    {isPending ? <LoadingSpinner/> : "Logged In"}
                    {
                        isError && (
                            <p className='text-red-500'>{error.message}</p>
                        )
                    }
                </form>
                <div className='flex flex-col gap-2 mt-4'>
                    <p className='text-lg text-white'>{"Don't"} have an account?</p>
                    <Link to="/signup">
                        <button className='w-full text-white rounded-full btn btn-primary btn-outline'>Sign Up</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}




export default LoginPage;