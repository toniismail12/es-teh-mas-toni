import { Main } from '@/layouts';
import { useEffect, useState, useCallback } from 'react';
import { GetOrg, SaveOrg, DeleteOrg, GetOldOrg } from '@/controllers';
import { Decode } from '@/utils';
import { Tree, Select } from 'antd';
import { Modal } from '@/components'
import Link from 'next/link';

export default function Org() {

  const [ShowModal, setShowModal] = useState('')
  const [datas, setData] = useState([])
  const [oldOrg, setOldOrg] = useState([])

  const [uid, setUid] = useState("")
  const [orgName, setOrgName] = useState("")
  const [code, setCode] = useState("")
  const [orgCode, setOrgCode] = useState("")
  const [reportTo, setReportTo] = useState("")
  const [status, setStatus] = useState("")
  const [level, setLevel] = useState("")

  // search
  const [f_orgName, f_setOrgName] = useState("")

  const onSelect = (selectedKeys, info) => {
    // console.log('selected', selectedKeys, info);

    const orgDetail = info.node
    // console.log(orgDetail)
    setUid(orgDetail.uid)
    setOrgName(orgDetail.text)
    setCode(orgDetail.code)
    setOrgCode(orgDetail.org_code)
    setReportTo(orgDetail.parent)
    setStatus(orgDetail.status)
    setLevel(orgDetail.level)

    setShowModal("show")
  };

  const createTreeData = (data) => {
    // Create a map to store nodes by their org_code
    const nodeMap = new Map();
    const rootNodes = [];

    // Populate the map with nodes
    data.forEach(item => {
      nodeMap.set(item.code, {
        title: item.text + " | " + item.code + " | " + item.status,
        text: item.text,
        uid: item.uid,
        key: item.org_code,
        org_code: item.org_code,
        code: item.code,
        parent: item.code_parent,
        status: item.status,
        level: item.level,
        children: []
      });
    });

    // Create the tree structure
    data.forEach(item => {
      const node = nodeMap.get(item.code);
      const parentNode = nodeMap.get(item.code_parent);

      if (parentNode) {
        parentNode.children.push(node);
      } else if (item.code_parent === '#') {
        // If no parent, it's a root node
        rootNodes.push(node);
      }
    });

    // Debugging: Inspect intermediate results
    // console.log('Node Map:', Array.from(nodeMap.entries()));
    // console.log('Root Nodes:', rootNodes);

    // Remove children property if empty
    const cleanTree = (node) => {
      if (!node.children?.length) {
        delete node.children;
      } else {
        node.children.forEach(cleanTree);
      }
    };

    rootNodes.forEach(cleanTree);

    return rootNodes;
  };

  const fetchData = useCallback(async () => {

    const getTotal = await GetOrg(1, 1)
    const total = getTotal?.meta?.total;

    const res = await GetOrg(1, total);

    if (res !== 'error') {
      const resDecode = Decode(res.data);
      // console.log(resDecode)
      setData(resDecode)

    }

  }, []);

  const fetchDataOldOrg = useCallback(async (text) => {

    const res = await GetOldOrg(1, 7, text);

    if (res !== 'error') {
      const resDecode = Decode(res.data);
      // console.log(resDecode)
      setOldOrg(resDecode)

    }

  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchDataOldOrg(f_orgName);
  }, [fetchDataOldOrg, f_orgName]);

  const treeDatas = createTreeData(datas);
  // console.log(JSON.stringify(treeDatas, null, 2));

  const onRightClick = (selectedKeys) => {

    // console.log('right click', selectedKeys.node);
    const data = selectedKeys.node;

    const cnf = confirm("Delete " + data.text + "?");
    if (cnf) {
      DeleteOrg(data.uid)
      fetchData();
    }
  };

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

  const onChange = (value) => {
    // console.log(`selected ${value}`);
    if (value !== undefined) {
      const parts = value.split("*")
      setOrgCode(parts[0])
      setOrgName(parts[1])
    } else {
      setOrgName("")
      setOrgCode("")
      f_setOrgName("")
    }
    
  };
  const onSearch = (value) => {
    // console.log('search:', value);
    f_setOrgName(value)
  };

  const onChange2 = (value) => {
    console.log(`selected ${value}`);
    setReportTo(value)
    
  };
  const onSearch2 = (value) => {
    console.log('search:', value);
  };

  return (
    <Main>
      <div className="row">
        <div className='col-lg-12'>
          <button onClick={showForm} className="btn btn-primary fw-semibold py-8 me-3">
            <i class="ti ti-plus"></i>
            Tambah Data
          </button>
          <Link href="/iam/table-org" onClick={showForm} className="btn btn-warning fw-semibold py-8 me-3">
            Table ORG
          </Link>
        </div>
        <div className="col-lg-12 p-3">
          <div className='card'>
            <div className='card-body'>

              <Tree
                showLine
                // defaultExpandedKeys={['']}
                onSelect={onSelect}
                onRightClick={onRightClick}
                treeData={treeDatas}
              />

            </div>
          </div>
        </div>
      </div>

      <Modal
        show={ShowModal}
        title={uid === "" ? "ADD ORG" : "UPDATE ORG"}
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
                      Name
                    </label>
                    <div className="col-sm-9">
                      <div className="input-group border rounded-1">
                        <Select
                          getPopupContainer={(trigger) => document.getElementById('select-search2')}
                          style={{ width: '100%'}}
                          showSearch
                          allowClear
                          placeholder="Select a ORG"
                          optionFilterProp="label"
                          onChange={onChange}
                          onSearch={onSearch}
                          options={oldOrg?.map((items)=>{
                            return {
                              "label":items.ORG_UNIT_DESC,
                              "value":items.ORG_UNIT+"*"+items.ORG_UNIT_DESC,
                            }
                          })}
                        />

                      </div>
                      {orgName}
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
                          disabled
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
                        
                        <Select
                          getPopupContainer={(trigger) => document.getElementById('select-search2')}
                          style={{ width: '100%'}}
                          showSearch
                          allowClear
                          placeholder="Select a ORG"
                          optionFilterProp="label"
                          onChange={onChange2}
                          onSearch={onSearch2}
                          options={datas?.map((items)=>{
                            return {
                              "label":items.text+" - "+items.code,
                              "value":items.code,
                            }
                          })}
                        />
                        {/* <input
                          value={reportTo}
                          onChange={(e) => setReportTo(e.target.value)}
                          name="report_to"
                          type="text"
                          id="report_to"
                          className="form-control border-0 ps-2"
                          placeholder="code"
                        /> */}
                      </div>
                      {reportTo}
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
