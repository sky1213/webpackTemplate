import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

class Test extends React.Component {
    constructor(props){
        super(props);

    }

    render(){
        return <div className='redC'>test...!</div>
    }
}

ReactDOM.render(<Test></Test>, document.getElementById('root'));