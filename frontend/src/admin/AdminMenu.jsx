import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { FaBars, FaShoppingCart, FaBell } from 'react-icons/fa';
import ProfileAdmin from './ProfileAdmin';
import useProfile from '../module/profile.module';
import Authmodule from '../module/authmodule';

function AppNavbar() {
  const [showprofile, setShowprofile] = useState(false);
  const { profile } = useProfile()
  const { handleLogout } = Authmodule()
  const submitshowprofile = async (e) => {
    e.preventDefault();
    setShowprofile(!showprofile);
  }

  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get('page');
  return (
    <Navbar expand="lg" className='border shadow bg-body rounded' bg="body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="navbarSupportedContent">
          <FaBars />
        </Navbar.Toggle>
        <Navbar.Collapse id="navbarSupportedContent" className='h-14'>
          <Nav className="me-auto mb-2 mb-lg-0">
            <Nav.Link className='border-end' href="/admin">Trang Chủ</Nav.Link>
            <Nav.Link className='border-end' href="/admin/listaccounts">Quản Lý Tài Khoản</Nav.Link>
            <Nav.Link className='border-end' href="/admin/listproducts">Sản Phẩm Cần Duyệt</Nav.Link>
            <Nav.Link href="/admin/listproducttypes">Quản Lý Loại</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center">
            <a className="text-reset me-3" href="#">
              <FaShoppingCart />
            </a>
            {/* <Dropdown>
              <Dropdown.Toggle className="text-reset me-3 hidden-arrow" id="navbarDropdownMenuLink">
                <FaBell />
                <span className="badge rounded-pill badge-notification bg-danger">1</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Some news</Dropdown.Item>
                <Dropdown.Item href="#">Another news</Dropdown.Item>
                <Dropdown.Item href="#">Something else here</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
            <Dropdown>
              <Dropdown.Toggle className="dropdown-toggle d-flex align-items-center hidden-arrow" id="navbarDropdownMenuAvatar">
                <img src={'http://localhost:5000' + profile.avatar} style={{}} className="rounded-circle h-12 aspect-square" alt="Avatar" loading="lazy" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={submitshowprofile} href="#">My profile</Dropdown.Item>
                {/* <Dropdown.Item href="#">Settings</Dropdown.Item> */}
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Container>
      {
        showprofile ?
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999, background: 'none', padding: '0px' }}
          ><ProfileAdmin offprofile={submitshowprofile} profile={profile} />

          </div>
          : ''
      }
    </Navbar>
  );
}

export default AppNavbar;
