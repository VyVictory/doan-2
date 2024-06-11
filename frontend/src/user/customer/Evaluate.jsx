import React, { useState } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import start from '../imguser/bar/star.png'
import startyellow from '../imguser/bar/star(1).png'
import axios from 'axios';
function Evaluate({ idproduct, item, offevalute }) {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    console.log(idproduct);

    const handleRatingChange = (value) => {
        // If the selected star is the fifth one, set rating to 5

        setRating(value);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            const response = axios.post(`http://localhost:5000/api/products/${idproduct}/reviews`, {
                "rating": rating + 1,
                "comment": comment
            },
                { withCredentials: true }
            );
            console.log('Response:', response.data);
           // alert('đánh giá thành công')
           // window.location.href='/customer/historybuyandsell'
        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <div className="modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
            alignItems: 'center', justifyContent: 'center'
        }}>
            <div className="modal-content" style={{
                backgroundColor: 'white', padding: '20px', borderRadius: '8px',
                width: '60%', maxWidth: '800px'
            }}>
                <div >
                    <MDBBtn className="btn-close d-flex justify-content-end" color="none" aria-label="Close" onClick={offevalute} style={{ float: 'right' }} />
                </div>
                <h2>Đánh Giá Sản Phẩm</h2>
                <div className="mt-2 mb-2 rounded d-flex flex-row bd-highlight items-center" style={{ backgroundColor: '#e0e0e0', width: '100%', height: '40px' }}>
                    <div className='d-flex justify-center' style={{ width: '22%' }}>
                        Hình
                    </div>
                    <div className='d-flex justify-center mr-2' style={{ width: '16%' }}>
                        Tên sản phẩm
                    </div>
                    <div className='d-flex justify-center' style={{ width: '20%' }}>
                        Giá
                    </div>
                    <div className='d-flex justify-center' style={{ width: '15%' }}>
                        Số lượng
                    </div>
                    <div className='d-flex justify-center' style={{ width: '20%' }}>
                        Tổng tiền
                    </div>
                </div>
                <div className='d-flex flex-row items-center' style={{ backgroundColor: '#f5f5f5', width: '100%' }}>
                    <div className="item mt-2 mb-2 rounded d-flex flex-row bd-highlight items-center p-2" style={{ width: '40%', height: 'auto' }}>
                        <div className='h-140 d-flex flex-row items-center' style={{ height: '140px' }}>
                            <div className='mr-2 d-block' style={{ width: '160px' }}>
                                <img
                                    style={{ maxHeight: '140px', maxWidth: '160px' }}
                                    src={'http://localhost:5000' + item.image || ''}
                                    alt={item.name}
                                    className="p-1"
                                />
                            </div>
                            <div className="card-text h-8" style={{
                                width: '130px',
                                fontSize: '12px',
                                textAlign: 'left',
                                WebkitLineClamp: '2',
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                margin: '0',
                                wordWrap: 'break-word'
                            }}>
                                {item.name}
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-center' style={{ width: '20%' }}>
                        {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<span className=' text-orange-1000' style={{ verticalAlign: "super" }}>đ</span>
                    </div>
                    <div className='d-flex justify-center' style={{ width: '15%' }}>
                        {item.quantity}
                    </div>
                    <div className='d-flex justify-center' style={{ width: '20%' }}>
                        {(item.price * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<span className=' text-orange-1000' style={{ verticalAlign: "super" }}>đ</span>
                    </div>
                </div>
                <div className='d-flex justify-center items-center flex-column w-full'>
                    <div className="form-group h-16 m-2 d-flex flex-row">
                        {/* Display star images for rating selection */}
                        {[...Array(5)].map((_, index) => (
                            <div
                                className='mr-2'
                                key={index}
                                style={{ cursor: 'pointer', fontSize: '24px' }}
                                onClick={() => handleRatingChange(index)}
                            >
                                {index <= rating ?
                                    <img className='w-16 h-16' src={startyellow}></img>
                                    :
                                    <img className='w-16 h-16' src={start}></img>
                                }
                            </div>
                        ))}
                    </div>
                    <div className="form-group">
                        <label>Nội dung đánh giá:</label>
                        <textarea
                            className='border'
                            value={comment}
                            onChange={handleCommentChange}
                            rows="4"
                            cols="50"
                        />
                    </div>
                    <button className='btn btn-danger' onClick={handleSubmit} type="submit">Đánh Giá</button>
                </div>
            </div>
        </div>
    );
}

export default Evaluate;
