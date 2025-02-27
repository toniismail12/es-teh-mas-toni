import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head'
import { useEffect, useCallback } from 'react';
import { CheckLogin } from '@/controllers';
import { Analytics } from '@vercel/analytics/next';
import Script from "next/script";

export default function Main({ children }) {

  const { pathname } = useRouter();

  const fetchData = useCallback(async () => {

    const res = await CheckLogin();

    if (res == 'error') {
      window.location.href = "/login";
    }

  }, []);

  useEffect(() => {

    fetchData();
    // Clarity.init("qc1pe517fb");

  }, [fetchData]);

  const tabs = [
    { href: "/", icon: "ti ti-home fs-7", label: "Home" },
    { href: "/private/trx", icon: "ti ti-cash fs-7", label: "Penjualan" },
    { href: "/private/pengeluaran", icon: "ti ti-arrows-exchange fs-7", label: "Pengeluaran" },
    { href: "/private/data", icon: "ti ti-barcode fs-7", label: "Produk" },
    { href: "/private/stok", icon: "ti ti-database fs-7", label: "Stok" },
  ];

  return (
    <>
      <Head>
          <title>Es Teh Mas Toni</title>
          <meta name="description" content="Es Teh Mas Toni - Palembang" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/assets/images/rating/star-on.png" />
      </Head>

      {/* <Script id="microsoft-clarity-analytics">
        {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "qc1pe517fb");
        `}
      </Script> */}

      <div id="main-wrapper">
        <div className="page-wrapper">
          <div className="body mt-4 mb-5">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  {children}
                  <Analytics />
                  {/* <div className="card">
    
                      {children}
                      <Analytics />

                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Nav */}
          <div className="bottom-nav">
            <ul className="nav nav-tabs d-flex justify-content-around">
              {tabs.map((tab, index) => (
                <li key={index} className="nav-item flex-fill text-center">
                  <Link className={`nav-link ${tab.href === pathname ? "active" : ""}`} href={tab.href}>
                    <i className={tab.icon} />
                    <span className="d-block d-md-none fs-1">{tab.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

    </>
  );
}
