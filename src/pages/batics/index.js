import React from 'react';
import { Main } from '@/layouts';

export default function Home() {
    return (
        <Main>

            <div className="row">
                <div className="col-lg-12">
                    <iframe
                        // className="mt-3"
                        src={"https://batics.pupuk-indonesia.com/medan/Home#Dashboard_home"}
                        sandbox="allow-scripts allow-same-origin allow-forms"
                        width="100%"
                        height="600px"
                        style={{ border: 'none' }}
                    ></iframe>
                </div>
            </div>

        </Main>
    )
}
