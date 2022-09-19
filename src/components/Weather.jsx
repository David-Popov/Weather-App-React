import React from 'react'
import { useEffect,useState } from 'react'
import './Weather.css'
import Input from './Input'


// const api_key='56d1bddb8295871fa6d11ef484311a2c';


function Weather() {
    const [weather,setWeather] = useState([])
    const [degrees,setDegrees] = useState(null)
    const [location,setLocation] = useState(null)
    const [desc,setDesc] = useState(null)
    const [icon, setIcon] = useState("")
    const [humidity,setHumidity] = useState(null)
    const [windSpeed,setWindSpeed] = useState(null)
    const [country,setCountry] = useState("")
    const [userLocation, setUserLocation] = useState("Varna")

    useEffect(() => {
        getWeather()
    },[])

    var date = new Date()
    var today = date.getFullYear() + '-' + (date.getMonth()+1 ) + "-" + date.getDate();
    var time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

    var finalDate = today + " " + time

    const getWeather = async (event) => {
        event.preventDefault();

        const api = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=${String(process.env.REACT_APP_API_KEY)}&units=metric`
        )
        const data = await api.json();
        setDegrees(data.main.temp)
        setLocation(data.name)
        setDesc(data.weather[0].description)
        setIcon(data.weather[0].icon)
        setWindSpeed(data.wind.speed)
        setHumidity(data.main.humidity)
        setCountry(data.sys.country)
        console.log(data)
        setWeather(data)
    }

  return (
    <main className='main-container'>
        <div className='container'>
        <section className="search">
                <Input 
                text={(e) => setUserLocation(e.target.value)}
                submit={getWeather}
                />
                <h1>Weather in {location}</h1>
                <p>{degrees}°C</p>
                <h2><img src={`http://openweathermap.org/img/w/${icon}.png`} alt="" />{desc}</h2>
            </section>
            <section className="content">
                <div className="content-left flex">
                    <h3 className='desc'>Humidity: {humidity}%</h3>
                    <p className='desc'>Wind speed: {windSpeed}</p>
                </div>
                <div className="content-right flex">
                    <h3 className='desc'>Country: {country}</h3>
                    <p className='desc'>{finalDate}</p>
                </div>
            </section>
        </div>
    </main>
  )
}

export default Weather;