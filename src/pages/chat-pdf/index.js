import React from 'react';
import { Main } from '@/layouts';
import Image from "next/image";

export default function ChatPDF() {
  return (
    <Main>

      <div className="row">
        <div className="col-lg-12">

          <div className="d-flex parent-chat-box">
            <div className="chat-box w-xs-100">
              <div className="chat-box-inner p-9" data-simplebar="init">
                <div className="simplebar-wrapper" style={{ margin: "-20px" }}>
                  <div className="simplebar-height-auto-observer-wrapper">
                    <div className="simplebar-height-auto-observer" />
                  </div>
                  <div className="simplebar-mask">
                    <div className="simplebar-offset" style={{ right: 0, bottom: 0 }}>
                      <div
                        className="simplebar-content-wrapper"
                        tabIndex={0}
                        role="region"
                        aria-label="scrollable content"
                        style={{ height: "100%", overflow: "hidden" }}
                      >
                        <div className="simplebar-content" style={{ padding: 20 }}>
                          <div className="chat-list chat active-chat" data-user-id={1}>
                            <div className="hstack gap-3 align-items-start mb-7 justify-content-start">
                              <img
                                src="../assets/images/profile/user-8.jpg"
                                alt="user8"
                                width={40}
                                height={40}
                                className="rounded-circle"
                              />
                              <div>
                                <h6 className="fs-2 text-muted">Andrew, 2 hours ago</h6>
                                <div className="p-2 text-bg-light rounded-1 d-inline-block text-dark fs-3">
                                  If I don’t like something, I’ll stay away from it.
                                </div>
                              </div>
                            </div>
                            <div className="hstack gap-3 align-items-start mb-7 justify-content-end">
                              <div className="text-end">
                                <h6 className="fs-2 text-muted">2 hours ago</h6>
                                <div className="p-2 bg-info-subtle text-dark rounded-1 d-inline-block fs-3">
                                  If I don’t like something, I’ll stay away from it.
                                </div>
                              </div>
                            </div>
                            <div className="hstack gap-3 align-items-start mb-7 justify-content-start">
                              <img
                                src="../assets/images/profile/user-8.jpg"
                                alt="user8"
                                width={40}
                                height={40}
                                className="rounded-circle"
                              />
                              <div>
                                <h6 className="fs-2 text-muted">Andrew, 2 hours ago</h6>
                                <div className="p-2 text-bg-light rounded-1 d-inline-block text-dark fs-3">
                                  I want more detailed information.
                                </div>
                              </div>
                            </div>
                            <div className="hstack gap-3 align-items-start mb-7 justify-content-end">
                              <div className="text-end">
                                <h6 className="fs-2 text-muted">2 hours ago</h6>
                                <div className="p-2 bg-info-subtle text-dark mb-1 d-inline-block rounded-1 fs-3">
                                  If I don’t like something, I’ll stay away from it.
                                </div>
                                <div className="p-2 bg-info-subtle text-dark rounded-1 fs-3">
                                  They got there early, and they got really good seats.
                                </div>
                              </div>
                            </div>
                            <div className="hstack gap-3 align-items-start mb-7 justify-content-start">
                              <img
                                src="../assets/images/profile/user-8.jpg"
                                alt="user8"
                                width={40}
                                height={40}
                                className="rounded-circle"
                              />
                              <div>
                                <h6 className="fs-2 text-muted">Andrew, 2 hours ago</h6>
                                <div className="rounded-2 overflow-hidden">
                                  <img
                                    src="../assets/images/products/product-1.jpg"
                                    alt="modernize-img"
                                    className="w-100"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* 2 */}
                          <div className="chat-list chat" data-user-id={2}>
                            <div className="hstack gap-3 align-items-start mb-7 justify-content-start">
                              <img
                                src="../assets/images/profile/user-8.jpg"
                                alt="user8"
                                width={40}
                                height={40}
                                className="rounded-circle"
                              />
                              <div>
                                <h6 className="fs-2 text-muted">Andrew, 2 hours ago</h6>
                                <div className="p-2 text-bg-light rounded-1 d-inline-block text-dark fs-3">
                                  If I don’t like something, I’ll stay away from it.
                                </div>
                              </div>
                            </div>
                            <div className="hstack gap-3 align-items-start mb-7 justify-content-end">
                              <div className="text-end">
                                <h6 className="fs-2 text-muted">2 hours ago</h6>
                                <div className="p-2 bg-info-subtle text-dark rounded-1 d-inline-block fs-3">
                                  If I don’t like something, I’ll stay away from it.
                                </div>
                              </div>
                            </div>
                            <div className="hstack gap-3 align-items-start mb-7 justify-content-start">
                              <img
                                src="../assets/images/profile/user-8.jpg"
                                alt="user8"
                                width={40}
                                height={40}
                                className="rounded-circle"
                              />
                              <div>
                                <h6 className="fs-2 text-muted">Andrew, 2 hours ago</h6>
                                <div className="p-2 text-bg-light rounded-1 d-inline-block text-dark fs-3">
                                  I want more detailed information.
                                </div>
                              </div>
                            </div>
                            <div className="hstack gap-3 align-items-start mb-7 justify-content-end">
                              <div className="text-end">
                                <h6 className="fs-2 text-muted">2 hours ago</h6>
                                <div className="p-2 bg-info-subtle text-dark mb-1 d-inline-block rounded-1 fs-3">
                                  If I don’t like something, I’ll stay away from it.
                                </div>
                                <div className="p-2 bg-info-subtle text-dark rounded-1 fs-3">
                                  They got there early, and they got really good seats.
                                </div>
                              </div>
                            </div>
                            <div className="hstack gap-3 align-items-start mb-7 justify-content-start">
                              <img
                                src="../assets/images/profile/user-8.jpg"
                                alt="user8"
                                width={40}
                                height={40}
                                className="rounded-circle"
                              />
                              <div>
                                <h6 className="fs-2 text-muted">Andrew, 2 hours ago</h6>
                                <div className="rounded-2 overflow-hidden">
                                  <img
                                    src="../assets/images/products/product-1.jpg"
                                    alt="modernize-img"
                                    className="w-100"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* 3 */}
                          <div className="chat-list chat" data-user-id={3}>
                            <div className="hstack gap-3 align-items-start mb-7 justify-content-start">
                              <img
                                src="../assets/images/profile/user-8.jpg"
                                alt="user8"
                                width={40}
                                height={40}
                                className="rounded-circle"
                              />
                              <div>
                                <h6 className="fs-2 text-muted">Andrew, 2 hours ago</h6>
                                <div className="p-2 text-bg-light rounded-1 d-inline-block text-dark fs-3">
                                  If I don’t like something, I’ll stay away from it.
                                </div>
                              </div>
                            </div>
                            <div className="hstack gap-3 align-items-start mb-7 justify-content-end">
                              <div className="text-end">
                                <h6 className="fs-2 text-muted">2 hours ago</h6>
                                <div className="p-2 bg-info-subtle text-dark rounded-1 d-inline-block fs-3">
                                  If I don’t like something, I’ll stay away from it.
                                </div>
                              </div>
                            </div>
                            <div className="hstack gap-3 align-items-start mb-7 justify-content-start">
                              <img
                                src="../assets/images/profile/user-8.jpg"
                                alt="user8"
                                width={40}
                                height={40}
                                className="rounded-circle"
                              />
                              <div>
                                <h6 className="fs-2 text-muted">Andrew, 2 hours ago</h6>
                                <div className="p-2 text-bg-light rounded-1 d-inline-block text-dark fs-3">
                                  I want more detailed information.
                                </div>
                              </div>
                            </div>
                            <div className="hstack gap-3 align-items-start mb-7 justify-content-end">
                              <div className="text-end">
                                <h6 className="fs-2 text-muted">2 hours ago</h6>
                                <div className="p-2 bg-info-subtle text-dark mb-1 d-inline-block rounded-1 fs-3">
                                  If I don’t like something, I’ll stay away from it.
                                </div>
                                <div className="p-2 bg-info-subtle text-dark rounded-1 fs-3">
                                  They got there early, and they got really good seats.
                                </div>
                              </div>
                            </div>
                            <div className="hstack gap-3 align-items-start mb-7 justify-content-start">
                              <img
                                src="../assets/images/profile/user-8.jpg"
                                alt="user8"
                                width={40}
                                height={40}
                                className="rounded-circle"
                              />
                              <div>
                                <h6 className="fs-2 text-muted">Andrew, 2 hours ago</h6>
                                <div className="rounded-2 overflow-hidden">
                                  <img
                                    src="../assets/images/products/product-1.jpg"
                                    alt="modernize-img"
                                    className="w-100"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* 4 */}
                          <div className="chat-list chat" data-user-id={4}>
                            <div className="hstack gap-3 align-items-start mb-7 justify-content-start">
                              <img
                                src="../assets/images/profile/user-8.jpg"
                                alt="user8"
                                width={40}
                                height={40}
                                className="rounded-circle"
                              />
                              <div>
                                <h6 className="fs-2 text-muted">Andrew, 2 hours ago</h6>
                                <div className="p-2 text-bg-light rounded-1 d-inline-block text-dark fs-3">
                                  If I don’t like something, I’ll stay away from it.
                                </div>
                              </div>
                            </div>
                            <div className="hstack gap-3 align-items-start mb-7 justify-content-end">
                              <div className="text-end">
                                <h6 className="fs-2 text-muted">2 hours ago</h6>
                                <div className="p-2 bg-info-subtle text-dark rounded-1 d-inline-block fs-3">
                                  If I don’t like something, I’ll stay away from it.
                                </div>
                              </div>
                            </div>
                            <div className="hstack gap-3 align-items-start mb-7 justify-content-start">
                              <img
                                src="../assets/images/profile/user-8.jpg"
                                alt="user8"
                                width={40}
                                height={40}
                                className="rounded-circle"
                              />
                              <div>
                                <h6 className="fs-2 text-muted">Andrew, 2 hours ago</h6>
                                <div className="p-2 text-bg-light rounded-1 d-inline-block text-dark fs-3">
                                  I want more detailed information.
                                </div>
                              </div>
                            </div>
                            <div className="hstack gap-3 align-items-start mb-7 justify-content-end">
                              <div className="text-end">
                                <h6 className="fs-2 text-muted">2 hours ago</h6>
                                <div className="p-2 bg-info-subtle text-dark mb-1 d-inline-block rounded-1 fs-3">
                                  If I don’t like something, I’ll stay away from it.
                                </div>
                                <div className="p-2 bg-info-subtle text-dark rounded-1 fs-3">
                                  They got there early, and they got really good seats.
                                </div>
                              </div>
                            </div>
                            <div className="hstack gap-3 align-items-start mb-7 justify-content-start">
                              <img
                                src="../assets/images/profile/user-8.jpg"
                                alt="user8"
                                width={40}
                                height={40}
                                className="rounded-circle"
                              />
                              <div>
                                <h6 className="fs-2 text-muted">Andrew, 2 hours ago</h6>
                                <div className="rounded-2 overflow-hidden">
                                  <img
                                    src="../assets/images/products/product-1.jpg"
                                    alt="modernize-img"
                                    className="w-100"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* 5 */}
                          <div className="chat-list chat" data-user-id={5}>
                            <div className="hstack gap-3 align-items-start mb-7 justify-content-start">
                              <img
                                src="../assets/images/profile/user-8.jpg"
                                alt="user8"
                                width={40}
                                height={40}
                                className="rounded-circle"
                              />
                              <div>
                                <h6 className="fs-2 text-muted">Andrew, 2 hours ago</h6>
                                <div className="p-2 text-bg-light rounded-1 d-inline-block text-dark fs-3">
                                  If I don’t like something, I’ll stay away from it.
                                </div>
                              </div>
                            </div>
                            <div className="hstack gap-3 align-items-start mb-7 justify-content-end">
                              <div className="text-end">
                                <h6 className="fs-2 text-muted">2 hours ago</h6>
                                <div className="p-2 bg-info-subtle text-dark rounded-1 d-inline-block fs-3">
                                  If I don’t like something, I’ll stay away from it.
                                </div>
                              </div>
                            </div>
                            <div className="hstack gap-3 align-items-start mb-7 justify-content-start">
                              <img
                                src="../assets/images/profile/user-8.jpg"
                                alt="user8"
                                width={40}
                                height={40}
                                className="rounded-circle"
                              />
                              <div>
                                <h6 className="fs-2 text-muted">Andrew, 2 hours ago</h6>
                                <div className="p-2 text-bg-light rounded-1 d-inline-block text-dark fs-3">
                                  I want more detailed information.
                                </div>
                              </div>
                            </div>
                            <div className="hstack gap-3 align-items-start mb-7 justify-content-end">
                              <div className="text-end">
                                <h6 className="fs-2 text-muted">2 hours ago</h6>
                                <div className="p-2 bg-info-subtle text-dark mb-1 d-inline-block rounded-1 fs-3">
                                  If I don’t like something, I’ll stay away from it.
                                </div>
                                <div className="p-2 bg-info-subtle text-dark rounded-1 fs-3">
                                  They got there early, and they got really good seats.
                                </div>
                              </div>
                            </div>
                            <div className="hstack gap-3 align-items-start mb-7 justify-content-start">
                              <img
                                src="../assets/images/profile/user-8.jpg"
                                alt="user8"
                                width={40}
                                height={40}
                                className="rounded-circle"
                              />
                              <div>
                                <h6 className="fs-2 text-muted">Andrew, 2 hours ago</h6>
                                <div className="rounded-2 overflow-hidden">
                                  <img
                                    src="../assets/images/products/product-1.jpg"
                                    alt="modernize-img"
                                    className="w-100"
                                  />
                                </div>
                              </div>
                            </div>
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
                <div
                  className="simplebar-track simplebar-horizontal"
                  style={{ visibility: "hidden" }}
                >
                  <div
                    className="simplebar-scrollbar"
                    style={{ width: 0, display: "none" }}
                  />
                </div>
                <div
                  className="simplebar-track simplebar-vertical"
                  style={{ visibility: "hidden" }}
                >
                  <div
                    className="simplebar-scrollbar"
                    style={{ height: 0, display: "none" }}
                  />
                </div>
              </div>
              <div className="px-9 py-6 border-top chat-send-message-footer">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2 w-85">
                    <a
                      className="position-relative nav-icon-hover z-index-5"
                      href="javascript:void(0)"
                    >
                      <i className="ti ti-mood-smile text-dark bg-hover-primary fs-7" />
                    </a>
                    <input
                      type="text"
                      className="form-control message-type-box text-muted border-0 p-0 ms-2"
                      placeholder="Type a Message"
                      fdprocessedid="0p3op"
                    />
                  </div>
                  <ul className="list-unstyledn mb-0 d-flex align-items-center">
                    <li>
                      <a
                        className="text-dark px-2 fs-7 bg-hover-primary nav-icon-hover position-relative z-index-5"
                        href="javascript:void(0)"
                      >
                        <i className="ti ti-photo-plus" />
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-dark px-2 fs-7 bg-hover-primary nav-icon-hover position-relative z-index-5"
                        href="javascript:void(0)"
                      >
                        <i className="ti ti-paperclip" />
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-dark px-2 fs-7 bg-hover-primary nav-icon-hover position-relative z-index-5"
                        href="javascript:void(0)"
                      >
                        <i className="ti ti-microphone" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
           
          </div>


        </div>
      </div>

    </Main>
  )
}
