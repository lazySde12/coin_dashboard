import CoinDetail from "../components/CoinDetail"
import HistoryChart from "../components/HistoryChart"


function CryptoDetails() {
  return (
    <div className="wrapper-container">
      <HistoryChart/>
      <CoinDetail/>
    </div>
  )
}

export default CryptoDetails
