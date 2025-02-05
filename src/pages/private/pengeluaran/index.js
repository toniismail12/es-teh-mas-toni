import React from 'react'
import { Main } from '@/templates';
import { Modal } from '@/components'
import { useEffect, useState, useCallback } from 'react';
import { GetPengeluaran, SavePengeluaran, DeletePengeluaran } from '@/controllers'

export default function Pengeluaran() {

    const [ShowModal, setShowModal] = useState('')

    const [datas, setData] = useState([])
    const [totalPengeluaran, setTotalPengeluaran] = useState("")

    // Get the current date
    const now = new Date();
    // Format the current date as YYYY-MM-DD
    const currentDate = now.toISOString().slice(0, 10);

    const [id, setId] = useState(currentDate)
    const [date, setDate] = useState(currentDate)
    const [keterangan, setKeterangan] = useState("")
    const [nominal, setNominal] = useState("")

    const fetchData = useCallback(async (dte) => {

        setData([])

        const res = await GetPengeluaran(dte);

        if (res !== 'error') {
            setData(res.data)

            const dtx = res.data

            // Calculate total pengeluaran
            const total = dtx?.reduce((sum, item) => sum + parseInt(item.nominal, 10), 0);
            setTotalPengeluaran(total);

        }

    }, []);

    useEffect(() => {

        fetchData(date)

    }, [fetchData, date]);

    function showForm() {

        setId("")
        setKeterangan("")
        setNominal("")
        setShowModal("show")

    }

    function onUpdate(item) {

        setId(item.id)
        setKeterangan(item.keterangan)
        setNominal(item.nominal)

        setShowModal("show")

    }

    async function submitForm() {

        if (!date) {
            return alert("Pilih tanggal.")
        } else if (!keterangan) {
            return alert("buat keterangan.")
        } else if (nominal < 1) {
            return alert("masukan nominal.")
        } else {

            const res = await SavePengeluaran(id, keterangan, nominal, date)
            if (res !== "error") {
    
                fetchData(date)
                setShowModal("")

            }
        }

    }

    async function Remove(item) {
        const cnf = confirm("Delete " + item.keterangan + "?");
        if (cnf) {
            DeletePengeluaran(item.id)
            fetchData(date)
        }
        fetchData(date)
    }

    return (
        <Main>

            <div className="row">
                <div className='col-lg-12 text-end'>

                    <button onClick={showForm} className="btn btn-warning fw-semibold py-8 floating-button">
                        <i className='ti ti-plus fs-7 fw-semibold'></i>
                    </button>

                </div>
                <div className="col-lg-12 mt-2">

                    <div className="row">
                        <div className="col-lg-2 mb-2">
                            <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="form-control" />
                        </div>

                    </div>

                    <div className="table-responsive mb-4 border rounded-1">

                        <table className="table text-nowrap mb-0 align-middle">
                            <thead className="text-dark fs-4">
                                <tr>
                                    <th>
                                        <h6 className="fs-4 fw-semibold mb-0">No</h6>
                                    </th>
                                    <th>
                                        <h6 className="fs-4 fw-semibold mb-0">Keterangan</h6>
                                    </th>
                                    <th>
                                        <h6 className="fs-4 fw-semibold mb-0">Nominal</h6>
                                    </th>
                                    <th>
                                        <h6 className="fs-4 fw-semibold mb-0"></h6>
                                    </th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {datas?.map((item, i) => {
                                    return (
                                        <tr key={item.id}>

                                            <td>
                                                <div className="">
                                                    <h6 className="fs-3 fw-semibold mb-0">{i + 1}</h6>
                                                </div>
                                            </td>

                                            <td>
                                                <div className="">
                                                    <h6 className="fs-3 fw-semibold mb-0">{item.keterangan}</h6>
                                                </div>
                                            </td>

                                            <td>
                                                <div className="">
                                                    <h6 className="fs-3 fw-semibold mb-0">{item.nominal}</h6>
                                                </div>
                                            </td>

                                            <td>
                                                <button onClick={()=>onUpdate(item)} className="btn btn-success me-2">
                                                    <i className="ti ti-pencil"></i>
                                                </button>

                                                <button onClick={()=>Remove(item)} className="btn btn-danger">
                                                    <i className="ti ti-x"></i>
                                                </button>
                                            </td>

                                        </tr>
                                    )
                                })}
                                <tr>
                                    <td></td>
                                    <td><h6 className="fs-3 fw-semibold mb-0">Total</h6></td>
                                    <td><h6 className="fs-3 fw-semibold mb-0">{totalPengeluaran}</h6></td>
                                </tr>

                            </tbody>

                        </table>
                    </div>

                </div>
            </div>

            <div>

                <Modal
                    show={ShowModal}
                    title={"Form Pengeluaran"}
                    onClose={() => setShowModal('')}
                    body={
                        <div className="modal-body" id="select-search2">
                            <div className="col-12">
                                <div className="card w-100 position-relative overflow-hidden mb-0">
                                    <div className="card-body p-4">

                                        <div className="mb-4 row align-items-center">
                                            <label
                                                htmlFor="exampleInputText31"
                                                className="form-label col-sm-3 col-form-label"
                                            >
                                                Date
                                            </label>
                                            <div className="col-sm-9">
                                                <div className="input-group border rounded-1">
                                                    <input
                                                        value={date}
                                                        onChange={(e) => setDate(e.target.value)}
                                                        name="name"
                                                        type="date"
                                                        className="form-control border-0 ps-2"
                                                    />

                                                </div>
                                            </div>

                                        </div>

                                        <div className="mb-4 row align-items-center">
                                            <label
                                                htmlFor="exampleInputText31"
                                                className="form-label col-sm-3 col-form-label"
                                            >
                                                Keterangan
                                            </label>
                                            <div className="col-sm-9">
                                                <div className="input-group border rounded-1">
                                                    <input
                                                        value={keterangan}
                                                        onChange={(e) => setKeterangan(e.target.value)}
                                                        name="keterangan"
                                                        type="text"
                                                        className="form-control border-0 ps-2"
                                                        placeholder="Keterangan"
                                                    // disabled
                                                    />

                                                </div>
                                            </div>

                                        </div>

                                        <div className="mb-4 row align-items-center">
                                            <label
                                                htmlFor="exampleInputText33"
                                                className="form-label col-sm-3 col-form-label"
                                            >
                                                Nominal
                                            </label>
                                            <div className="col-sm-9">
                                                <div className="input-group border rounded-1">
                                                    <input
                                                        value={nominal}
                                                        onChange={(e) => setNominal(e.target.value)}
                                                        name="nominal"
                                                        type="number"
                                                        className="form-control border-0 ps-2"
                                                        placeholder="Nominal"
                                                    // disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-3" />
                                            <div className="col-sm-9 text-end">

                                                <button onClick={submitForm} className="btn btn-primary">
                                                    <i className="ti ti-check"></i>
                                                    Simpan
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                />

            </div>

        </Main>
    )
}
