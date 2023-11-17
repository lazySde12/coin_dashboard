
import axios from "axios";
import useAxios from "../hooks/useAxios"
import CointTreanding from "./CointTreanding";
import Skelenton from "./Skelenton";

import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from "react";
import HistoryChart from "./HistoryChart";
import CryptoDetails from "../pages/CryptoDetails";
function Treanding() {
const[globaldata,setglObaldata]=useState([])


useEffect(()=>{
axios({
  url:"https://api.coingecko.com/api/v3/global",
  method:"GET"
}).then((res)=>{
  const formattedCryptoData = Object.entries(res.data.data.market_cap_percentage).map(([name, value]) => ({
    name: name.toUpperCase(), // Capitalize the cryptocurrency names
    value
  }));
    setglObaldata(formattedCryptoData)
})

},[])


 const option = {
  title: {
    text: 'Market_Cap_Percentage',

    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
   
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
        data: globaldata
      }
    ]
  };
    const {response,loading}=useAxios("search/trending");
    console.log(response)
    if(loading){
        return(
            <div className="wrapper-container mt-8">
             <Skelenton className={"h-8 w-32"} />
             <Skelenton className={"h-8 w-full mt-2"} />
             <Skelenton className={"h-8 w-full mt-2"} />
             <Skelenton className={"h-8 w-full mt-2"} />
             <Skelenton className={"h-8 w-full mt-2"} />
            </div>
        )
    }
  return (
    <div className="grid md:grid-cols-2 gap-4 mt-8">
    {/* Trending Items Section */}
    <div>
        <h1 className="text-2xl mb-2">Trending</h1>
        {
            response && response.coins.map(coin => (
                <CointTreanding key={coin.item.coin_id} coin={coin.item} />
            ))
        }
    </div>

    {/* Pie Chart Section */}
    
    <div className="mt-4">
        <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />
    </div>
    


</div>
  )
}

export default Treanding
