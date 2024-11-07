import React from 'react';
import { useState } from 'react';
import { Main } from '@/layouts';
import Image from "next/image";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SentChatDocProcess } from '@/controllers'

export default function ChatDocumentProcessing() {

    const [datas, setData] = useState([])
    const [loading, setLoading] = useState(false)

    // var chat = [
    //     {
    //         Role: "model",
    //         Parts: "hi there, how are you?"
    //     },
    //     {
    //         Role: "user",
    //         Parts: "hi, fine"
    //     },
    // ]

    async function SubmitUpFile() {

        setLoading(true)

        var docfile1 = document.querySelector('#file');

        if (docfile1.files[0] == undefined) {
            return alert("file wajib diisi.")
        }

        const res = await SentChatDocProcess(docfile1.files[0])
        const newMessage = {
            Role: "model",
            Parts: res.response.text
        };

        // Add the new message to the existing datas array
        setData(prevData => [...prevData, newMessage]);

        setLoading(false)

    }

    return (
        <Main>

            <div className="row">
                <div className="col-lg-12">

                    <div className="mb-4 row align-items-center">
                        <label
                            className="form-label col-sm-3 col-form-label"
                        >
                            Upload File
                        </label>
                        <div className="col-sm-9 mb-3">
                            <div className="input-group border rounded-1">

                                <span
                                    className="input-group-text bg-transparent px-6 border-0"
                                >
                                    <i className="ti ti-dna fs-6" />
                                </span>
                                <input
                                    id="file"
                                    name="code"
                                    type="file"
                                    className="form-control border-0 ps-2"
                                    placeholder=""
                                />

                            </div>
                            
                        </div>

                        <div className="text-end">
                            {!loading &&
                                <button onClick={SubmitUpFile} className="btn btn-sm btn-primary">Submit</button>
                            }
                        </div>

                    </div>

                </div>
                <div className="col-lg-12">
                    <div className="d-flex parent-chat-box border p-5">
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

                                                        {loading &&
                                                            <div className="hstack gap-3 align-items-start mb-7 justify-content-start">
                                                                <div>
                                                                    <h6 className="fs-2 text-muted">model</h6>
                                                                    <div className="p-2 text-bg-light rounded-1 d-inline-block text-dark fs-3">
                                                                        Loading ...
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }


                                                        {datas?.map((item, ind) => {
                                                            return (

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
                    </div>


                </div>
            </div>

        </Main>
    )
}
