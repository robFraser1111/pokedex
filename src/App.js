import React, { useState, useEffect } from "react";
import "./App.css";
import Message from "./components/Message";
import Search from "./components/Search";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import styled from "styled-components";

const Header = styled.header`
    h1 {
        text-align: center;
    }
`;

function App() {
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState(
        `https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0`
    );

    const [data, setData] = useState([]);
    const [searchError, setSearchError] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetch(url, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((output) => setData(output.results))
            .catch((error) => {
                console.error("Fetching error: " + error);
                setData("error");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [url]);

    const handleSearch = (e) => {
        setTimeout(function () {
            const newData = data.filter((item) =>
                item.name.includes(e.target.value.toLowerCase())
            );

            setFilteredData(newData);

            if (e.target.value.length > 0 && newData.length === 0) {
                setSearchError(true);
            } else {
                setSearchError(false);
            }
        }, 1500);
    };

    const handlePrevious = () => {
        setUrl(data.previous);
    };

    const handleNext = () => {
        setUrl(data.next);
    };

    if (data !== "error") {
        return (
            <div>
                <Header id="header">
                    <h1>Pokedex</h1>
                </Header>
                <main>
                    <Search handleSearch={handleSearch} />
                    {loading && <Message text="Loading..." />}
                    {searchError && (
                        <Message text="Could not find that Pokemon..." />
                    )}
                    {/* <Tabs previous={handlePrevious} next={handleNext} /> */}
                    <Cards
                        data={filteredData.length === 0 ? data : filteredData}
                    />
                </main>
                <Footer />
            </div>
        );
    } else {
        return <p>Error loading Pokemon. Try refreshing the page.</p>;
    }
}

export default App;
