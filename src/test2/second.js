import React from 'react';
import ReactDOM from "react-dom";

import { common } from './common/common';


class TestPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(`second  ${common}`);
    }

    render() {
        return <div>second 。。。react</div>
    }
}

ReactDOM.render(<TestPage />, document.getElementById("root"));