import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Homeseller = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [salesByDate, setSalesByDate] = useState([]);
  const [salesData, setSalesData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchTotalOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/total-orders', { withCredentials: true });
        setTotalOrders(response.data.totalOrders);
      } catch (error) {
        console.error('Error fetching total orders:', error);
      }
    };

    const fetchTotalSales = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/total-sales', { withCredentials: true });
        setTotalSales(response.data.totalSales);
      } catch (error) {
        console.error('Error fetching total sales:', error);
      }
    };

    const fetchSalesByDate = async () => {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1; // Month is zero-based
      try {
        const response = await axios.get('http://localhost:5000/api/orders/total-sales-by-date', {
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
  }, [selectedDate]);

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
            <label>Chọn tháng và năm: </label>
            <input
              type="month"
              value={selectedDate.toISOString().slice(0, 7)} // Format: "YYYY-MM"
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              placeholder="Tháng và năm"
            />
          </div>
          {salesData.labels && (
            <Bar
              data={salesData}
              options={{
                scales: {
                  x: {
                    grid: {
                      display: false
                    }
                  },
                  y: {
                    beginAtZero: true
                  }
                },
                plugins: {
                  legend: {
                    display: true,
                    position: 'top'
                  }
                },
                layout: {
                  padding: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10
                  }
                },
                barPercentage: 0.1 // 10% width of bars
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Homeseller;
