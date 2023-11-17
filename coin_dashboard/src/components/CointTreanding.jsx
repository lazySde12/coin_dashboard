import { Link } from "react-router-dom"
import Model from "./Model"


function CointTreanding({coin}) {

  return (
  
    <div className="font-light mb-2 p-2 border-gray-200 border-2 rounded hover:bg-gray-200">
     <div className="flex items-center gap-1 justify-between">
        <span className="font-semibold">{coin.score+1}.</span>
        <img src={coin.small} className="w-6" alt={coin.name} />
        <p>{coin.name}</p>
        <small className="text-x5">({coin.symbol})</small>
        <Model coinId={coin.id} />
     </div>
    </div>


  )
}

export default CointTreanding
