import React from 'react'
import { CheckMFA } from '@/controllers';
import { useRouter } from 'next/router';
import { useEffect, useCallback } from 'react';

export default function SuccesPage() {

  const { query } = useRouter()

  const fetchData = useCallback(async () => {

    const qre = query?.redirect_to

    setTimeout(async function () {

      if(qre){

        const res = await CheckMFA(qre)
        const mfa = res?.data?.mfa

        if (!mfa) {
          window.location.href = "/mfa?redirect_to="+qre
        } else {
          const decoded = atob(qre);
          window.location.href = decoded

        }
      }

    }, 2000);

  }, [query]);

  useEffect(() => {

    fetchData()

  }, [fetchData])

  return (
    <div className="position-relative overflow-hidden radial-gradient min-vh-100 w-100 d-flex align-items-center justify-content-center">
      <div className="d-flex align-items-center justify-content-center w-100">
        <div className="row justify-content-center w-100">
          <div className="col-md-8 col-lg-4">
            <div className="card mb-0">
              <div className="card-body pt-5">

                <div className="mb-5 text-center">

                  <h5 className="fw-bolder mb-3">Single Sign On</h5>

                  <p>
                    Verification successful! We will redirect you to the page shortly. Please wait.
                  </p>

                  <div className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
