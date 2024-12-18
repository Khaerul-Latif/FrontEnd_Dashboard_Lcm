import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {

  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <aside
    id='layout-menu'
    className='layout-menu menu-vertical menu bg-menu-theme'
  >
    <div className='app-brand demo text-lg'>
      <a href='/admin/dashboard' className='app-brand-link'>
        <span className='app-brand-logo demo'>
        <img
        src='/assets/img/icons/LOGO-07.png'
        alt='Logo'
        style={{ width: '25px' }}
      />
          </span>
        <span className='text-lg demo menu-text fw-bolder ms-2'style={{ fontSize: '20px' }}>
          LifeCamp
        </span>
      </a>
      <a
        href='_blank'
        className='layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none'
      >
        <i className='bx bx-chevron-left bx-sm align-middle' />
      </a>
    </div>
    <div className='menu-inner-shadow' />
    <ul className='menu-inner py-1'>
      {/* Dashboard */}
      {/* <li className={`menu-item ${currentPath === '/admin/dashboard' ? 'active' : ''}`}>
        <Link to='/admin/dashboard' className='menu-link'>
          <i className='menu-icon tf-icons bx bxs-home-circle' />
          <div data-i18n='Dashboard'>Dashboard</div>
        </Link>
      </li> */}
       <li className={`menu-item ${(currentPath === '/admin/sesi-perkenalan' || currentPath === '/admin/interest-program' ||currentPath === '/admin/daftar-peserta-sp' || currentPath === '/admin/dashboard') ? 'active open' : ''}`}>
        <a href='javascript:void(0);' className='menu-link menu-toggle'>
          <i className='menu-icon tf-icons bx bx-dock-top' />
          <div data-i18n='LifeCamp'>LifeCamp</div>
        </a>
        <ul className='menu-sub'>
        <li className={`menu-item ${currentPath === '/admin/dashboard' ? 'active' : ''}`}>
            <a
              href='/admin/dashboard'
              className='menu-link'
            >
              <div data-i18n='Summary'>Summary</div>
            </a>
          </li>
          <li className={`menu-item ${currentPath === '/admin/daftar-peserta-sp' ? 'active' : ''}`}>
            <a
              href='/admin/daftar-peserta-sp'
              className='menu-link'
            >
              <div data-i18n='Daftar Peserta SP'>Daftar Peserta SP</div>
            </a>
          </li>
          <li className={`menu-item ${currentPath === '/admin/sesi-perkenalan' ? 'active' : ''}`}>
            <a
              href='/admin/sesi-perkenalan'
              className='menu-link'
            >
              <div data-i18n='Sesi Perkenalan'>Sesi Perkenalan</div>
            </a>
          </li>
          <li className={`menu-item ${currentPath === '/admin/interest-program' ? 'active' : ''}`}>
            <a
              href='/admin/interest-program'
              className='menu-link'
            >
              <div data-i18n='Interest Program'>Interest Program</div>
            </a>
          </li>
        </ul>
      </li>
      {/* Layouts */}
      {/* <li className='menu-header small text-uppercase'>
        <span className='menu-header-text'>Pages</span>
      </li>
      <li className={`menu-item ${currentPath === '/admin/parents' ? 'active' : ''}`}>
        <a
          href='/admin/parents/'
          className='menu-link'
        >
          <i className='menu-icon tf-icons bx bxs-user' />
          <div data-i18n='Parent'>Parent</div>
        </a>
      </li>
      <li className={`menu-item ${currentPath === '/admin/students' ? 'active' : ''}`}>
        <a
          href='/admin/students'
          className='menu-link'
        >
          <i className='menu-icon tf-icons bx bxs-book-alt' />
          <div data-i18n='Student'>Student</div>
        </a>
      </li>
      <li className={`menu-item ${currentPath === '/admin/invoices' ? 'active' : ''}`}>
        <a
          href='/admin/invoices'
          className='menu-link'
        >
          <i className='menu-icon tf-icons bx bxs-wallet' />
          <div data-i18n='Documentation'>Invoice</div>
        </a>
      </li> */}
    </ul>
  </aside>
  );
}

export default Sidebar;
