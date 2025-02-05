import { Main } from '@/templates';
import { useEffect, useState, useCallback } from 'react';
import {
    GetProduk,
    GetTrx,
    SaveTrx,
    DeleteTrx,
    SaveGrpTrx,
    ChangeStok,
    GetGrpTrx,
    GetSummaryTrx,
 } from '@/controllers';
import { Modal } from '@/components'
import { Select } from 'antd';

function extractDateTime(groupTrx) {
    // Extract the timestamp part from the group_trx (YYYYMMDDHHMMSS)
    const match = groupTrx.match(/GTRX(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/);
    
    if (!match) {
        return null; // Return null if the pattern doesn't match
    }

    const [, year, month, day, hour, minute, second] = match;
    
    // Format the extracted values into a readable datetime string
    // return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    return `${hour}:${minute}`;
}

export function getFormattedDateTime() {
  const now = new Date();
  
  // Extract date and time components
  const year = now.getFullYear();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // Format as "YYYY-DD-MM HH:MM:S"
  return `GTRX${year}${day}${month}${hours}${minutes}${seconds}`;
}

export default function Trx() {

    const [loading, setLoading] = useState("")

    // Get the current date
    const now = new Date();
    // Format the current date as YYYY-MM-DD
    const currentDate = now.toISOString().slice(0, 10);

    const [data, setData] = useState([])
    const [dataProduk, setDataProduk] = useState([])
    const [dataTrx, setDataTrx] = useState([])
    const [dataSummary, setDataSummary] = useState([])

    const [ShowModal, setShowModal] = useState('')

    // form
    const [groupTransaksi, setGroupTransaksi] = useState('')
    const [date, setDate] = useState(currentDate)
    const [kodeProduk, setKodeProduk] = useState('')
    const [jumlahBeli, setJumlahBeli] = useState(1)

    const [total, setTotal] = useState(0)
    const [totalSummary, setTotalSummary] = useState(0)
    const [totalBelanja, setTotalBelanja] = useState(0)

    // filter
    const [searchProduk, setSearchProduk] = useState('')
    const [searchDate, setSearchDate] = useState(currentDate)

    const fetchDataProduk = useCallback(async (prd) => {

        setDataProduk([])

        const res = await GetProduk(1, 50, prd);

        if (res !== 'error') {
            setDataProduk(res.data)
        }

    }, []);

    const fetchDataTrx = useCallback(async (dte) => {

        setDataTrx([])

        const res = await GetGrpTrx(dte);

        if (res !== 'error') {
            setDataTrx(res.data)

            const dtx = res.data

            // Calculate total debit
            const total = dtx?.reduce((sum, item) => sum + parseInt(item.pembayaran, 10), 0);
            setTotal(total);
        }

        const resSummary = await GetSummaryTrx(dte);
        if (resSummary !== 'error') {
            setDataSummary(resSummary?.data)

            // Calculate total debit
            const totalSummary = resSummary?.data?.reduce((sum, item) => sum + parseInt(item.sold, 10), 0);
            setTotalSummary(totalSummary);
        }

    }, []);

    const fetchData = useCallback(async (grtrx) => {

        setData([])

        const res = await GetTrx("", "", grtrx, "" ,"");

        if (res !== 'error') {
            setData(res.data)

            const dtx = res.data

            // Calculate total belanja
            const total = dtx?.reduce((sum, item) => sum + parseInt(item.harga_produk*item.jumlah_beli, 10), 0);
            setTotalBelanja(total);

            if(total > 0){
                await SaveGrpTrx(grtrx, total, date)
            }
        }

    }, [date]);

    useEffect(() => {

        fetchDataTrx(searchDate)

    }, [fetchDataTrx, searchDate]);

    useEffect(() => {

        fetchDataProduk(searchProduk)

    }, [fetchDataProduk, searchProduk]);

    function showForm() {

        const gtrx = getFormattedDateTime()

        setGroupTransaksi(gtrx)

        fetchData(gtrx)

        setJumlahBeli(1)

        setShowModal("show")

    }

    const onSearch = (value) => {
        // console.log('search:', value);
        setSearchProduk(value)
    };

    const onChange = (value) => {
        // console.log(`selected ${value}`);
        if (value !== undefined) {
            setKodeProduk(value)
        } else {
            setKodeProduk("")
        }
        
    };

    async function submitFormTambah() {

        setLoading("show")

        if (!date) {
            return alert("Pilih tanggal transaksi.")
        } else if (!kodeProduk) {
            return alert("Pilih produk terlebih dahulu.")
        } else if (jumlahBeli < 1) {
            return alert("Jumlah beli minimal 1.")
        } else {

            const res = await SaveTrx(date, groupTransaksi, kodeProduk, jumlahBeli)
            if (res !== "error") {
    
                await ChangeStok(kodeProduk, jumlahBeli, "reduce")
    
                fetchData(groupTransaksi)
                fetchDataTrx(date)
    
                setJumlahBeli(1)
            }
        }


        setLoading("")

    }

    // DeleteTrx
    async function RemoveTrx(item) {
        const cnf = confirm("Delete " + item.produk + "?");
        if (cnf) {
            DeleteTrx(item.id)
            fetchDataTrx(searchDate);

            fetchDataTrx(date)
            fetchData(groupTransaksi)

            await ChangeStok(item.kode_produk, item.jumlah_beli, "add")
        }
    }

    function onSelesai() {
        fetchDataTrx(searchDate)
        setShowModal('')
    }

    return (
        <Main>
            <div className="row">
                <div className='col-lg-12 text-end'>

                    <button onClick={showForm} className="btn btn-warning fw-semibold py-8 floating-button">
                        <i className='ti ti-plus fs-7 fw-semibold'></i>
                    </button>

                </div>
                <div className="col-lg-12 p-3">
                    <div className="row">
                        <div className="col-lg-2 mb-2">
                            <input value={searchDate} onChange={e => setSearchDate(e.target.value)} type="date" className="form-control" placeholder="date" />
                        </div>

                        {/* <div className="col-lg-2 mb-2">
                            <input value={filterProduk} onChange={(e)=>setFilterProduk(e.target.value)} type="text" className="form-control" placeholder="Search Produk" />
                        </div> */}

                    </div>

                    <div className="table-responsive mb-2 border rounded-1">

                        <table className="table text-nowrap mb-0 align-middle">
                            <thead className="text-dark fs-4">
                                <tr>
                                    <th>
                                        <h6 className="fs-3 fw-semibold mb-0">Produk</h6>
                                    </th>
                                    {/* <th>
                                        <h6 className="fs-4 fw-semibold mb-0">Debit</h6>
                                    </th> */}
                                    {/* <th>
                                        <h6 className="fs-4 fw-semibold mb-0"></h6>
                                    </th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {dataTrx?.map((item, i) => {
                                    
                                    const indexDesc = dataTrx.length - i;
    
                                    return (
                                        <tr key={item.id}>
                                            <td>
                                               
                                                <div className="">
                                                    <div className="text-end">
                                                        <h6 className="fs-3 fw-semibold mb-2">No. {indexDesc} / Jam {extractDateTime(item.group_trx)}</h6>
                                                    </div>
                                                    {item?.Trx.map((itemTrx)=>{
                                                        return(

                                                            <div key={itemTrx.id} className="mb-1">
                                                                <h6 className="fs-3 fw-semibold mb-0">{itemTrx.Produk.produk}</h6>
                                                                <span className="fw-normal">Rp. {itemTrx.Produk.harga} x {itemTrx.jumlah_beli} = {itemTrx.Produk.harga*itemTrx.jumlah_beli} <br/></span>
                                                            </div>

                                                        )
                                                    })}
                                                    <span className="fw-semibold">Cash: {item.pembayaran}</span> 
                                                    
                                                </div>
                                            </td>

                                            {/* <td>
                                                <div className="">
                                                    <h6 className="fs-4 fw-semibold mb-0">{item.harga_produk*item.jumlah_beli}</h6>
                                                </div>
                                            </td> */}

                                            {/* <td>
                                                <button className="btn btn-success me-2">
                                                    <i className="ti ti-eye"></i>
                                                </button>
                                                <button onClick={()=>RemoveTrx(item)} className="btn btn-danger">
                                                    <i className="ti ti-x"></i>
                                                </button>
                                            </td> */}

                                        </tr>
                                    )
                                })}
                                <tr>
                                    <td><h6 className="fs-3 fw-semibold mb-0">Total: {total}</h6></td>
                                    {/* <td><h5 className="fs-5 fw-semibold mb-0">{total}</h5></td> */}
                                </tr>

                            </tbody>

                        </table>
                    </div>
                    
                </div>

                <div className="col-lg-12 p-3">

                    <div className="table-responsive mb-4 border rounded-1">

                        <table className="table text-nowrap mb-0 align-middle">
                            <thead className="text-dark fs-4">
                                <tr>
                                    <th>
                                        <h6 className="fs-3 fw-semibold mb-0">Summary</h6>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataSummary?.map((item, i) => {
    
                                    return (
                                        <tr key={item.kode_produk}>
                                            <td>
                                                <div className="">
                                                    <span className="fs-3 fw-semibold">{i+1}. {item.produk}</span>
                                                    <br/>
                                                    <div className="text-end">
                                                        <span className="fw-semibold fs-3">Sold: {item.sold}</span> 
                                                    </div>
                                                </div>
                                            </td>

                                        </tr>
                                    )
                                    
                                })}
                                <tr>
                                    <td className='text-end'><h6 className="fs-3 fw-semibold mb-0">Total Sold: {totalSummary}</h6></td>
                                </tr>

                            </tbody>

                        </table>
                    </div>
                    
                </div>
            </div>

            <div>

                <Modal
                    show={ShowModal}
                    title={groupTransaksi}
                    onClose={() => setShowModal('')}
                    body={
                        <div className="modal-body" id="select-search2">
                            <div className="col-12">
                                <div className="card w-100 position-relative overflow-hidden mb-0">
                                    <div className="card-body p-4">

                                        {/* <div className="mb-2 row align-items-center">
                                            <label
                                                htmlFor="exampleInputText33"
                                                className="form-label col-sm-3 col-form-label"
                                            >
                                                Transaksi
                                            </label>
                                            <div className="col-sm-9">
                                                <div className="input-group border rounded-1">
                                                    <span
                                                        className="input-group-text bg-transparent px-6 border-0"
                                                    >
                                                        <i className="ti ti-star" />
                                                    </span>
                                                    <input
                                                        value={groupTransaksi}
                                                        className="form-control border-0 ps-2"
                                                        placeholder="date"
                                                        type="text"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div> */}

                                        <div className="mb-2 row align-items-center">
                                            <label
                                                htmlFor="exampleInputText33"
                                                className="form-label col-sm-3 col-form-label"
                                            >
                                                Tanggal
                                            </label>
                                            <div className="col-sm-9">
                                                <div className="input-group border rounded-1">
                                                    <span
                                                        className="input-group-text bg-transparent px-6 border-0"
                                                    >
                                                        <i className="ti ti-calendar" />
                                                    </span>
                                                    <input
                                                        value={date}
                                                        onChange={(e) => setDate(e.target.value)}
                                                        className="form-control border-0 ps-2"
                                                        placeholder="date"
                                                        type="date"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-2 row align-items-center">
                                            <label
                                                htmlFor="exampleInputText31"
                                                className="form-label col-sm-3 col-form-label"
                                            >
                                                Produk
                                            </label>
                                            <div className="col-sm-9">
                                                <div className="input-group border rounded-1">
                                                    <Select
                                                        getPopupContainer={(trigger) => document.getElementById('select-search2')}
                                                        style={{ width: '100%'}}
                                                        showSearch
                                                        allowClear
                                                        placeholder="Pilih Produk"
                                                        optionFilterProp="label"
                                                        onChange={onChange}
                                                        onSearch={onSearch}
                                                        options={dataProduk?.map((item)=>{
                                                            return{
                                                                "value":item.kode,
                                                                "label":item.produk+" - Rp. "+item.harga,
                                                            }
                                                        })}
                                                    />
                                                </div>
                                            </div>

                                        </div>

                                        <div className="mb-2 row align-items-center">
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
                                                        value={jumlahBeli}
                                                        onChange={(e) => setJumlahBeli(e.target.value)}
                                                        name="jumlah_beli"
                                                        type="number"
                                                        min={1}
                                                        max={50}
                                                        className="form-control border-0 ps-2"
                                                        placeholder="Jumlah Beli"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-3" />
                                            <div className="col-sm-9 text-end">

                                                {loading == "" &&
                                                    <button onClick={submitFormTambah} className="btn btn-primary">
                                                        <i className="ti ti-check fs-3 me-1"></i>
                                                        Simpan
                                                    </button>
                                                }
                                                {loading == "show" &&
                                                    <button className="btn btn-primary">
                                                        <div className="spinner-border" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </button>
                                                }

                                            </div>
                                        </div>

                                        <div className="row mt-3">

                                            <div className="col-lg-12">
                                                <div className="table-responsive mb-4 border rounded-1" P>

                                                    <table className="table text-nowrap mb-0 align-middle">
                                                        <thead className="text-dark fs-4">
                                                            <tr>
                                                                <th>
                                                                    <h6 className="fs-4 fw-semibold mb-0">Item:</h6>
                                                                </th>
                                                                <th>
                                                                    <h6 className="fs-4 fw-semibold mb-0"></h6>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {data?.map((item) => {
                                                                return (
                                                                    <tr key={item.id}>

                                                                        <td>
                                                                            <div className="">
                                                                                <h6 className="fs-4 fw-semibold mb-0">{item.produk}</h6>
                                                                                <span className="fw-normal">{item.harga_produk} x {item.jumlah_beli}</span>
                                                                                <h5 className="fs-4 mb-0">Rp. {item.harga_produk*item.jumlah_beli}</h5>
                                                                            </div>
                                                                        </td>

                                                                        <td>
                                                                            <button onClick={()=>RemoveTrx(item)} className="btn btn-danger">
                                                                                <i className="ti ti-x"></i>
                                                                            </button>
                                                                        </td>

                                                                    </tr>
                                                                )
                                                            })}

                                                            <tr>
                                                                <td><h6 className="fs-4 fw-semibold mb-0">Total: {totalBelanja}</h6></td>
                                                                <td><h5 className="fs-5 fw-semibold mb-0"></h5></td>
                                                            </tr>

                                                        </tbody>

                                                    </table>
                                                </div>

                                            </div>

                                            <div className="col-sm-12 text-end">
                                                <button onClick={onSelesai} className="btn btn-success">
                                                    <i className="ti ti-checklist"></i>
                                                    Selesai
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
