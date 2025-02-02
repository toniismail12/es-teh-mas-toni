import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head'
import { useEffect, useCallback } from 'react';
import { CheckLogin } from '@/controllers';
import { Analytics } from '@vercel/analytics/next';

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

  }, [fetchData]);

  const tabs = [
    { href: "/", icon: "ti ti-dashboard fs-4", label: "Home" },
    { href: "/private/trx", icon: "ti ti-currency-dollar fs-4", label: "Transaksi" },
    { href: "/private/data", icon: "ti ti-barcode fs-4", label: "Produk" },
    { href: "/private/stok", icon: "ti ti-database", label: "Stok" },
  ];

  return (
    <>
      <Head>
          <title>Es Teh Mas Toni</title>
          <meta name="description" content="Es Teh Mas Toni - Palembang" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/assets/images/rating/star-on.png" />
      </Head>

      <div id="main-wrapper">
        <div className="page-wrapper">
          <div className="body mt-4 mb-5">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
    
                      {children}
                      <Analytics />

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Nav */}
          <div className="bottom-nav">
            <ul className="nav nav-tabs d-flex justify-content-around">
              {tabs.map((tab, index) => (
                <li key={index} className="nav-item flex-fill text-center border">
                  <Link className={`nav-link ${tab.href === pathname ? "active" : ""}`} href={tab.href}>
                    <i className={tab.icon} />
                    <span className="d-block d-md-none">{tab.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background-color: #fff;
          box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
          z-index: 1030;
        }
        .nav-tabs .nav-link {
          padding: 10px 0;
        }
      `}</style>
    </>
  );
}
