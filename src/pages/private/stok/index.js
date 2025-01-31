import { Main } from '@/templates';
import { useEffect, useState, useCallback } from 'react';
import { GetStok, SaveStok, DeleteStok } from '@/controllers';
import { Modal } from '@/components'
import Link from 'next/link';

export default function Stok() {

    const [datas, setData] = useState([])
    const [ShowModal, setShowModal] = useState('')

    // form
    const [id, setId] = useState('')
    const [kode, setKode] = useState('')
    const [name, setName] = useState('')
    const [stok, setStok] = useState('')

    // filter
    const [f_name, f_setName] = useState("")

    const fetchData = useCallback(async (name) => {

        setData([])

        const res = await GetStok(1, 50, name);

        if (res !== 'error') {
            // console.log(resDecode)
            setData(res?.data)
        }

    }, []);

    useEffect(() => {

        fetchData(f_name);

    }, [fetchData, f_name]);

    function showForm(id, item) {

        setId(id)
        setKode(item?.kode)
        setName(item?.name)
        setStok(item?.stok)

        setShowModal("show")

    }

    async function submitForm() {

        const res = await SaveStok(id, kode, name, stok)
        if (res !== "error") {
            fetchData(f_name)
            alert("success")
            setShowModal("")
        }
    }

    function RemoveStok(item) {
        const cnf = confirm("Delete " + item.name + "?");
        if (cnf) {
            DeleteStok(item.id)
            fetchData(f_name);
        }
    }

    return (
        <Main>
            <div className="row">
                <div className='col-lg-12 text-end'>

                    <Link onClick={() => showForm("", [])} href="#" className="btn btn-warning fw-semibold py-8 me-3">
                        <i className='ti ti-plus'></i>
                        Tambah Data
                    </Link>

                </div>
                <div className="col-lg-12 mt-2">

                    <div className="row">
                        <div className="col-lg-2 mb-2">
                            <input value={f_name} onChange={e => f_setName(e.target.value)} type="text" className="form-control" placeholder="Search Barang" />
                        </div>

                    </div>

                    <div className="table-responsive mb-4 border rounded-1">

                        <table className="table text-nowrap mb-0 align-middle">
                            <thead className="text-dark fs-4">
                                <tr>
                                    <th>
                                        <h6 className="fs-4 fw-semibold mb-0">Barang</h6>
                                    </th>
                                    <th>
                                        <h6 className="fs-4 fw-semibold mb-0">Stok</h6>
                                    </th>
                                    <th>
                                        <h6 className="fs-4 fw-semibold mb-0"></h6>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {datas?.map((item) => {
                                    return (
                                        <tr key={item.id}>

                                            <td>
                                                <div className="">
                                                    <h6 className="fs-4 fw-semibold mb-0">{item.name}</h6>
                                                    <span className="fw-normal">{item.kode}</span>
                                                </div>
                                            </td>

                                            <td>
                                                <div className="">
                                                    <h6 className="fs-4 fw-semibold mb-0">{item.stok}</h6>
                                                </div>
                                            </td>

                                            <td>

                                                <button onClick={() => showForm(item.id, item)} className="btn btn-success me-2">
                                                    <i className="ti ti-pencil"></i>
                                                </button>

                                                <button onClick={() => RemoveStok(item)} className="btn btn-danger">
                                                    <i className="ti ti-x"></i>
                                                </button>
                                            </td>

                                        </tr>
                                    )
                                })}

                            </tbody>

                        </table>
                    </div>

                </div>
            </div>

            <div>

                <Modal
                    show={ShowModal}
                    title={"Form Stok"}
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
                                                Kode
                                            </label>
                                            <div className="col-sm-9">
                                                <div className="input-group border rounded-1">
                                                    <input
                                                        value={kode}
                                                        onChange={(e) => setKode(e.target.value)}
                                                        name="name"
                                                        type="text"
                                                        className="form-control border-0 ps-2"
                                                        placeholder="Kode Stok"
                                                    // disabled
                                                    />

                                                </div>
                                                {/* {orgName} */}
                                            </div>

                                        </div>

                                        <div className="mb-4 row align-items-center">
                                            <label
                                                htmlFor="exampleInputText31"
                                                className="form-label col-sm-3 col-form-label"
                                            >
                                                Nama
                                            </label>
                                            <div className="col-sm-9">
                                                <div className="input-group border rounded-1">
                                                    <input
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        name="name"
                                                        type="text"
                                                        className="form-control border-0 ps-2"
                                                        placeholder="Nama Stok"
                                                    // disabled
                                                    />

                                                </div>
                                                {/* {orgName} */}
                                            </div>

                                        </div>

                                        <div className="mb-4 row align-items-center">
                                            <label
                                                htmlFor="exampleInputText33"
                                                className="form-label col-sm-3 col-form-label"
                                            >
                                                Jumlah
                                            </label>
                                            <div className="col-sm-9">
                                                <div className="input-group border rounded-1">
                                                    <span
                                                        className="input-group-text bg-transparent px-6 border-0"
                                                    >
                                                        <i className="ti ti-database" />
                                                    </span>
                                                    <input
                                                        value={stok}
                                                        onChange={(e) => setStok(e.target.value)}
                                                        name="stok"
                                                        type="number"
                                                        min={1}
                                                        max={50}
                                                        className="form-control border-0 ps-2"
                                                        placeholder="Jumlah Stok"
                                                    // disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-3" />
                                            <div className="col-sm-9 text-end">
                                                {/* <button onClick={() => setShowModal('')} className="btn btn-warning fw-semibold me-3">
                                            Close
                                        </button> */}
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
    );
}
