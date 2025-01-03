import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


const MENU_ITEMS = [
  { path: '/admin/dashboard', label: 'Summary', dataI18n: 'Analytics' },
  { path: '/admin/sp', label: 'Sesi Perkenalan', dataI18n: 'Without menu' },
  { path: '/admin/daftar-peserta-sp', label: 'Daftar Peserta SP', dataI18n: 'Without navbar' },
  { path: '/admin/daftar-hadir-sp', label: 'Daftar Hadir SP', dataI18n: 'Without navbar' },
  { path: '/admin/interest', label: 'Interest Program', dataI18n: 'Fluid' },
  
];

const MenuItem = ({ path, label, dataI18n, isActive }) => (
  <li className={`menu-item ${isActive ? 'active' : ''}`}>
    <Link to={path} className="menu-link">
      <div data-i18n={dataI18n}>{label}</div>
    </Link>
  </li>
);
const Sidebar = () => {
  const [isLcmOpen, setIsLcmOpen] = useState(false);
  const location = useLocation();

  const toggleMrlc = (e) => {
    e.preventDefault();
    setIsLcmOpen((prev) => !prev);
  };

  // Menandai apakah salah satu path di MENU_ITEMS aktif
  const isPathActive = (path) => location.pathname === path;
  const isMrlcActive = 
    location.pathname.includes('/admin/dashboard') ||
    location.pathname.includes('/admin/sp') ||
    location.pathname.includes('/admin/daftar-peserta-sp') ||
    location.pathname.includes('/admin/interest') ||
    location.pathname.includes('/admin/daftar-hadir-sp');
  return (
    <aside id='layout-menu' className='layout-menu menu-vertical menu bg-menu-theme'>
      <div className='app-brand demo text-lg'>
        <a href='/admin/dashboard' className='app-brand-link'>
          <span className='app-brand-logo demo'>
            <img src='/assets/img/icons/LOGO-07.png' alt='Logo' style={{ width: '25px' }} />
          </span>
          <span className='text-lg demo menu-text fw-bolder ms-2' style={{ fontSize: '20px' }}>
            LifeCamp
          </span>
        </a>
        <a href='/admin/dashboard' className='layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none'>
          <i className='bx bx-chevron-left bx-sm align-middle' />
        </a>
      </div>
      <div className='menu-inner-shadow' />
    
      <ul className="menu-inner py-1">
        <li className={`menu-item ${isMrlcActive ? 'active open' : ''}`}>
          <a href="/" className="menu-link menu-toggle" onClick={toggleMrlc}>
            <i className="menu-icon tf-icons bx bx-home-circle" />
            <div data-i18n="Layouts">Life Camp</div>
          </a>
          <ul className={`menu-sub ${isLcmOpen || isMrlcActive ? 'active' : ''}`}>
            {MENU_ITEMS.map((item) => (
              <MenuItem key={item.path} {...item} isActive={isPathActive(item.path)} />
            ))}
          </ul>
        </li>
      </ul>

    {/* <ul className='menu-inner py-1'>
       <li className={`menu-item ${(currentPath === '/admin/sesi-perkenalan' || currentPath === '/admin/interest-program' ||currentPath === '/admin/daftar-peserta-sp' || currentPath === '/admin/dashboard') ? 'active open' : ''}`}>
        <a href='' className='menu-link menu-toggle'>
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
    </ul> */}
  </aside>
  );
}

export default Sidebar;
