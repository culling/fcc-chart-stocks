console.log("Card Loaded");
class StockCard extends React.Component{
    constructor(props){
        super(props);

        this.state={
            stock: this.props.stock, 
        }

    }

    render(){
        return(
            <div>{this.state.stock}</div>
        )
    }
}

