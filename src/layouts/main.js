import Image from "next/image";
import Header from "./header";
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import { GetAuthme } from '@/controllers';

export default function Main({ children }) {
  const { pathname } = useRouter()

  const [data, setData] = useState([])

  const fetchData = useCallback(async () => {

    const res = await GetAuthme()

    if (res !== 'error') {
      setData(res)
    } else {
      window.location.href = process.env.NEXT_PUBLIC_API_SVC_SSO+'/api/login?redirect_to='+process.env.NEXT_PUBLIC_URL;
    }

  }, []);

  useEffect(() => {

    fetchData()

  }, [fetchData])

  return (
    <>
      <div id="main-wrapper">

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
