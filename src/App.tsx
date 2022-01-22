import React, { useState, useEffect, ChangeEvent } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Message from "./components/Message";
import Search from "./components/Search";
import Card from "./components/Card";
import Pokemon from "./components/Pokemon";
import Footer from "./components/Footer";
import styled, { ThemeProvider } from "styled-components";
import TopButton from "./components/TopButton";
import Psyduck from "./images/psyduck-01.png";

const theme = {
    // Base colours
    blue: "#3264af",
    yellow: "#ffcc00",
    black: "#313131",
    grey: "#f8f8f8",
    darkGrey: "#e1e1e1",
    white: "#fefefe",

    // Types
    bug: "#729f3f",
    dragon: "#53a4cf",
    fairy: "#fdb9e9",
    fire: "#fd7d24",
    ghost: "#7b62a3",
    ground: "#ab9842",
    normal: "#a4acaf",
    psychic: "#f366b9",
    steel: "#9eb7b8",
    dark: "#707070",
    electric: "#eed535",
    fighting: "#d56723",
    flying: "#3dc7ef",
    grass: "#9bcc50",
    ice: "#51c4e7",
    poison: "#b97fc9",
    rock: "#a38c21",
    water: "#4592c4",
};

const Wrapper = styled.div`
    display: grid;
    justify-content: center;
    background: ${theme.white};
`;

const Cards = styled.section`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    gap: 40px;
    margin: 40px;
`;

const Main = styled.main`
    max-width: 2560px;
`;

const SearchResults = styled.div`
    background-color: ${theme.darkGrey};
    padding: 20px 0;
    margin: 20px 0;
    color: ${theme.black};

    h2 {
        text-align: center;
        margin-top: 20px;
    }
`;

const Error = styled.section`
    text-align: center;

    img {
        width: 300px;
        height: auto;
        padding: 20px;
    }
`;

function App() {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=151&offset=0`;
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const [loading, setLoading] = useState(true);
    const [scrollPos, setScrollPos] = useState(0);
    const [bottom, setBottom] = useState(false);

    const [searching, setSearching] = useState(false);
    const [searchError, setSearchError] = useState(false);

    // Load data from Poke API
    useEffect(() => {
        fetch(url, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((output) => setData(output.results))
            .catch((error) => {
                console.error("Fetching error: " + error);
                setData([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [url]);

    // Handle search input
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearching(true);

        // Check if search term matches a name in the array
        setTimeout(function () {
            const newData = data.filter((item: { name: string }) =>
                item.name.includes(e.target.value.toLowerCase())
            );

            // Set filtered data to new array
            setFilteredData(newData);

            // Reset filtered data if there's no search term
            if (e.target.value === "") {
                setFilteredData([]);
            }

            // Error checking
            if (e.target.value.length > 0 && newData.length === 0) {
                setSearchError(true);
            } else {
                setSearchError(false);
            }

            setSearching(false);
        }, 1500);
    };

    // Check scroll position to show 'back to top' button
    let lastKnownScrollPosition = 0;
    let ticking = false;

    function doSomething(scrollPos: any) {
        setScrollPos(scrollPos);
    }

    document.addEventListener("scroll", function (e) {
        lastKnownScrollPosition = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(function () {
                doSomething(lastKnownScrollPosition);
                ticking = false;
            });

            ticking = true;
        }

        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            setBottom(true);
        } else {
            setBottom(false);
        }
    });

    if (data.length >= 0) {
        return (
            <ThemeProvider theme={theme}>
                <Wrapper>
                    <Header />
                    {loading && <Message text="Loading..." />}
                    <Main>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <>
                                        <Search handleSearch={handleSearch} />
                                        {searching && (
                                            <Message text="Searching..." />
                                        )}

                                        {searchError && !searching ? (
                                            <Message text="Could not find that Pokemon..." />
                                        ) : (
                                            ""
                                        )}

                                        {filteredData.length !== 0 && (
                                            <SearchResults>
                                                <h2>Search results:</h2>
                                                <Cards>
                                                    {filteredData.map(
                                                        (pokemon, index) => (
                                                            <Card
                                                                key={index}
                                                                data={
                                                                    pokemon[
                                                                        "url"
                                                                    ]
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </Cards>
                                            </SearchResults>
                                        )}
                                        <Cards>
                                            {data.map((pokemon, index) => (
                                                <Card
                                                    key={index}
                                                    data={pokemon["url"]}
                                                />
                                            ))}
                                        </Cards>
                                    </>
                                }
                            ></Route>
                            <Route path="/:name" element={<Pokemon />} />
                        </Routes>
                        <TopButton pos={scrollPos} bottom={bottom} />
                    </Main>

                    <Footer />
                </Wrapper>
            </ThemeProvider>
        );
    } else {
        return (
            <>
                <Header />
                <Error>
                    <h3>Error loading Pokemon. Try refreshing the page.</h3>
                    <img src={Psyduck} alt="Error" />
                </Error>
                <Footer />
            </>
        );
    }
}

export default App;
