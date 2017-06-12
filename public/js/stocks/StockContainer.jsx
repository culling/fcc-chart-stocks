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
        event.preventDefault();
        //console.log("Close Clicked for " + stockToRemove);
        
        //console.log(this.state);

        var stocks =  this.state.stocks.filter(function(stock){return ( stock != stockToRemove)  });
        console.log(stocks);

        this.setState({stocks: stocks});

    }


    render(){
        console.log(this.state.stocks.length)
        return(
            <div>Stock Container
                <SearchBar stocks={this.state.stocks}  />

                {this.state.stocks.map((stock, i) => 
                    (<StockCard key={i} stock={stock} closeClick={this._closeClick.bind(this) } />)
                )}

                <Graph stocks={this.state.stocks} />

            </div>
        )
    }

}


ReactDOM.render (
    <StockContainer />, document.getElementById('stock-container')
)
