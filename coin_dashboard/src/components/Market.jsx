import { useEffect, useState } from "react";

import Coin from "./Coin"
import axios from "axios";
import { useCurrency } from "./CurrencyContext";
import { Link } from "react-router-dom"
import { TrendingDown, TrendingUp } from "../icons/icon"
import { currencyFormat } from "../utils"

const Market = () => {
const [currentPage, setCurrentPage] = useState(1);
const [data,setdata]=useState([])
const { currency } = useCurrency(); // Get currency from context
const [searchquery,setSearchquery]=useState('')
const[searchrelatedData,setSearchrelatedData]=useState([])


useEffect(()=>{
  axios({
    method:"GET",
    url:`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=${currentPage}&sparkline=false&locale=en`
  }).then((res)=>{
    console.log(res.data)
     setdata(res.data)
  })
},[currentPage,currency])






const  Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <div className="flex justify-center space-x-1 mt-4">
      {currentPage > 1 && (
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Previous
        </button>
      )}
      {/* Display current page number and total pages */}
      <span className="px-4 py-2 bg-gray-300 rounded">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Next
        </button>
      )}
    </div>
  );
};
useEffect(()=>{

  axios({
    url:`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false&locale=en`,
    method:"GET"

  }).then((res)=>{
    console.log(res.data)

    setSearchrelatedData(res.data)
  })


},[])



const handleSearch = (e) => {
  e.preventDefault(); // Prevent default form submission
  if (searchquery) {
    const filteredData = searchrelatedData.filter(item => 
      item.name.toLowerCase().includes(searchquery.toLowerCase())
    );
    setdata(filteredData);
  } else {
    // If search query is empty, show the original data
    setdata(searchrelatedData);
  }
};



 
  return (
   <section className="mt-8">
   <h1 className="text-2xl mb-2">Markets</h1>

   <form className="d-flex" onSubmit={handleSearch}>
     <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchquery} onChange={(e) => setSearchquery(e.target.value)}/>
     <button className="btn btn-outline-success" type="submit">Search</button>
</form>

  

<div>
  {data && data.map(coin => <Coin key={coin.id} coin={coin} currency={currency}/>)}
  <Pagination
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}
    totalPages={10} // Adjust this as needed
  />
</div>

   
   
   </section>
  )
}

export default Market