import React from 'react';
import { Main } from '@/templates';
import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react';
import { LS } from '@/utils'
import { GetReportMonthly, GetSaldo } from '@/controllers';
import { BarChartMonthly } from '@/components'

function formatRupiah(amount) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(amount);
}

export default function Home() {

    const [user, setUser] = useState("")
    const [username, setUsername] = useState("")
    const [datas, setData] = useState([])

    const now = new Date();
    const year = now.getFullYear();
    const monthh = String(now.getMonth() + 1).padStart(2, "0"); // Ensure two digits

    const [month, setMonth] = useState(year+"-"+monthh)
    
    // Get the current date
    // Format the current date as YYYY-MM-DD
    const currentDate = now.toISOString().slice(0, 10);

    const [date, setDate] = useState(currentDate)

    const [pemasukan, setPemasukan] = useState("")
    const [pengeluaran, setPengeluaran] = useState("")

    const [pemasukanToday, setPemasukanToday] = useState("")
    const [pengeluaranToday, setPengeluaranToday] = useState("")

    const fetchData = useCallback(async (mnt, yr) => {

        // setData([])

        const res = await GetReportMonthly(mnt, yr);

        if (res !== 'error') {
            setData(res?.data)

            // const dtx = res.data

            // Calculate total pengeluaran
            // const total = dtx?.reduce((sum, item) => sum + parseInt(item.nominal, 10), 0);
            // setTotalPengeluaran(total);

        }

    }, []);

    const fetchDataSaldo = useCallback(async () => {

        const res = await GetSaldo();

        if (res !== 'error') {
            setPemasukan(res?.pemasukan)
            setPengeluaran(res?.pengeluaran)

        }

    }, []);

    const fetchDataSaldoDay = useCallback(async (dt) => {

        const res = await GetSaldo(dt);

        if (res !== 'error') {
            setPemasukanToday(res?.pemasukan)
            setPengeluaranToday(res?.pengeluaran)

        }

    }, []);

    useEffect(() => {

        setUser(LS("name"))
        setUsername(LS("username"))

        const dateStr = month;
        const [thn, bln] = dateStr?.split("-");
        fetchData(bln, thn)
        fetchDataSaldo()

        fetchDataSaldoDay(date)

    }, [fetchData, month, fetchDataSaldo, fetchDataSaldoDay, date]);

    return (
        <Main>

            <div className="row p-3">
                <div className="col-lg-12 mb-2">
                    <div className="d-flex align-items-center gap-2 mb-4">
                        <div className="position-relative">
                            <div className="border border-2 border-primary rounded-circle">
                                {username == "erla" &&
                                    <Image
                                        src="/assets/images/profile/user-6.jpg"
                                        className="rounded-circle m-0"
                                        alt="user1"
                                        height={50}
                                        width={50}
                                    />
                                }
                                {username == "tiara" &&
                                    <Image
                                        src="/assets/images/profile/user-6.jpg"
                                        className="rounded-circle m-0"
                                        alt="user1"
                                        height={50}
                                        width={50}
                                    />
                                }
                                {username == "toni" &&
                                    <Image
                                        src="/assets/images/profile/user-1.jpg"
                                        className="rounded-circle m-0"
                                        alt="user1"
                                        height={50}
                                        width={50}
                                    />
                                }
                                {username == "toni_mobile" &&
                                    <Image
                                        src="/assets/images/profile/user-1.jpg"
                                        className="rounded-circle m-0"
                                        alt="user1"
                                        height={50}
                                        width={50}
                                    />
                                }
                                {username == "riski" &&
                                    <Image
                                        src="/assets/images/profile/user-1.jpg"
                                        className="rounded-circle m-0"
                                        alt="user1"
                                        height={50}
                                        width={50}
                                    />
                                }
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
                            <h4 className="mb-0 fs-4 fw-semibold">{formatRupiah(pemasukan-pengeluaran)}</h4>
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
                                <h6 className="fw-semibold text-dark fs-4 mb-0">{formatRupiah(pemasukan)}</h6>
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="bg-danger-subtle rounded me-8 p-8 d-flex align-items-center justify-content-center">
                                <i className="ti ti-arrow-down-left text-danger fs-6" />
                            </div>
                            <div>
                                <p className="fs-2 mb-0 fw-normal">Pengeluaran</p>
                                <h6 className="fw-semibold text-dark fs-4 mb-0">{formatRupiah(pengeluaran)}</h6>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="col-lg-12 mt-3 border rounded py-3">
                    
                    <div className="mb-2">
                        <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="form-control form-control-date form-control-sm" />
                    </div>

                    <div className="hstack mb-4">
                        <div className="p-8 bg-primary-subtle rounded-1 me-2 d-flex align-items-center justify-content-center">
                            <i className="ti ti-wallet text-primary fs-6" />
                        </div>
                        <div>
                            <h4 className="mb-0 fs-4 fw-semibold">{formatRupiah(pemasukanToday-pengeluaranToday)}</h4>
                            <p className="fs-2 mb-0">Selisih</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                            <div className="bg-success-subtle rounded me-8 p-8 d-flex align-items-center justify-content-center">
                                <i className="ti ti-arrow-up-right text-success fs-6" />
                            </div>
                            <div>
                                <p className="fs-2 mb-0 fw-normal">Pemasukan</p>
                                <h6 className="fw-semibold text-dark fs-4 mb-0">{formatRupiah(pemasukanToday)}</h6>
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="bg-danger-subtle rounded me-8 p-8 d-flex align-items-center justify-content-center">
                                <i className="ti ti-arrow-down-left text-danger fs-6" />
                            </div>
                            <div>
                                <p className="fs-2 mb-0 fw-normal">Pengeluaran</p>
                                <h6 className="fw-semibold text-dark fs-4 mb-0">{formatRupiah(pengeluaranToday)}</h6>
                            </div>
                        </div>
                    </div>
                
                </div>
                
                <div className="col-lg-12 mt-3 border rounded">
                    <div className="mb-2 mt-2">
                        <input type="month" value={month} onChange={e=>setMonth(e.target.value)} className="form-control form-control-date form-control-sm" />
                    </div>
                    <BarChartMonthly datas={datas} />
                </div>

            </div>

        </Main>
    )
}
