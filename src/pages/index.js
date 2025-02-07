import React from 'react';
import { Main } from '@/templates';
import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react';
import { LS } from '@/utils'
import { GetReportMonthly, GetSaldo } from '@/controllers';
import { BarChartMonthly } from '@/components'

export default function Home() {

    const [user, setUser] = useState("")
    const [datas, setData] = useState([])

    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")

    const fetchData = useCallback(async (mnt, yr) => {

        setData([])

        const res = await GetReportMonthly(mnt, yr);

        if (res !== 'error') {
            setData(res.data)

            const dtx = res.data

            // Calculate total pengeluaran
            // const total = dtx?.reduce((sum, item) => sum + parseInt(item.nominal, 10), 0);
            // setTotalPengeluaran(total);

        }

    }, []);

    useEffect(() => {

        setUser(LS("name"))
        fetchData(month, year)

    }, [fetchData, month, year]);

    return (
        <Main>

            <div className="row p-3">
                <div className="col-lg-12 mb-2">
                    <div className="d-flex align-items-center gap-2 mb-4">
                        <div className="position-relative">
                            <div className="border border-2 border-primary rounded-circle">
                                <Image
                                    src="/assets/images/profile/user-1.jpg"
                                    className="rounded-circle m-0"
                                    alt="user1"
                                    height={50}
                                    width={50}
                                />
                            </div>
                        </div>
                        <div>
                            <span className="fs-1">Welcome and happy activities,</span>
                            <br/>
                            <span className="fw-semibold fs-3">{user}</span>
                            <br/>
                            <span className="fs-1">Es Teh Mas Toni.</span>
                        </div>
                    </div>

                </div>
                <div className="col-md-12 border rounded py-3">
                    <div className="hstack mb-4">
                        <div className="p-8 bg-primary-subtle rounded-1 me-2 d-flex align-items-center justify-content-center">
                            <i className="ti ti-wallet text-primary fs-6" />
                        </div>
                        <div>
                            <h4 className="mb-0 fs-4 fw-semibold">Rp. 63.489.350</h4>
                            <p className="fs-2 mb-0">Total Saldo</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                            <div className="bg-success-subtle rounded me-8 p-8 d-flex align-items-center justify-content-center">
                                <i className="ti ti-arrow-up-right text-success fs-6" />
                            </div>
                            <div>
                                <p className="fs-2 mb-0 fw-normal">Pemasukan</p>
                                <h6 className="fw-semibold text-dark fs-4 mb-0">3.489,350</h6>
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="bg-danger-subtle rounded me-8 p-8 d-flex align-items-center justify-content-center">
                                <i className="ti ti-arrow-down-left text-danger fs-6" />
                            </div>
                            <div>
                                <p className="fs-2 mb-0 fw-normal">Pengeluaran</p>
                                <h6 className="fw-semibold text-dark fs-4 mb-0">1.489,350</h6>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="col-lg-12 mt-3">
                    <div className="mb-2">
                        <input type="month" className="form-control form-control-sm" />
                    </div>
                    <BarChartMonthly datas={datas} />
                </div>

            </div>

        </Main>
    )
}
