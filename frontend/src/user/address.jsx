import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBTypography, MDBBtn } from 'mdb-react-ui-kit';
import getapicountry from '../module/getapicountry';
import { PostAddress } from '../module/postaddress';
import GetAddressShip from '../module/getAddressShip';
import { DeleteAddress } from '../module/deleteAddress';

function Address({ offaddress ,onAddAddress }) {
    const [countries, setCountries] = useState([]);
    const [showaddaddress, setShowaddaddress] = useState(true);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const { addressship } = GetAddressShip();
    const [listaddressship, setListaddressship] = useState([]);
    
    const submitDeleteAddress = async (idaddress) => {
        try {
            await DeleteAddress({ idaddress: idaddress });
            // Update the list of addresses after deletion
            setListaddressship(addressship.filter(item => item._id !== idaddress));
        } catch (error) {
            console.error(error);
        }
    };
    
    const submitaddaddress = async (e) => {
        e.preventDefault();
        setShowaddaddress(!showaddaddress);
    }
    
    const handlePostAddress = async () => {
        console.log(address, city, postalCode, country);
        try {
            if (address && city && postalCode && country) {
                await PostAddress({
                    address: address,
                    city: city,
                    postalCode: postalCode,
                    country: country
                }); 
                onAddAddress();
            } else {
                console.error('Missing address information');
            }
        } catch (error) {
            console.error(error);
        };
        
    };
    const fetchCountries = async () => {
        const countryData = await getapicountry();
        setCountries(countryData);
        setListaddressship(addressship);
    };
    useEffect(() => {
        fetchCountries();
    }, [addressship]);

    return (
        <section style={{ backgroundColor: 'none', padding: '0', background: 'none' }}>
            <MDBContainer >
                <MDBRow className="justify-content-center align-items-center">
                    <MDBCol style={{ backgroundColor: 'none', minWidth: '1000px', padding: '0' }} lg="6">
                        <MDBCard className="mb-3 p-2" style={{ borderRadius: '.5rem', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', border: 'black solid 1px' }}>
                            <div style={{ width: '100%', position: 'absolute' }}>
                                <MDBBtn className="btn-close d-flex justify-content-end mr-4" color="none" aria-label="Close" onClick={offaddress} style={{ float: 'right' }} />
                            </div>
                            <MDBRow className="g-0 d-flex justify-center items-center">
                                <MDBCol style={{ maxWidth: '800px' }}>
                                    <MDBCardBody className="p-0 d-flex flex-column items-center justify-center">
                                        <MDBTypography tag="h5" className='pt-3 pb-2 text-gray-600 border-bottom w-full text-center'>Danh Sách địa chỉ giao hàng</MDBTypography>
                                        <div className=' pr-5 w-full border-bottom' style={{ maxHeight: '400px', overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                            <div className=''>
                                                {listaddressship.length > 0 ? (
                                                    listaddressship.map((item, index) => (
                                                        <div key={index} className='w-full m-2 p-2 rounded d-flex justify-content-between flex-row' style={{ border: 'black solid 1px' }}>
                                                            <div className='d-flex flex-column'>
                                                                <div>Địa chỉ : {item.street}</div>
                                                                <div>Thành phố : {item.city}</div>
                                                                <div>Quốc gia : {item.countries}</div>
                                                                <div>Mã bưu điện : {item.apartment}</div>
                                                            </div>
                                                            <div style={{ float: 'right' }} className='d-flex items-center justify-center'>
                                                                <button onClick={() => {
                                                                    submitDeleteAddress(item._id);
                                                                }} className='btn btn-outline-danger'>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                    </svg>
                                                                </button>


                                                            </div>

                                                        </div>
                                                    ))
                                                ) : (
                                                    <div>danh sách rỗng</div>
                                                )}
                                            </div>
                                        </div>

                                        {showaddaddress ? <></> :
                                            <button onClick={submitaddaddress} className='btn btn-success mt-2' style={{ width: '40px', height: '40px' }}>+</button>
                                        }
                                    </MDBCardBody>
                                </MDBCol>
                                {showaddaddress ?
                                    <MDBCol md="5" className='border-start d-flex flex-row'>
                                        <div className='h-full d-flex justify-center items-center'>
                                            <button onClick={submitaddaddress} className='h-20 d-flex justify-center items-center p-2 btn btn-outline-success' >
                                                {'<'}
                                            </button>
                                        </div>

                                        <MDBCardBody className="p-0 d-flex flex-column items-center justify-center">
                                            <MDBTypography tag="h5" className='pt-3 pb-2 text-gray-600'>Địa chỉ giao hàng</MDBTypography>
                                            <div className='w-full p-5 pt-2 pb-2'>
                                                <div className="form-group mb-2 bd-highlight">
                                                    <MDBTypography tag="h6">Địa chỉ giao hàng:</MDBTypography>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="address"
                                                        placeholder="nhập địa chỉ giao hàng"
                                                        required
                                                        value={address}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group mb-2 bd-highlight pb-2">
                                                    <MDBTypography tag="h6">Quốc gia:</MDBTypography>
                                                    <Select
                                                        options={countries.map(country => ({ value: country.name, label: country.name }))}
                                                        id="country"
                                                        placeholder="Chọn quốc gia"
                                                        value={{ label: country, value: country }}
                                                        onChange={(selectedOption) => setCountry(selectedOption.label)}
                                                    />
                                                </div>
                                                <div className="form-group mb-2 bd-highlight">
                                                    <MDBTypography tag="h6">Thành phố:</MDBTypography>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="city"
                                                        placeholder="nhập thành phố"
                                                        required
                                                        value={city}
                                                        onChange={(e) => setCity(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group mb-3 bd-highlight">
                                                    <MDBTypography tag="h6">Mã bưu điện:</MDBTypography>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="postalCode"
                                                        placeholder="nhập mã bưu điện"
                                                        required
                                                        value={postalCode}
                                                        onChange={(e) => setPostalCode(e.target.value)}
                                                    />
                                                </div>

                                            </div>
                                            <button onClick={(e) => { handlePostAddress()}} className='btn btn-success mb-3'>Thêm</button>
                                        </MDBCardBody>
                                    </MDBCol>
                                    : <></>}
                            </MDBRow>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section >
    );
};

export default Address;
