import React from 'react'
import Head from 'next/head'
import { Login } from "@/controllers"
import { useState } from 'react';

export default function PageLogin() {

    const [loading, setLoading] = useState('hide')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function SignIn() {

        setLoading('show')
        const res = await Login(username, password)

        if (res !== 'error') {

            console.log(res)

            localStorage.setItem('token', res.token);
            localStorage.setItem('name', res.name);

            setLoading('hide')

            return (window.location.href = "/");

        }
        setLoading('hide')
    }

    return (
        <>
            <Head>
                <title>Es Teh Mas Toni</title>
                <meta name="description" content="Es Teh Mas Toni - Palembang" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/assets/images/rating/star-on.png" />
            </Head>
            <div className="position-relative overflow-hidden radial-gradient min-vh-100 w-100 d-flex align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-center w-100">
                    <div className="row justify-content-center w-100">
                        <div className="col-md-8 col-lg-4">
                            <div className="card mb-0">
                                <div className="card-body pt-5">
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">
                                            Username
                                        </label>
                                        <input
                                            value={username}
                                            onChange={e=>setUsername(e.target.value)}
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="exampleInputPassword1" className="form-label">
                                            Password
                                        </label>
                                        <input
                                            value={password}
                                            onChange={e=>setPassword(e.target.value)}
                                            type="password"
                                            className="form-control"
                                        />
                                    </div>

                                    <button
                                        onClick={SignIn}
                                        className="btn btn-primary w-100 py-8 mb-4 rounded-2"
                                    >
                                        {loading == "hide" &&
                                            <>
                                                Sign In
                                            </>
                                        }
                                        {loading == "show" &&
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        }

                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
