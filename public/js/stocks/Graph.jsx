console.log("Graph.js is Loaded");

//$.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {

class Graph extends React.Component{
    constructor(){
        super();
        this.state = {
            graphSeriesData: []
        }
    };

    componentWillMount(){

        this._loadCompanyData("GOOG");
        this._loadCompanyData("AAPL");        

    }

    _loadCompanyData(companyID){
        jQuery.ajax({
            method: "GET",
            url:('/api/stocks/' + companyID),
            success: (rawResult)=> {

                var graphSeriesData = []
                graphSeriesData = this.state.graphSeriesData.map((cd)=>{return cd});
                console.log(graphSeriesData);

                //console.log(rawResult);
                var resultObject = JSON.parse(rawResult);
                var resultsArray = [];
                
                for(var i = 0; i< resultObject.length; i++){
                    resultsArray.push(resultObject[i]);
                }
                var companyData = {
                    name: companyID,
                    data: resultsArray,
                    tooltip: {
                        valueDecimals: 2
                    },
                    _colorIndex: (graphSeriesData.length)
                }
                //console.log(companyData);

                graphSeriesData.push(companyData);
                console.log(graphSeriesData);
                this.setState({graphSeriesData: graphSeriesData});
            }
        });
        
    }


    render(){
        if(this.state.graphSeriesData.length > 0){
        console.log(this.state.graphSeriesData);

            Highcharts.stockChart('stock-graph-reactRendered', {
                rangeSelector: {
                    selected: 1
                },

                title: {
                    text: 'Stock Prices'
                },

                series: this.state.graphSeriesData
            });
        }
    return(
        <div>
            <h3> Stock Graph React </h3>
            <div id="stock-graph-reactRendered"></div> 
        </div>
    )};

}

ReactDOM.render (
    <Graph />, document.getElementById('stock-graph-react')
)
