import React from 'react'
import { VerifyOTP, SendOTP } from '@/controllers';
import { useRouter } from 'next/router';
import { useEffect, useCallback, useState } from 'react';

export default function SuccesPage() {

  const { query } = useRouter()

  const [no_hp, setNo_hp] = useState("")

  const fetchData = useCallback(async () => {

    const res = await SendOTP()
    console.log(res?.data?.no_hp)
    setNo_hp(res?.data?.no_hp)

  }, []);

  useEffect(() => {

    fetchData()

  }, [fetchData])

  async function PostKode() {
    // Collect values from the input fields
    const kode = Array.from({ length: 6 }, (_, i) => {
      const inputElement = document.getElementById(`text${i + 1}`);
      return inputElement?.value || ""; // Get the value or default to an empty string
    }).join(""); // Join the array values into a single string

    const redirect = query?.redirect_to; // Get redirect URL from environment variable

    if (kode.length === 6) { // Ensure all inputs are filled
      await VerifyOTP(kode, redirect);
    } else {
      alert("Please fill all input fields.");
    }
  }

  async function ResendKode() {
    fetchData()
  }

  return (
    <div className="position-relative overflow-hidden radial-gradient min-vh-100 w-100 d-flex align-items-center justify-content-center">
      <div className="d-flex align-items-center justify-content-center w-100">
        <div className="row justify-content-center w-100">
          <div className="col-md-8 col-lg-4">
            <div className="card mb-0">
              <div className="card-body pt-5">

                <div className="mb-3 text-center">

                  <h5 className="fw-bolder mb-3">Multifactor Authentication</h5>

                  <p>
                    We sent a verification code to your mobile. Enter the code from
                    the mobile in the field below.
                  </p>

                </div>
                <div className="mb-4 text-center">

                  <p>
                    We sent code to: 
                  </p>
                  <h5 className="fw-bolder">{no_hp}</h5>

                </div>
                <div className="mb-3">
                  <label
                    className="form-label fw-semibold"
                  >
                    Type your 6 digits security code
                  </label>
                  <div className="d-flex align-items-center gap-2 gap-sm-3">
                    {[...Array(6)].map((_, index) => (
                      <input
                        key={index}
                        id={`text${index + 1}`}
                        maxLength={1}
                        type="text"
                        className="form-control"
                        placeholder=""
                        onInput={(e) => {
                          const nextInput = document.getElementById(`text${index + 2}`);
                          if (nextInput && e.target.value.length === 1) {
                            nextInput.focus();
                          }
                        }}
                      />
                    ))}
                  </div>
                </div>
                <button
                  onClick={PostKode}
                  className="btn btn-primary w-100 py-8 mb-4 d-flex align-item-center justify-content-center"
                >
                  <i className="ti ti-check fs-6 me-2"></i>
                  Verify
                </button>
                <div className="d-flex align-items-center">
                    <p className="fs-4 mb-0 text-dark">Didn`t get the code?</p>
                    <a
                      onClick={ResendKode}
                      className="text-primary fw-medium ms-2"
                      href="javascript:void(0)"
                    >
                      Resend
                    </a>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
