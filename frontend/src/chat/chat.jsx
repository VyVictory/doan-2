
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { X } from 'react-bootstrap-icons'; // Thêm thư viện react-bootstrap-icons
import styler from './chat.module.css';
const ChatBubble = () => {
    const [showChat, setShowChat] = useState(false);
    const [bubblechat, setBubblechat] = useState(true);
    const [position, setPosition] = useState({ top: 'auto', bottom: '20px', right: '20px', left: 'auto' });

    const handleToggleChat = () => setShowChat(!showChat);
    const coverclose = () => setBubblechat(!showChat);

    useEffect(() => {
        coverclose()
    }, []);
    const handleCloseChat = () => setShowChat(false);
    //onClick={handleToggleChat}  close table chat
    return (
        <div>
            {showChat ? <></> : <div
                className="chat-bubble" onClick={handleToggleChat}
                style={{
                    position: 'fixed', bottom: '20px', right: '20px', left: 'aotu', width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#007bff', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', cursor: 'pointer', zIndex: 1000
                }}
            >
                Chat
            </div>}
            {showChat ?
                <div className="chat-bubble border shadow-lg bg-body rounded"
                    style={{
                        position: 'fixed', bottom: '1px', right: '20px', left: 'aotu', width: '600px', height: '600px', borderRadius: '10px', backgroundColor: '#007bff', zIndex: 1000
                    }}>
                    <div>
                        <button onClick={handleToggleChat} className='btn btn-danger m-1' style={{ float: 'right' }}>X</button>
                    </div>

                </div>
                : <></>}
        </div >
    );
};

export default ChatBubble;
