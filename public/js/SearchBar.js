$('document').ready(function() {
    console.log("javascript Loaded");

});



class SearchBar extends React.Component{
    constructor(){
        super();
        this.state={
            searchText: "Stock Market Ticker"
            
        }
        this.defaultSearchLocation = "Stock Market Ticker";
    }

    componentWillMount(){
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


    _formSubmit(event){
        //Set the value before submission unless it is the default text;
        console.log("Search Submitted")

        var searchText = jQuery("#searchText").val();
        if (searchText == ""){
            console.log("searchText is blank");
        }else{
            this.networkSetState({companyTickers: [searchText]});
        }

        event.preventDefault();
    }







    render(){
        
        var searchBar = <input ref={(input)=> this.search = input} id="searchText" 
            className="col s9" placeholder={this.state.searchText} 
            defaultValue={""} name="searchText" type="text" ></input>            
        //}

        return (
        <div className="row">
            <form id="search" className="col s12" action="/" method="get" onSubmit={this._formSubmit.bind(this) }  >
                {searchBar}
                <span className="input-group-btn col s3">
                    <button type="submit" className="btn btn-block btn-primary"  > <i className="material-icons">search</i>  </button>
                </span>
            </form>
        </div>
    )}

}

ReactDOM.render (
    <SearchBar />, document.getElementById('search-bar')
)
