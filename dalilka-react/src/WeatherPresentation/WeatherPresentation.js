import React from 'react';
import weather_icons_light from '../assets/images/weather_icons_light.jpg';
import styles from './WeatherPresentation.module.css';

export default function WeatherPresentation() {
    return (
        <div className={styles.weatherDisplay}>
            <img className='weatherIcon' src={weather_icons_light} alt="weather icon"/>
            <div className='temperature'>hi</div>
            <div className='condition'>zzz</div>
        </div>
    );
}