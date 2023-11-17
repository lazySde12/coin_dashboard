
import CoinDetail from './CoinDetail';
import HistoryChart from './HistoryChart';

function Model({ coinId }) { // Receiving coinId as a prop
    return (
        <div>
            <button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch modal
            </button>

            <div className="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable ">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                            {/* <button type="button" className="btn btn-outline-success" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div className="modal-body ">
                        
                            {/* Render HistoryChart here with the coinId prop */}
                            {console.log(coinId)}
                            <HistoryChart coinId={coinId} />
                            <CoinDetail coinId={coinId} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-success" data-bs-dismiss="modal">Close</button>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Model;
