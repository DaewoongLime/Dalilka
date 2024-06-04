import React from 'react';
import weather_icons_light from '../assets/images/weather_icons_light.jpg';
import styles from './WeatherPresentation.module.css';

export default function WeatherPresentation(props) {
    return (
        <div className={styles.weatherDisplay}>
            <img className={styles.weatherIcon} src={weather_icons_light} alt="weather icon"/>
            <div className={styles.temperature}>Current Temperature: {props.temperature}C</div>
            <div className={styles.condition}>{props.condition}</div>
        </div>
        
    );
}