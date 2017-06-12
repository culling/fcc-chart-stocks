console.log("Stock Card Loaded");
class StockCard extends React.Component{
    constructor(props){
        super(props);
        //this.state={
            //stock: this.props.stock
        //}
    }

    render(){
        console.log(this.props.stock);
        return(

            <div className="chipos">
                {this.props.stock}
                <button className="close material-icons" onClick={() => this.props.closeClick(this.props.stock)}>close</button>
            </div>



        )
    }
}

