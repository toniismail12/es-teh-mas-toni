import { Main } from '@/templates';
import { useEffect, useState, useCallback } from 'react';
import {
    GetProduk,
    SaveProduk,
    DeleteProduk,
    GetStok,
    GetRelasi,
    SaveRelasi,
    DeleteRelasi,
} from '@/controllers';
import { Modal } from '@/components'
import Link from 'next/link';
import { Select } from 'antd';

export default function Data() {

    const [datas, setData] = useState([])
    const [dataStok, setDataStok] = useState([])
    const [dataRelasi, setDataRelasi] = useState([])

    const [ShowModal, setShowModal] = useState('')
    const [ShowModalRelasi, setShowModalRelasi] = useState('')

    const [mode, setMode] = useState('create')

    // form
    const [id, setId] = useState('')
    const [lastId, setLastId] = useState('')
    const [kode, setKode] = useState('')
    const [produk, setProduk] = useState('')
    const [harga, setHarga] = useState('')

    // form produk relasi stok
    const [kodeStok, setKodeStok] = useState('')

    // filter
    const [f_Produk, f_setProduk] = useState("")

    const fetchData = useCallback(async (prd) => {

        setData([])

        const res = await GetProduk(1, 100, prd);

        if (res !== 'error') {
            const lastId = res?.data.reduce((max, item) => Math.max(max, item.id), 0);
            setLastId(lastId+1)
            
            const sortedData = res?.data.sort((a, b) => b.id - a.id);
            setData(sortedData)
        }

    }, []);

    const fetchDataStok = useCallback(async (stk) => {

        setDataStok([])

        const res = await GetStok(1, 10, stk);

        if (res !== 'error') {
            setDataStok(res.data)
        }

    }, []);

    const fetchDataRelasi = useCallback(async (kdp) => {

        setDataRelasi([])

        const res = await GetRelasi(1, 10, kdp);

        if (res !== 'error') {
            setDataRelasi(res.data)
        }

    }, []);

    useEffect(() => {

        fetchData(f_Produk);

    }, [fetchData, f_Produk]);

    function RemoveProduk(item) {
        const cnf = confirm("Delete " + item.produk + "?");
        if (cnf) {
            DeleteProduk(item.id)
            fetchData("");
        }
    }

    function showForm() {
        setMode("create")

        setId("")
        setKode("")
        setProduk("")
        setHarga("")

        setShowModal("show")
    }

    function showFormUpdate(item) {
        
        setMode("update")

        setId(item?.id)
        setKode(item?.kode)
        setProduk(item?.produk)
        setHarga(item?.harga)

        setShowModal("show")
    }

    async function submitForm() {

        if (mode === "create") {
            const kodePrd = kode+"-"+lastId;
            const res = await SaveProduk(id, kodePrd, produk, harga)
            if (res !== "error") {
                fetchData("")
                alert("success")
                setShowModal("")
            }
        } else {

            const res = await SaveProduk(id, kode, produk, harga)
            if (res !== "error") {
                fetchData("")
                alert("success")
                setShowModal("")
            }
        }
    }

    function showModalRelasi(item) {

        setKodeStok("")

        setKode(item?.kode)
        setProduk(item?.produk)
        
        fetchDataStok("")
        fetchDataRelasi(item?.kode)

        setShowModalRelasi("show")
    }

    const onSearch = (value) => {
        // console.log('search:', value);
        fetchDataStok(value)
    };

    const onChange = (value) => {
        // console.log(`selected ${value}`);
        if (value !== undefined) {
            setKodeStok(value)
        } else {
            setKodeStok("")
        }
        
    };

    async function submitFormRelasi() {

        const res = await SaveRelasi("", kode, kodeStok)
        if (res !== "error") {
            alert("success")
            fetchDataRelasi(kode)
        }
    }

    function RemoveRelasi(item) {
        const cnf = confirm("Delete " + item.stok_name + " dari produk " + produk);
        if (cnf) {
            DeleteRelasi(item.id)
            fetchDataRelasi(kode);
        }
    }

    return (
        <Main>
            <div className="row">
                <div className='col-lg-12 text-end'>

                    <Link onClick={showForm} href="#" className="btn btn-warning fw-semibold py-8 me-3">
                        <i className='ti ti-plus'></i>
                        Tambah Data
                    </Link>

                </div>
                <div className="col-lg-12 p-3">
                    <div className="row">
                        <div className="col-lg-2 mb-2">
                            <input value={f_Produk} onChange={e=>f_setProduk(e.target.value)} type="text" className="form-control" placeholder="Search Produk" />
                        </div>

                    </div>

                    <div className="table-responsive mb-4 border rounded-1">

                        <table className="table text-nowrap mb-0 align-middle">
                            <thead className="text-dark fs-4">
                                <tr>
                                    <th>
                                        <h6 className="fs-4 fw-semibold mb-0">Produk</h6>
                                    </th>
                                    <th>
                                        <h6 className="fs-4 fw-semibold mb-0">Harga</h6>
                                    </th>
                                    
                                    <th>
                                        <h6 className="fs-4 fw-semibold mb-0">Action</h6>
                                    </th>
                                    <th>
                                        <h6 className="fs-4 fw-semibold mb-0">Relasi</h6>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {datas?.map((item) => {
                                    return (
                                        <tr key={item.id}>

                                            <td>
                                                <div className="">
                                                    <h6 className="fs-4 fw-semibold mb-0">{item.produk}</h6>
                                                    <span className="fw-normal">{item.kode}</span>
                                                </div>
                                            </td>

                                            <td>
                                                <div className="">
                                                    <h6 className="fs-4 fw-semibold mb-0">{item.harga}</h6>
                                                </div>
                                            </td>

                                            <td>
                                                <button onClick={()=>showFormUpdate(item)} className="btn btn-success me-2">
                                                    <i className="ti ti-pencil"></i>
                                                </button>
                                                <button onClick={()=>RemoveProduk(item)} className="btn btn-danger">
                                                    <i className="ti ti-x"></i>
                                                </button>
                                            </td>

                                            <td>
                                                <div className="">
                                                    <button onClick={()=>showModalRelasi(item)} className="btn border-1 border">
                                                        <i className="fs-4 fw-semibold mb-0 ti ti-eye"> </i>
                                                    </button>
                                                </div>
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
                    title={"Data Produk"}
                    onClose={() => setShowModal('')}
                    body={
                        <div className="modal-body">
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
                                                    <select 
                                                        value={kode}
                                                        onChange={(e) => setKode(e.target.value)}
                                                        name="Kode"
                                                        type="text"
                                                        className="form-control-select border-0 ps-2"
                                                        placeholder="Kode"
                                                        disabled={mode === "update" ? true : false}
                                                    >
                                                        <option value="ET">ET</option>
                                                        <option value="WR">WR</option>
                                                    </select>
                                                        
                                                    {mode === "create" &&
                                                        <input
                                                            value={lastId}
                                                            name="Kode"
                                                            type="text"
                                                            className="form-control ps-2 border"
                                                            placeholder="Kode"
                                                            disabled
                                                        />
                                                    }

                                                </div>
                                            </div>

                                        </div>

                                        <div className="mb-4 row align-items-center">
                                            <label
                                                htmlFor="exampleInputText31"
                                                className="form-label col-sm-3 col-form-label"
                                            >
                                                Produk
                                            </label>
                                            <div className="col-sm-9">
                                                <div className="input-group border rounded-1">
                                                    <input
                                                        value={produk}
                                                        onChange={(e) => setProduk(e.target.value)}
                                                        name="Produk"
                                                        type="text"
                                                        className="form-control border-0 ps-2"
                                                        placeholder="Nama Produk"
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
                                                Harga
                                            </label>
                                            <div className="col-sm-9">
                                                <div className="input-group border rounded-1">
                                                    <span
                                                        className="input-group-text bg-transparent px-6 border-0"
                                                    >
                                                        <i className="ti ti-cash fs-4" />
                                                    </span>
                                                    <input
                                                        value={harga}
                                                        onChange={(e) => setHarga(e.target.value)}
                                                        name="harga"
                                                        type="number"
                                                        min={1}
                                                        max={50}
                                                        className="form-control border-0 ps-2"
                                                        placeholder="Harga"
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
                                                    <i className="ti ti-brand-cashapp"></i>
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

                <Modal
                    show={ShowModalRelasi}
                    title={"Relasi Produk Ke Stok"}
                    onClose={() => setShowModalRelasi('')}
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
                                                Produk
                                            </label>
                                            <div className="col-sm-9">
                                                <div className="input-group border rounded-1">
                                                    <input
                                                        value={produk}
                                                        onChange={(e) => setProduk(e.target.value)}
                                                        name="Produk"
                                                        type="text"
                                                        className="form-control border-0 ps-2"
                                                        placeholder="Nama Produk"
                                                        disabled
                                                    />

                                                </div>
                                            </div>

                                        </div>

                                        <div className="mb-4 row align-items-center">
                                            <label
                                                htmlFor="exampleInputText33"
                                                className="form-label col-sm-3 col-form-label"
                                            >
                                                Relasi Stok
                                            </label>
                                            <div className="col-sm-9">
                                                <div className="input-group border rounded-1">
                                                    <Select
                                                        getPopupContainer={(trigger) => document.getElementById('select-search2')}
                                                        style={{ width: '100%'}}
                                                        showSearch
                                                        allowClear
                                                        placeholder="Pilih Stok"
                                                        optionFilterProp="label"
                                                        onChange={onChange}
                                                        onSearch={onSearch}
                                                        options={dataStok?.map((item)=>{
                                                            return{
                                                                "value":item.kode,
                                                                "label":item.kode+" "+item.name,
                                                            }
                                                        })}
                                                    />

                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-3" />
                                            <div className="col-sm-9 text-end">
                                                <button onClick={submitFormRelasi} className="btn btn-primary">
                                                    <i className="ti ti-brand-cashapp"></i>
                                                    Simpan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 mt-3"> 
                                <div className="table-responsive mb-4 border rounded-1"P>
                                    
                                    <table className="table text-nowrap mb-0 align-middle">
                                        <thead className="text-dark fs-4">
                                            <tr>
                                                <th>
                                                    <h6 className="fs-4 fw-semibold mb-0">Nama Stok</h6>
                                                </th>
                                                <th>
                                                    <h6 className="fs-4 fw-semibold mb-0"></h6>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataRelasi?.map((item)=>{
                                                return( 
                                                    <tr key={item.id}>
                                                    
                                                        <td>
                                                            <div className="">
                                                                <h6 className="fs-4 fw-semibold mb-0">{item.stok_name}</h6>
                                                                <span className="fw-normal">{item.kode_stok}</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <button onClick={()=>RemoveRelasi(item)} className="btn btn-danger">
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
                    }
                />

            </div>

        </Main>
    );
}
