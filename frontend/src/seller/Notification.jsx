import React, { useEffect, useState } from 'react';
import styles from './css/Notification.module.css'; // Import CSS module

const Notification = ({ notifications }) => {
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    setVisibleNotifications(notifications.slice(0, 3)); // Hiển thị tối đa 3 thông báo
  }, [notifications]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleNotifications((prevNotifications) => prevNotifications.slice(1)); // Xóa thông báo cũ nhất sau một khoảng thời gian
    }, 3500); // 3.5 seconds to include fadeOut animation time
    return () => clearTimeout(timer);
  }, [visibleNotifications]);

  return (
    <div className={styles.notificationContainer}>
      {visibleNotifications.map((notification, index) => (
        <div key={index} className={styles.notification}>
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default Notification;

