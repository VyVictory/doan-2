import React, { useState } from 'react';
import img_avt from '../user/imguser/bar/user.png';
const UserAvatarName = ({ profile }) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonStyle = {
    backgroundColor: 'transparent',
    border: '0',
    borderRadius: '10px',
    transition: 'all 0.3s ease',
    ...(isHovered && {
      backgroundColor: 'gainsboro',
      transform: 'scale(1.1)'
    })
  };

  return (
    <button 
      type='submit' 
      className="d-flex flex-row items-center" 
      style={{ ...buttonStyle, "height": "40px", "paddingLeft": "12px", paddingLeft: '10px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={'http://localhost:5000'+profile.avatar||img_avt} style={{ "height": "40px",width:'40px', "marginLeft": "-4px",border: '3px solid rgb(194, 225, 255)', borderRadius: '50%'  }} alt="Avatar" />
      <div style={{ "minWidth": "100px" ,padding:'0px'}}>
      {profile.fullname}
      </div>
    </button>
  );
};

export default UserAvatarName;
