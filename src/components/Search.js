import React from "react";
import styled from "styled-components";

const Form = styled.form`
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 20px;

    input {
        width: 300px;
    }
`;

const Search = (props) => {
    const formPreventDefault = (e) => {
        e.preventDefault();
    };

    return (
        <Form onSubmit={formPreventDefault} action="">
            <label>
                Search:
                <input onChange={props.handleSearch} type="text" />
            </label>
        </Form>
    );
};

export default Search;
