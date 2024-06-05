import React, { useState } from 'react';
import profileModule from '../module/profile.module';
import img_avt from '../user/imguser/bar/user.png';
const UserAvatarName = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { profile } = profileModule();
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
      style={{ ...buttonStyle, "height": "40px", "paddingLeft": "12px", paddingBottom: '0px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={img_avt} style={{ "height": "30px", "marginLeft": "-4px" }} alt="Avatar" />
      <div style={{ "minWidth": "100px" ,paddingBottom:'5px'}}>
        {profile.fullname}
      </div>
    </button>
  );
};

export default UserAvatarName;