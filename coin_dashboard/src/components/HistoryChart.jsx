import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCurrency } from './CurrencyContext';
import ReactECharts from 'echarts-for-react';


import axios from 'axios';
import moment from 'moment';

const HistoryChart = ({ coinId }) => {
  const { id } = useParams();
  const { currency } = useCurrency();
  const [coinChartData, setCoinChartData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(7);
  const [coinChartDatamarket, setcoinChartDatamarket] = useState([])
  const [coinChartDatavolume, setcoinChartDatavalume] = useState([])
  const [coinChartDatacaddle, setcoinChartDatacaddle] = useState([])
  const [caddleshow,setcaddleshow]=useState(false)

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: currency,
        days: selectedOption,
      }
    }).then((res) => {
      const formattedData = res.data.prices.map(([date, value]) => {
        return {
          name: moment(date).format('YYYY-MM-DD'),
          value: [moment(date).format('YYYY-MM-DD'), value]
        };
      });

      const formattedData1 = res.data.market_caps.map(([date, value]) => {
        return {
          name: moment(date).format('YYYY-MM-DD'),
          value: [moment(date).format('YYYY-MM-DD'), value]
        };
      });
      const formattedData2 = res.data.total_volumes.map(([date, value]) => {
        return {
          name: moment(date).format('YYYY-MM-DD'),
          value: [moment(date).format('YYYY-MM-DD'), value]
        };
      });
      setcoinChartDatavalume(formattedData2)
      setcoinChartDatamarket(formattedData1)
      setCoinChartData(formattedData);
    }).catch((error) => {
      console.error('Error fetching data: ', error);
    });

    axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/ohlc`, {
      params: {
        vs_currency: currency,
        days: selectedOption,
      }
    }).then((res) => {
      const formattedData = res.data.map(entry => {
        return [
          moment(entry[0]).format('YYYY-MM-DD'), // Convert timestamp to readable date
          entry[1], // Open
          entry[2], // High
          entry[3], // Low
          entry[4]  // Close
        ];
      });
      setcoinChartDatacaddle(formattedData)
    })



  }, [currency, id, selectedOption]);




  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const getOption = () => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        data: ['Price', 'Market Cap', 'Volume']
      },
      xAxis: {
        type: 'time',
        boundaryGap: false
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Price',
          data: coinChartData.map(item => item.value),
          type: 'line',
          areaStyle: {},
          color: '#FF5733'
        },
        {
          name: 'Market Cap',
          data: coinChartDatamarket.map(item => item.value),
          type: 'line',
          areaStyle: {},
          color: '#33FF57'
        },
        {
          name: 'Volume',
          data: coinChartDatavolume.map(item => item.value),
          type: 'line',
          areaStyle: {},
          color: '#3357FF'
        }
      ]
    };
  };
  



  const getOption1 = () => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      xAxis: {
        type: 'category',
        data: coinChartDatacaddle.map(entry => entry[0])
      },
      yAxis: {
        type: 'value',
        scale: true // Scale the yAxis
      },
      series: [
        {
          name: 'Candlestick',
          type: 'candlestick',
          data: coinChartDatacaddle.map(entry => entry.slice(1))
        }
      ]
    };
  };


  return (
    <>


    <div>
      <div className="flex justify-between">
        <select value={selectedOption} onChange={handleDropdownChange} className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium mt-5">
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="365">Last 365 Days</option>
        </select>
        <div>
          <label class="switch text-white rounded-md px-3 py-2 text-sm font-medium mt-5" >
            <input type="checkbox"  onClick={()=>setcaddleshow(!caddleshow)} />
            <span class="slider round"></span>
          </label>
        </div>

      </div>
{ caddleshow ?<ReactECharts option={getOption()} />:<ReactECharts option={getOption1()}/>}
    </div>
    </>
  );
};

export default HistoryChart;
