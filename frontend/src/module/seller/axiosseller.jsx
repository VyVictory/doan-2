import { useState, useEffect } from 'react';
import axios from 'axios';

const useProductData = () => {
    const [checklogseller, setIsTokenExist] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token && token !== '') {
        setIsTokenExist(true);
      } else {
        setIsTokenExist(false);
      }
    }, []); // useEffect này chạy chỉ một lần khi component mount
  

    return { checklogseller};
};

export default useProductData;
