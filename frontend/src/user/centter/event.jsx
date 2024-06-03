import React, { useState, useEffect } from 'react';

function Event() {
  // State để kiểm soát việc hiển thị của hai events
  const [showEvent1, setShowEvent1] = useState(true);
  const [showEvent2, setShowEvent2] = useState(false);

  // Effect để chuyển từ Event 1 sang Event 2 sau 6 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEvent1(false);
      setShowEvent2(true);
    }, 6000); // 6 giây

    // Xóa timer khi component unmount (tránh memory leak)
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="Event">
      {showEvent1 && (
        <div>
          <h1>Event 1</h1>
          {/* Nội dung của Event 1 */}
        </div>
      )}

      {showEvent2 && (
        <div >
          <h1>Event 2</h1>
          {/* Nội dung của Event 2 */}
        </div>
      )}
    </div>
  );
}

export default Event;
