import React from 'react'
import Image from "next/image";
import Link from "next/link"
import { Logout } from '@/controllers';

export default function Header() {

    async function logout() {
        const res = await Logout()

        if (res != "error") {

            document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            window.location.reload();
        }


    }

    return (
        <header className="topbar">
            <div className="with-horizontal">
                {/* ---------------------------------- */}
                {/* Start Vertical Layout Header */}
                {/* ---------------------------------- */}
                <nav className="navbar navbar-expand-lg p-0">
                    <ul className="navbar-nav">
                        {/* <li className="nav-item">
                            <a
                                className="nav-link sidebartoggler nav-icon-hover ms-n3"
                                id="headerCollapse"
                                href="javascript:void(0)"
                            >
                                <i className="ti ti-menu-2" />
                            </a>
                        </li> */}

                    </ul>
                    <ul className="navbar-nav quick-links d-none d-lg-flex">
                        {/* ------------------------------- */}
                        {/* start apps Dropdown */}
                        {/* ------------------------------- */}
                        <li className="nav-item d-none d-lg-block">

                            <Link
                                className="nav-link"
                                href="/"
                                data-bs-toggle="dropdown"
                            >
                                Home
                            </Link>

                        </li>
                        <li className="nav-item d-none d-lg-block">

                            <Link
                                className="nav-link"
                                href="/docs.html"
                                data-bs-toggle="dropdown"
                            >
                                Documentation
                            </Link>

                        </li>
                        <li className="nav-item dropdown hover-dd d-none d-lg-block">
                            <Link
                                className="nav-link"
                                href="javascript:void(0)"
                                data-bs-toggle="dropdown"
                            >
                                Apps
                                <span className="mt-1">
                                    <i className="ti ti-chevron-down fs-3" />
                                </span>
                            </Link>

                            <div className="dropdown-menu dropdown-menu-animate-up py-0">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="ps-7 pt-7">
                                            <div className="border-bottom">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="position-relative">
                                                            <Link
                                                                href="/iam/org"
                                                                className="d-flex align-items-center pb-9 position-relative"
                                                            >

                                                                <div className="d-inline-block">
                                                                    <h6 className="mb-1 fw-semibold fs-3">
                                                                        Organization
                                                                    </h6>
                                                                    
                                                                </div>
                                                            </Link> 

                                                            <Link
                                                                href="#"
                                                                className="d-flex align-items-center pb-9 position-relative"
                                                            >

                                                                <div className="d-inline-block">
                                                                    <h6 className="mb-1 fw-semibold fs-3">
                                                                        Service Email
                                                                    </h6>
                                                                    
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </li>

                        <li className="nav-item dropdown hover-dd d-none d-lg-block">
                            <Link
                                className="nav-link"
                                href="javascript:void(0)"
                                data-bs-toggle="dropdown"
                            >
                                Chats
                                <span className="mt-1">
                                    <i className="ti ti-chevron-down fs-3" />
                                </span>
                            </Link>

                            <div className="dropdown-menu dropdown-menu-animate-up py-0">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="ps-7 pt-7">
                                            <div className="border-bottom">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="position-relative">
                                                            <Link
                                                                href="/chat-petani"
                                                                className="d-flex align-items-center pb-9 position-relative"
                                                            >

                                                                <div className="d-inline-block">
                                                                    <h6 className="mb-1 fw-semibold fs-3">
                                                                        Chat Petani
                                                                    </h6>
                                                                    
                                                                </div>
                                                            </Link> 

                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="position-relative">
                                                            <Link
                                                                href="/document-processing"
                                                                className="d-flex align-items-center pb-9 position-relative"
                                                            >

                                                                <div className="d-inline-block">
                                                                    <h6 className="mb-1 fw-semibold fs-3">
                                                                        Documents Processing - Read Image
                                                                    </h6>
                                                                    
                                                                </div>
                                                            </Link> 

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </li>


                    </ul>

                    <a
                        className="navbar-toggler nav-icon-hover p-0 border-0"
                        href="javascript:void(0)"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="p-2">
                            <i className="ti ti-dots fs-7" />
                        </span>
                    </a>
                    <div
                        className="collapse navbar-collapse justify-content-end"
                        id="navbarNav"
                    >
                        <div className="d-flex align-items-center justify-content-between">
                            <a
                                href="javascript:void(0)"
                                className="nav-link d-flex d-lg-none align-items-center justify-content-center"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#mobilenavbar"
                                aria-controls="offcanvasWithBothOptions"
                            >
                                <i className="ti ti-align-justified fs-7" />
                            </a>
                            <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-center">
                                {/* ------------------------------- */}
                                {/* start profile Dropdown */}
                                {/* ------------------------------- */}
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link pe-0"
                                        href="javascript:void(0)"
                                        id="drop1"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <div className="d-flex align-items-center">
                                            {/* <div className="user-profile-img">
                                                <Image
                                                    src="/assets/images/profile/user-1.jpg"
                                                    className="rounded-circle"
                                                    width={35}
                                                    height={35}
                                                    alt=""
                                                />
                                            </div> */}
                                            <button onClick={logout} className="btn btn-sm btn-danger">Logout</button>
                                        </div>
                                    </a>

                                </li>
                                {/* ------------------------------- */}
                                {/* end profile Dropdown */}
                                {/* ------------------------------- */}
                            </ul>
                        </div>
                    </div>
                </nav>
                {/* ---------------------------------- */}
                {/* End Vertical Layout Header */}
                {/* ---------------------------------- */}
                {/* ------------------------------- */}
                {/* apps Dropdown in Small screen */}
                {/* ------------------------------- */}
                {/*  Mobilenavbar */}
                <div
                    className="offcanvas offcanvas-start"
                    data-bs-scroll="true"
                    tabIndex={-1}
                    id="mobilenavbar"
                    aria-labelledby="offcanvasWithBothOptionsLabel"
                >
                    <nav className="sidebar-nav scroll-sidebar">
                        <div className="offcanvas-header justify-content-between">
                            <Image
                                src="/assets/images/logos/favicon.ico"
                                alt=""
                                width={35}
                                height={35}
                                className="img-fluid"
                            />
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            />
                        </div>
                        <div
                            className="offcanvas-body"
                            data-simplebar=""
                            style={{ height: "calc(100vh - 80px)" }}
                        >

                        </div>
                    </nav>
                </div>
            </div>

        </header>
    )
}
