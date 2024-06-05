import React from 'react';
import weather_icons_light from '../assets/images/weather_icons_light.jpg';
import styles from './WeatherPresentation.module.css';

export default function WeatherPresentation(props) {
    let content = (
        <div className={styles.weatherDisplay}>
            <div className={styles.error}>Weather cannot be shown. Try again later.</div>
        </div>
        );

    if (props.ok) {
        content = (
        <div className={styles.weatherDisplay}>
            <img className={styles.weatherIcon} src={weather_icons_light} alt="weather icon"/>
            <div className={styles.temperature}>{props.t1h}</div>
            <div className={styles.condition}>{props.rn1}</div>
        </div>
    )};

    return (content);
}

// T1H = temp 4
// RN1 = 1시간 강수량 3 
// SKY = 하늘 상태
// UUU = 동서바람성분 5 
// VVV = 남북바람성분 7
// REH = 습도 2
// PTY = 강수형태 1
// LGT = 낙뢰값
// VEC = 풍향 6
// WSD = 풍속 8