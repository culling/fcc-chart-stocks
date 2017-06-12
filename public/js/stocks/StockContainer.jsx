class StockContainer extends React.Component{
    constructor(){
        super();
        this.state = {
            graphSeriesData: [],
            stocks: ["AKAM","AMZN", "GOOG"]
        }
    };



    componentWillMount(){
        socket.on('new state', function(newState) {
            if (newState){

            this.setState(newState);

            }
        }.bind(this));
    }


    _closeClick(stockToRemove){
        var stocks =  this.state.stocks.filter(function(stock){return ( stock != stockToRemove)  });
        //console.log(stocks);
        this.networkSetState({stocks: stocks});
    }

    //NETWORK Sync
    networkSetState(newStateDiff) {
        // do some awesome network things here
        // 1. put the entire state into the database
        this.saveStateToDB(newStateDiff);
        // 2. put diffs onto the websocket
        this.postToSocket(newStateDiff);
        // 3. set state as per usual
        this.setState(newStateDiff);
    }

    postToSocket(newStateDiff) {
        socket.emit('new state', newStateDiff);
    }

    saveStateToDB(newStateDiff) {
        /*
        jQuery.ajax({ url: '/api/guestList', 
            contentType: 'application/json', // for request
            dataType: 'json', //for response
            type: 'PUT',
            data: JSON.stringify(newStateDiff) 
        });
        */
        console.log("Save to DB called");
    }
    //End NETWORK Sync



    render(){
        console.log(this.state.stocks.length)
        return(
            <div>Stock Container
                <SearchBar stocks={this.state.stocks}  />
                <div className="row">
                {this.state.stocks.map((stock, i) => 
                    (<StockCard key={i} stock={stock} closeClick={this._closeClick.bind(this) } />)
                )}
                </div>
                <Graph stocks={this.state.stocks} />

            </div>
        )
    }

}


ReactDOM.render (
    <StockContainer />, document.getElementById('stock-container')
)
