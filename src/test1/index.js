import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

class Test extends React.Component {
    constructor(props){
        super(props);

    }

    render(){
        return <div className='redC'>test1...!</div>
    }
}

ReactDOM.render(<Test></Test>, document.getElementById('root'));