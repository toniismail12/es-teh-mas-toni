import { Main } from '@/layouts';
import { useEffect, useState, useCallback } from 'react';
import { GetOrg, SaveOrg, DeleteOrg } from '@/controllers';
import { Decode } from '@/utils';
import { Modal } from '@/components'
import Link from 'next/link';

export default function Org() {

    const [ShowModal, setShowModal] = useState('')
    const [datas, setData] = useState([])
    const [alldatas, setAllData] = useState([])

    const [uid, setUid] = useState("")
    const [orgName, setOrgName] = useState("")
    const [code, setCode] = useState("")
    const [orgCode, setOrgCode] = useState("")
    const [reportTo, setReportTo] = useState("")
    const [status, setStatus] = useState("")
    const [level, setLevel] = useState("") 

    // filter
    const [f_orgName, f_setOrgName] = useState("")
    const [f_orgCode, f_setOrgCode] = useState("")
    const [f_reportTo, f_setReportTo] = useState("")
    const [f_level, f_setLevel] = useState("") 
    const [f_code, f_setCode] = useState("") 
    const [f_status, f_setStatus] = useState("")

    const fetchData = useCallback(async (text, code, org_code, report_to, level, status) => {

        const getTotal = await GetOrg(1, 1)
        const total = getTotal?.meta?.total;

        const res = await GetOrg(1, total, text, code, org_code, report_to, level, status);

        if (res !== 'error') {
            const resDecode = Decode(res.data);
            // console.log(resDecode)
            setData(resDecode)
        }
        const res2 = await GetOrg(1, total);

        if (res2 !== 'error') {
            const resDecode = Decode(res2.data);
            // console.log(resDecode)
            setAllData(resDecode)
        }

    }, []);

    useEffect(() => {
        fetchData(f_orgName, f_code, f_orgCode, f_reportTo, f_level, f_status);
    }, [fetchData, f_orgName, f_code, f_orgCode, f_reportTo, f_level, f_status]);

    function generate12DigitInteger() {
        const min = 100000000000; // Smallest 12-digit number
        const max = 999999999999; // Largest 12-digit number
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function showForm() {

        const code = generate12DigitInteger()

        setUid("")
        setOrgName("")
        setCode(code)
        setOrgCode("")
        setReportTo("")
        setStatus("")
        setLevel("")

        setShowModal("show")
    }

    async function submitForm() {

        const res = await SaveOrg(uid, orgName, "" + code, orgCode, reportTo, status, level)
        if (res !== "error") {
            fetchData()
            alert("success")
            setShowModal("")
        }
    }

    function RemoveOrg(item) {
        const cnf = confirm("Delete " + item.text + "?");
        if (cnf) {
            DeleteOrg(item.uid)
            fetchData();
        }
    }

    function ShowParent(code) {
        var text = ""
        
        alldatas.filter((f)=>f.code === code).map((item)=>{
            text=item.text
        })

        return text
    }

    return (
        <Main>
            <div className="row">
                <div className='col-lg-12'>
                    <button onClick={showForm} className="btn btn-primary fw-semibold py-8 me-3">
                        <i class="ti ti-plus"></i>
                        Tambah Data
                    </button>
                    <Link href="/iam/org" className="btn btn-warning fw-semibold py-8 me-3">
                        Hierarki
                    </Link>
                </div>
                <div className="col-lg-12 p-3">
                    <div className='card'>
                        <div className='card-body'>
                            <div className="row">
                                <div className="col-lg-2 mb-2">
                                    <input value={f_code} onChange={e=>f_setCode(e.target.value)} type="text" className="form-control" placeholder="search code"/>
                                </div>
                                <div className="col-lg-2 mb-2">
                                    <input value={f_orgName} onChange={e=>f_setOrgName(e.target.value)} type="text" className="form-control" placeholder="search org name"/>
                                </div>
                                <div className="col-lg-2 mb-2">
                                    <input value={f_orgCode} onChange={e=>f_setOrgCode(e.target.value)} type="text" className="form-control" placeholder="search org code"/>
                                </div>
                                <div className="col-lg-2 mb-2">
                                    <input value={f_reportTo} onChange={e=>f_setReportTo(e.target.value)} type="text" className="form-control" placeholder="search report to"/>
                                </div>
                                <div className="col-lg-2 mb-2">
                                    <select value={f_level} onChange={e=>f_setLevel(e.target.value)} className='form-select'>
                                        <option value="">All Level</option>
                                        <option value={1}>DIREKTORAT</option>
                                        <option value={2}>KOMPARTEMEN</option>
                                        <option value={3}>DEPARTEMEN</option>
                                    </select>
                                </div>
                                <div className="col-lg-2 mb-2">
                                    <select value={f_status} onChange={e=>f_setStatus(e.target.value)} className='form-select'>
                                        <option value="">All Status</option>
                                        <option value="active">Active</option>
                                        <option value="in-active">In-Active</option>
                                    </select>
                                </div>
                            </div>
                            <div className="table-responsive mb-4 border rounded-1" style={{height: "500px"}}>
                                <table className="table text-nowrap mb-0 align-middle">
                                    <thead className="text-dark fs-4">
                                        <tr>
                                            <th>
                                                <h6 className="fs-4 fw-semibold mb-0">ORG Name</h6>
                                            </th>
                                            
                                            <th>
                                                <h6 className="fs-4 fw-semibold mb-0">ORG Code</h6>
                                            </th>
                                            <th>
                                                <h6 className="fs-4 fw-semibold mb-0">Report To</h6>
                                            </th>
                                            <th>
                                                <h6 className="fs-4 fw-semibold mb-0">Status</h6>
                                            </th>
                                            <th>
                                                <h6 className="fs-4 fw-semibold mb-0">Level</h6>
                                            </th>
                                            <th>
                                                <h6 className="fs-4 fw-semibold mb-0">Action</h6>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {datas.map((item)=>{
                                            return( 
                                                <tr key={item.code}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
        
                                                            <div className="ms-3">
                                                                <h6 className="fs-4 fw-semibold mb-0">{item.text}</h6>
                                                                <span className="fw-normal">{item.code}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                   
                                                    <td>
                                                        {item.org_code}
                                                    </td>
                                                    <td>
                                                        <div className="ms-3">
                                                            <h6 className="fs-4 fw-semibold mb-0">{ShowParent(item.code_parent)}</h6>
                                                            <span className="fw-normal">{item.code_parent}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {item.status=="active"?<span className="badge bg-success-subtle text-success">{item.status}</span>:<span className="badge bg-danger-subtle text-danger">{item.status}</span>}
                                                    </td>
                                                    <td>
                                                        {item.desc_level}
                                                    </td>
                                                    <td>
                                                        <button onClick={()=>RemoveOrg(item)} className="btn btn-danger">
                                                            <i className="ti ti-trash"></i>
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
                </div>
            </div>

            <Modal
                show={ShowModal}
                title={"ORG DETAIL"}
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
                                            Name
                                        </label>
                                        <div className="col-sm-9">
                                            <div className="input-group border rounded-1">
                                                <span
                                                    className="input-group-text bg-transparent px-6 border-0"
                                                >
                                                    <i className="ti ti-hierarchy fs-6" />
                                                </span>
                                                <input
                                                    value={orgName}
                                                    onChange={(e) => setOrgName(e.target.value)}
                                                    name="name"
                                                    type="text"
                                                    className="form-control border-0 ps-2"
                                                    placeholder="org name"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4 row align-items-center">
                                        <label
                                            htmlFor="exampleInputText33"
                                            className="form-label col-sm-3 col-form-label"
                                        >
                                            Code
                                        </label>
                                        <div className="col-sm-9">
                                            <div className="input-group border rounded-1">
                                                <span
                                                    className="input-group-text bg-transparent px-6 border-0"
                                                >
                                                    <i className="ti ti-dna fs-6" />
                                                </span>
                                                <input
                                                    value={code}
                                                    onChange={(e) => setCode(e.target.value)}
                                                    name="code"
                                                    type="text"
                                                    className="form-control border-0 ps-2"
                                                    placeholder=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4 row align-items-center">
                                        <label
                                            htmlFor="exampleInputText33"
                                            className="form-label col-sm-3 col-form-label"
                                        >
                                            org code
                                        </label>
                                        <div className="col-sm-9">
                                            <div className="input-group border rounded-1">
                                                <span
                                                    className="input-group-text bg-transparent px-6 border-0"
                                                >
                                                    <i className="ti ti-fidget-spinner fs-6" />
                                                </span>
                                                <input
                                                    value={orgCode}
                                                    onChange={(e) => setOrgCode(e.target.value)}
                                                    name="org_code"
                                                    type="text"
                                                    className="form-control border-0 ps-2"
                                                    placeholder=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4 row align-items-center">
                                        <label
                                            htmlFor="exampleInputText40"
                                            className="form-label col-sm-3 col-form-label"
                                        >
                                            Report To
                                        </label>
                                        <div className="col-sm-9">
                                            <div className="input-group border rounded-1">
                                                <span
                                                    className="input-group-text bg-transparent px-6 border-0"
                                                >
                                                    <i className="ti ti-brand-tidal fs-6" />
                                                </span>
                                                <input
                                                    value={reportTo}
                                                    onChange={(e) => setReportTo(e.target.value)}
                                                    name="report_to"
                                                    type="text"
                                                    id="report_to"
                                                    className="form-control border-0 ps-2"
                                                    placeholder="org code parent"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4 row align-items-center">
                                        <label
                                            htmlFor="exampleInputText40"
                                            className="form-label col-sm-3 col-form-label"
                                        >
                                            Status
                                        </label>
                                        <div className="col-sm-9">
                                            <div className="input-group border rounded-1">
                                                <span
                                                    className="input-group-text bg-transparent px-6 border-0"
                                                >
                                                    <i className="ti ti-rotate-rectangle fs-6" />
                                                </span>
                                                <select value={status} onChange={(e) => setStatus(e.target.value)} className='form-select'>
                                                    <option value="">Pilih Status</option>
                                                    <option value="active">active</option>
                                                    <option value="in-active">in-active</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4 row align-items-center">
                                        <label
                                            htmlFor="exampleInputText40"
                                            className="form-label col-sm-3 col-form-label"
                                        >
                                            Level
                                        </label>
                                        <div className="col-sm-9">
                                            <div className="input-group border rounded-1">
                                                <span
                                                    className="input-group-text bg-transparent px-6 border-0"
                                                >
                                                    <i className="ti ti-rotate-rectangle fs-6" />
                                                </span>
                                                <select value={level} onChange={(e) => setLevel(e.target.value)} className='form-select'>
                                                    <option value="">Pilih Level</option>
                                                    <option value={1}>DIREKTORAT</option>
                                                    <option value={2}>KOMPARTEMEN</option>
                                                    <option value={3}>DEPARTEMEN</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-3" />
                                        <div className="col-sm-9">
                                            <button onClick={() => setShowModal('')} className="btn btn-warning fw-semibold me-3">
                                                Close
                                            </button>
                                            <button onClick={submitForm} className="btn btn-primary">
                                                Save
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                }
            />

        </Main>
    );
}
