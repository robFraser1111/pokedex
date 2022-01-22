import React from "react";
import styled from "styled-components";

const Form = styled.form`
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 20px;
`;

const Input = styled.input`
    width: 300px;
    padding: 8px;
    border: ${(props) => props.theme.blue} 2px solid;
`;

const Search = (props: { handleSearch: (e: any) => void }) => {
    const formPreventDefault = (e: any) => {
        e.preventDefault();
    };

    return (
        <Form onSubmit={formPreventDefault} action="">
            <Input
                onChange={props.handleSearch}
                type="text"
                placeholder="Search by Pokemon name..."
            />
        </Form>
    );
};

export default Search;
