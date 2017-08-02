
import React from "react";
import ReactDOM from "react-dom";

class MyModule extends React.Component {

    constructor(props){
        super(props);

    }

    render() {
        return <div> hello react... </div>
    }

}

ReactDOM.render(<MyModule /> , document.body);