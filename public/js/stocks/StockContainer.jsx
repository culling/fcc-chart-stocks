class StockContainer extends React.Component{
    constructor(){
        super();
        this.state = {
            graphSeriesData: [],
            companyTickers: ["GOOG", "AKAM","AMZN"]
        }
    };
    render(){
        return(
            <div>Stock Container
                <div id="search-bar"></div>

                <div id="stock-graph-react"></div>


            </div>
        )
    }

}


ReactDOM.render (
    <StockContainer />, document.getElementById('stock-container')
)
