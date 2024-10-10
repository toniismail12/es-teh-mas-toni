import Image from "next/image";
import Menu from "./menu";
import Header from "./header";
import { useRouter } from 'next/router';

export default function Main({ children }) {
  const { pathname } = useRouter()
  return (
    <>
      <div id="main-wrapper">
        {/* Sidebar Start */}

        {/* <aside className="left-sidebar with-vertical">
          <div>
            
            <div className="brand-logo d-flex align-items-center justify-content-between">

              <h5>Portal Services</h5>

              <a
                href="javascript:void(0)"
                className="sidebartoggler ms-auto text-decoration-none fs-5 d-block d-xl-none"
              >
                <i className="ti ti-x" />
              </a>
            </div>
            <nav className="sidebar-nav scroll-sidebar" data-simplebar="">

              <Menu />

            </nav>
            <div className="fixed-profile p-3 mx-4 mb-2 bg-secondary-subtle rounded sidebar-ad mt-3">
              <div className="hstack gap-3">
                <div className="john-img">
                  <Image
                    src="/assets/images/profile/user-1.jpg"
                    className="rounded-circle"
                    width={40}
                    height={40}
                    alt=""
                  />
                </div>
                <div className="john-title">
                  <h6 className="mb-0 fs-4 fw-semibold">Mathew</h6>
                  <span className="fs-2">Designer</span>
                </div>
                <button
                  className="border-0 bg-transparent text-primary ms-auto"
                  tabIndex={0}
                  type="button"
                  aria-label="logout"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-title="logout"
                >
                  <i className="ti ti-power fs-6" />
                </button>
              </div>
            </div>

          </div>
        </aside> */}

        {/*  Sidebar End */}
        <div className="page-wrapper">

          {/*  Header Start */}
          <Header />
          {/*  Header End */}

          <div className="body-wrapper">
            <div className="container-fluid">

              <div className="row">

                <div className="col-lg-12 d-flex align-items-stretch">
                  <div className="card w-100 bg-primary-subtle overflow-hidden shadow-none">
                    <div className="card-body position-relative">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="d-flex align-items-center mb-7">

                            <h5 className="fw-semibold mb-0 fs-5">
                              {/* {pathname} */}
                              {pathname === "/" ? "Welcome back !" : pathname}
                            </h5>
                          </div>

                        </div>
                        <div className="col-sm-5">
                          <div className="welcome-bg-img mb-n7 text-end">
                            <Image
                              src="/assets/images/backgrounds/welcome-bg.svg"
                              alt="modernize-img"
                              className="img-fluid"
                              width={230}
                              height={100}
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                
              </div>

              {children}
            </div>
          </div>

        </div>

      </div>
    </>

  );
}
