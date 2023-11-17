import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoIcon, Reload } from "../icons/icon";
import { useCurrency } from "./CurrencyContext";
function Navbar() {
  const { currency, setCurrency } = useCurrency();
  const [dropdownOpen, setDropdownOpen] = useState(false);
 
  const navigate = useNavigate();
  const currencies = [  "btc",
  "eth",
  "ltc",
  "bch",
  "bnb",
  "eos",
  "xrp",
  "xlm",
  "link",
  "dot",
  "yfi",
  "usd",
  "aed",
  "ars",
  "aud",
  "bdt",
  "bhd",
  "bmd",
  "brl",
  "cad",
  "chf",
  "clp",
  "cny",
  "czk",
  "dkk",
  "eur",
  "gbp",
  "hkd",
  "huf",
  "idr",
  "ils",
  "inr",
  "jpy",
  "krw",
  "kwd",
  "lkr",
  "mmk",
  "mxn",
  "myr",
  "ngn",
  "nok",
  "nzd",
  "php",
  "pkr",
  "pln",
  "rub",
  "sar",
  "sek",
  "sgd",
  "thb",
  "try",
  "twd",
  "uah",
  "vef",
  "vnd",
  "zar",
  "xdr",
  "xag",
  "xau",
  "bits",
  "sats"]; // Add more currencies as needed

  const handleCurrencySelect = (currency) => {
    setCurrency(currency); 
    setDropdownOpen(false);
  };
  
  

  return (
    <div className="bg-gray-800 text-white h-14 flex items-center" >
      <div className="wrapper-container w-full">
        <div className="flex items-center justify-between gap-1 cursor-pointer">
        <div className="flex gap-2">
          <LogoIcon />
          <p className="font-semibold" onClick={() => navigate('/')}>
            <span className="text-yellow-500">C</span>rypto <span className="text-yellow-500">U</span>pdate
          </p>
          </div>
        
          <div className="relative">
           <span>Select Currency</span> 
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="ml-4 py-2 px-3 bg-gray-700 rounded-md">
              {currency} 
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20 "  style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {currencies.map((currency) => (
                  <a 
                    href="#" 
                    key={currency} 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleCurrencySelect(currency)}
                  >
                    {currency}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
