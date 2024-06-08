import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBTypography, MDBBtn } from 'mdb-react-ui-kit';
import getapicountry from '../module/getapicountry';
import { PostAddress } from '../module/postaddress';
//import GetAddressShip from '../module/getAddressShip';

function Address({ offaddress }) {
    const [countries, setCountries] = useState([]);
    const [showaddaddress, setShowaddaddress] = useState(false);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    // const {addressship} =GetAddressShip()

    const submitaddaddress = async (e) => {
        e.preventDefault();
        setShowaddaddress(!showaddaddress);
    }
    const handlePostAddress = async () => {
        try {
            // Truyền các giá trị state vào hàm PostAddress
            await PostAddress({
                address: address,
                city: city,
                postalCode: postalCode,
                country: country
            });
          //  window.alert('Thêm địa chỉ thành công!');
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        const fetchCountries = async () => {
            const countryData = await getapicountry();
            setCountries(countryData);
        };
        fetchCountries();
    }, []);

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
                                            {/* {addressship.length > 0 ? (
                                                addressship.map((item, index) => (
                                                    <div key={index} className='w-full border m-2'>
                                                        <div>{item.address}</div>
                                                        <div>{item.city}</div>
                                                        <div>{item.postalCode}</div>
                                                        <div>{item.country}</div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div>danh sách rỗng</div>
                                            )} */}
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
                                            <button onClick={(e) => { submitaddaddress(e); handlePostAddress(); }} className='btn btn-success mb-3'>Thêm</button>
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
