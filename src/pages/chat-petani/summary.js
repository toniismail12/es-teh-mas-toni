import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link'
import { SentChatTabular } from '@/controllers'
import { useEffect, useState, useCallback } from 'react';

export default function ChatSummary({ name, chat, load }) {
  
  return (

    <div className="chat-container h-100 w-100">
      <div className="chat-box-inner-part h-100">
        <div className="chatting-box app-email-chatting-box">
          <div className="p-9 py-3 border-bottom chat-meta-user d-flex align-items-center justify-content-between">
            <h5 className="text-dark mb-0 fs-5">{name}</h5>
            <ul className="list-unstyled mb-0 d-flex align-items-center">
              
              {/* <li
                onClick={()=>CreateTabular()}
                className="position-relative"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="important"
              >
                <Link
                  className="text-dark px-2 fs-3 bg-hover-primary nav-icon-hover position-relative z-index-5"
                  href="javascript:void(0)"
                >
                  Lihat Ringkasan
                </Link>
              </li> */}
              {/* <li
                className="position-relative"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="Edit"
              >
                <a
                  className="d-block text-dark px-2 fs-5 bg-hover-primary nav-icon-hover position-relative z-index-5"
                  href="javascript:void(0)"
                >
                  <i className="ti ti-pencil" />
                </a>
              </li> */}
              {/* <li
                className="position-relative"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="Delete"
              >
                <a
                  className="text-dark px-2 fs-5 bg-hover-primary nav-icon-hover position-relative z-index-5"
                  href="javascript:void(0)"
                >
                  <i className="ti ti-trash" />
                </a>
              </li> */}
            </ul>
          </div>

          <div className="position-relative overflow-hidden p-3">

            {/* {JSON.stringify(chat)} */}
            {load}

            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
              {Object.entries(chat).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
              </tbody>
            </table>

            {/* <div className="d-flex parent-chat-box">
              <div className="chat-box w-100">
                <div className="chat-box-inner p-9" data-simplebar="init">
                  <div className="simplebar-wrapper" style={{ margin: "-20px" }}>
                    <div className="simplebar-height-auto-observer-wrapper">
                      <div className="simplebar-height-auto-observer" />
                    </div>
                    <div className="simplebar-mask">
                      <div className="simplebar-offset" style={{ right: 0, bottom: 0 }}>
                        <div
                          className="simplebar-content-wrapper"
                        >
                          <div className="simplebar-content">
                            <div className="chat-list chat active-chat">

                              {chat?.map((item, ind)=>{
                                return(

                                  <div key={ind} className={item.Role === "model" ? "hstack gap-3 align-items-start mb-7 justify-content-start" : "hstack gap-3 align-items-start mb-7 justify-content-end"}>
                                    <div>
                                      <h6 className="fs-2 text-muted">{item.Role}</h6>
                                      <div className="p-2 text-bg-light rounded-1 d-inline-block text-dark fs-3">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                          {item.Parts}
                                        </ReactMarkdown>
                                      </div>
                                    </div>
                                  </div>

                                )
                              })}

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="simplebar-placeholder"
                      style={{ width: 379, height: 619 }}
                    />
                  </div>                 
                </div>
              </div>
            </div> */}


          </div>
        </div>
      </div>
    </div>
  )

}