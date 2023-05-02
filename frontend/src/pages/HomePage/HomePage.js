import CardGrid from "@/components/CardGrid/CardGrid";
import EventButton from "@/components/EventButton/EventButton";
import SearchBar from "@/components/SearchBar/SearchBar";
import React, { Component, useEffect, useState } from "react";
import styles from "src/pages/HomePage/HomePage.module.css";
import moffitpic from "public/moffitt.jpeg"; 
import dylanPic from "public/dylan.jpeg";
import NavBar from "@/components/NavBar/NavBar";

function HomePage() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/get-all-events")
        .then(response => response.json())
        .then(data => {
            setEvents(data)
        })
    }, [])
    return (
        <div> 
                <NavBar page={0}> </NavBar>
                <div className={styles.buttons}> 
                    <div className= {styles.createButton} > 
                         <EventButton text="Create" > </EventButton>
                    </div>

                    <div  className= {styles.searchBar}>
                         <SearchBar> </SearchBar>   
                    </div> 
                </div>
                <div className= {styles.cardGrid}>
                    <CardGrid cardData={events}> </CardGrid> 
                </div>
        </div>
    )
}

export default HomePage;