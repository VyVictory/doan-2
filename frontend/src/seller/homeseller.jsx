import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Homeseller = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [salesByDate, setSalesByDate] = useState([]);
  const [salesData, setSalesData] = useState({});
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    const fetchTotalOrders = async () => {
      try {
        const response = await axios.get('/api/orders/countTotalOrders', { withCredentials: true });
        setTotalOrders(response.data.totalOrders);
      } catch (error) {
        console.error('Error fetching total orders:', error);
      }
    };

    const fetchTotalSales = async () => {
      try {
        const response = await axios.get('/api/orders/calculateTotalSales', { withCredentials: true });
        setTotalSales(response.data.totalSales);
      } catch (error) {
        console.error('Error fetching total sales:', error);
      }
    };

    const fetchSalesByDate = async () => {
      try {
        const response = await axios.get('/api/orders/calculateTotalSalesByDate', {
          params: { month, year },
          withCredentials: true,
        });
        setSalesByDate(response.data);
        const dates = response.data.map(item => item._id);
        const sales = response.data.map(item => item.totalSales);
        setSalesData({
          labels: dates,
          datasets: [
            {
              label: 'Doanh thu theo ngày',
              data: sales,
              fill: false,
              backgroundColor: 'rgb(75, 192, 192)',
              borderColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching sales by date:', error);
      }
    };

    fetchTotalOrders();
    fetchTotalSales();
    fetchSalesByDate();
  }, [month, year]);

  return (
    <div className="dashboard-container" style={{ padding: '20px' }}>
      <div className='container'>
        <h1>Thống kê</h1>
        <div>
          <h2>Tổng số đơn hàng: {totalOrders}</h2>
          <h2>Tổng doanh thu: {totalSales}</h2>
        </div>
        <div>
          <h3>Doanh thu theo ngày:</h3>
          <div>
            <label>Chọn tháng: </label>
            <input
              type="number"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="Tháng"
            />
            <label>Chọn năm: </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Năm"
            />
          </div>
          {salesData.labels && (
            <Line data={salesData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Homeseller;
