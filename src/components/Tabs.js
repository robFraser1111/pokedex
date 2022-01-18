import React from "react";

const Tabs = (props) => {
    return (
        <div>
            <button onClick={props.previous}>Previous</button>
            <button onClick={props.next}>Next</button>
        </div>
    );
};

export default Tabs;
