import React from 'react'

export default function Modal({show, title, onClose, body}) {
    
    return (
        <div
            className={`modal fade ${show} bg-white`}
            id="modal"
            style={{ display: show === 'show' ? 'block' : 'none' }}
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header d-flex align-items-center">
                        <h5 className="modal-title" id="myLargeModalLabel">
                            {title}
                        </h5>
                        <button
                            onClick={onClose}
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>

                    {body}
                    
                </div>
                {/* /.modal-content */}
            </div>
            {/* /.modal-dialog */}
        </div>

    )
}
