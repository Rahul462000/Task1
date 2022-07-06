import React from 'react'
import { useState, useEffect } from 'react'
import "./style.css"
import Weathercard from './weathercard'

const Temp = () => {
    const [searchValue, setSearchValue] = useState("Delhi");
    const [tempInfo, setTempInfo] = useState({})

    // this function will give the default city info
    const getWeatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=ae3de5c3795482e0f5e1b0ba2b04dad3`;

            const res = await fetch(url);
            const data = await res.json();
            // // object destructuring
            const { temp, pressure, humidity } = data.main;
            const { main: weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;




            const myNewWeatherInfo = {
                temp, humidity, pressure, weathermood, name, speed, country, sunset
            };
            setTempInfo(myNewWeatherInfo);


            console.log(data);

        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getWeatherInfo();
    }, []);





    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input type="search"
                        placeholder='search....'
                        autoFocus
                        id='search'
                        className='searchTerm'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />

                    <button className='searchButton' type='button' onClick={getWeatherInfo}>
                        Search
                    </button>
                </div>
            </div>
            {/* the temperature widget card strts from here */}
            <Weathercard tempInfo = {tempInfo} />

        </>
    )
}

export default Temp