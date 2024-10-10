import React from 'react';
import { Main } from '@/layouts';
import { GetContact, GetChatHistory, SentChatTabular } from '@/controllers'
import { useEffect, useState, useCallback } from 'react';
import ChatSummary from './summary'

export default function ChatPetani() {

  const [data, setData] = useState([])
  const [dataChat, setDataChat] = useState([])
  const [name, setName] = useState("")
  const [noHp, setNoHp] = useState("") 
  const [loading, setLoading] = useState("")

  const fetchData = useCallback(async () => {

    const res = await GetContact("");

    if (res !== 'error') {
      const resDecode = res?.data;
      // console.log(resDecode)
      setData(resDecode)

    }

  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function GetHistory(nom, nam) {

    setLoading("Mohon tunggu sebentar ...")

    setDataChat([])
    
    setName(nam)
    setNoHp(nom)

    var dh = await GetChatHistory(nom)

    const res = await SentChatTabular(dh?.data, nam, nom)

    const dataArray = res?.data?.response;
    // console.log(dataArray)
    setDataChat(dataArray)
    setLoading("")

  }

  return (
    <Main>

      <div className="row">
        <div className="col-lg-12">

          <div className="card overflow-hidden chat-application">
            
            <div className="d-flex w-100">
           
              <div className="d-flex w-100">
                <div className="min-width-340">
                  <div className="border-end user-chat-box h-100">
                    <div className="px-4 pt-9 pb-6 d-none d-lg-block">
                      <form className="position-relative">
                        <input
                          type="text"
                          className="form-control search-chat py-2 ps-5"
                          id="text-srh"
                          placeholder="Search"
                        />
                        <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3" />
                      </form>
                    </div>
                    <div className="app-chat">
                      <ul
                        className="chat-users mh-n100 simplebar-scrollable-y"
                        data-simplebar="init"
                      >
                        <div className="simplebar-wrapper" style={{ margin: 0 }}>
                          <div className="simplebar-height-auto-observer-wrapper">
                            <div className="simplebar-height-auto-observer" />
                          </div>
                          <div className="simplebar-mask">
                            <div
                              className="simplebar-offset"
                              style={{ right: 0, bottom: 0 }}
                            >
                              <div
                                className="simplebar-content-wrapper"

                                // style={{ height: "auto", overflow: "hidden scroll" }}
                              >
                                <div className="simplebar-content" style={{ padding: 0 }}>
                                  {data.map((item)=>{
                                    return (
                                      <li key={item.id} className="mb-3">
                                        <button
                                          onClick={()=>GetHistory(item.number, item.name)}
                                          className="btn btn-light btn-sm w-100 text-start bg-hover-light-black"
                                        >
                                        
                                          <div className="ms-6 d-inline-block w-75">
                                            <h6
                                              className="mb-1 fw-semibold chat-title"
                                            >
                                              {item.name}
                                            </h6>
                                            <span className="fs-2 text-body-color d-block">
                                              {item.number}
                                            </span>
                                          </div>
                                        </button>
                                      </li>
                                    )
                                  })}
                                
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="simplebar-placeholder"
                            style={{ width: 339, height: 720 }}
                          />
                        </div>
                        <div
                          className="simplebar-track simplebar-horizontal"
                          style={{ visibility: "hidden" }}
                        >
                          <div
                            className="simplebar-scrollbar"
                            // style={{ width: 0, display: "none" }}
                          />
                        </div>
                        <div
                          className="simplebar-track simplebar-vertical"
                          // style={{ visibility: "visible" }}
                        >
                          <div
                            className="simplebar-scrollbar"
                            style={{
                              height: 467,
                              transform: "translate3d(0px, 0px, 0px)",
                              display: "block"
                            }}
                          />
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="w-100">

                  <ChatSummary name={name} chat={dataChat} load={loading} />

                </div>
              </div>
           
            </div>
          </div>

        </div>
      </div>

    </Main>
  )
}
