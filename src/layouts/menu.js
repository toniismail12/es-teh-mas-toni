import React from 'react'
import { useRouter } from 'next/router';

export default function Menu() {
    const { pathname } = useRouter()

    const menuItems = [
        { type: 'nav-small-cap', label: 'Home', icon: 'ti ti-dots' },
        { type: 'sidebar-item', label: 'Dashboard', icon: 'ti ti-aperture', href: '/' },
        { type: 'nav-small-cap', label: 'AI', icon: 'ti ti-dots' },
        { type: 'sidebar-item', label: 'Api Key', icon: 'ti ti-aperture', href: '#' },
        { type: 'nav-small-cap', label: 'IAM', icon: 'ti ti-dots' },
        { type: 'sidebar-item', label: 'Api Key', icon: 'ti ti-aperture', href: '#' },
        { type: 'sidebar-item', label: 'ORG', icon: 'ti ti-aperture', href: '/iam/org'},
        { type: 'sidebar-item', label: 'EMP', icon: 'ti ti-aperture', href: '/iam/emp' },
        { type: 'nav-small-cap', label: 'Email', icon: 'ti ti-dots' },
        { type: 'sidebar-item', label: 'Api Key', icon: 'ti ti-aperture', href: '#' }
    ];

    return (
        <ul id="sidebarnav">
            {menuItems.map((item, index) => (
                item.type === 'nav-small-cap' ? (
                    <li key={index} className="nav-small-cap">
                        <i className={`${item.icon} nav-small-cap-icon fs-4`} />
                        <span className="hide-menu">{item.label}</span>
                    </li>
                ) : (
                    <li key={index} className="sidebar-item">
                        <a
                            className={`sidebar-link ${item.href === pathname ? "active" : ""}`}
                            href={item.href}
                            aria-expanded="false"
                        >
                            <span>
                                <i className={item.icon} />
                            </span>
                            <span className="hide-menu">{item.label}</span>
                        </a>
                    </li>
                )
            ))}
        </ul>
    )
}
