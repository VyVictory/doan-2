import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBTypography, MDBBtn } from 'mdb-react-ui-kit';
import getapicountry from '../module/getapicountry';

function Address({ offaddress }) {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [showaddaddress, setShowaddaddress] = useState(false);
    const submitaddaddress = async (e) => {
        e.preventDefault();
        setShowaddaddress(!showaddaddress);
    }
    useEffect(() => {
        const fetchCountries = async () => {
            const countryData = await getapicountry();
            setCountries(countryData);
        };
        fetchCountries();
    }, []);

    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
        // Fetch cities for the selected country (you need to implement this logic)
        // For now, I'll just set some dummy cities
        setCities(['City 1', 'City 2', 'City 3']);
    };

    const handleCityChange = (selectedOption) => {
        setSelectedCity(selectedOption);
    };

    return (
        <section style={{ backgroundColor: 'none', padding: '0', background: 'none' }}>
            <MDBContainer >
                <MDBRow className="justify-content-center align-items-center">
                    <MDBCol style={{ backgroundColor: 'none', minWidth: '1000px', padding: '0' }} lg="6">
                        <MDBCard className="mb-3 p-2" style={{ borderRadius: '.5rem', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', border: 'black solid 1px' }}>
                            <div style={{ width: '100%', position: 'absolute' }}>
                                <MDBBtn className="btn-close d-flex justify-content-end mr-4" color="none" aria-label="Close" onClick={offaddress} style={{ float: 'right' }} />
                            </div>
                            <MDBRow className="g-0">
                                <MDBCol >
                                    <MDBCardBody className="p-0 d-flex flex-column items-center justify-center">
                                        <MDBTypography tag="h5" className='pt-3 pb-2 text-gray-600 border-bottom w-full text-center'>Danh Sách địa chỉ giao hàng</MDBTypography>
                                        <div className='p-2 mb-2 text-green-500'>
                                            danh sách rỗng
                                        </div>
                                        {showaddaddress ? <></> :
                                            <button onClick={submitaddaddress} className='btn btn-success' style={{ width: '40px', height: '40px' }}>+</button>
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
                                                    />
                                                </div>
                                                <div className="form-group mb-2 bd-highlight pb-2">
                                                    <MDBTypography tag="h6">Quốc gia:</MDBTypography>
                                                    <Select

                                                        options={countries.map(country => ({ value: country.name, label: country.name }))}
                                                        onChange={handleCountryChange}
                                                        placeholder="Chọn quốc gia"
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
                                                    />
                                                </div>
                                                <div className="form-group mb-3 bd-highlight">
                                                    <MDBTypography tag="h6">Mã bưu điện:</MDBTypography>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="postcode"
                                                        placeholder="nhập mã bưu điện"
                                                        required
                                                    />
                                                </div>

                                            </div>
                                            <button onClick={submitaddaddress} className='btn btn-success mb-3'>Thêm</button>
                                        </MDBCardBody>
                                    </MDBCol>
                                    : <></>}

                            </MDBRow>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
};

export default Address;
