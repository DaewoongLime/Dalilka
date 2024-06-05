import React, { useState, useEffect } from 'react';
import WeatherPresentation from '../WeatherPresentation/WeatherPresentation';

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
const locations = `${process.env.PUBLIC_URL}/excel/location.xlsx`;

function getDate() {
    const date = new Date();
    let base_date = JSON.stringify(date.getFullYear());
    base_date += (date.getMonth()+1 < 10 ? '0' + (date.getMonth()+1) : JSON.stringify(date.getMonth()+1));
    base_date += (date.getDate() < 10 ? '0' + date.getDate() : JSON.stringify(date.getDate()));
    
    let base_time = date.getHours() < 10 ? '0' + date.getHours() : JSON.stringify(date.getHours());
    base_time += date.getMinutes() < 10 ? '0' + date.getMinutes() : JSON.stringify(date.getMinutes());
    
    return [base_date, base_time];
}

function getWeather(x, y) {
    const [base_date, base_time] = getDate();
    let url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'; /*URL*/
    const values = [];
    const queryParams = new URLSearchParams({
        serviceKey: apiKey,
        pageNo: '1',
        numOfRows: '1000',
        dataType: 'XML',
        base_date: base_date,
        base_time: base_time,
        nx: x,
        ny: y,
    }).toString();

    fetch(`${url}?${queryParams}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        // Parse XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        
        // Extract data (example: extracting temperature data)
        const items = xmlDoc.getElementsByTagName('item');
        for (let i = 0; i < items.length; i++) {
            // const category = items[i].getElementsByTagName('category')[0].textContent;
            const obsrValue = items[i].getElementsByTagName('obsrValue')[0].textContent;          
            values.push(obsrValue);
            // setValues((prev) => [...prev, obsrValue]);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

    url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst';
    fetch(`${url}?${queryParams}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        // console.log(data);
        // Parse XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        
        // Extract data (example: extracting temperature data)
        const items = xmlDoc.getElementsByTagName('item');
        for (let i = 0; i < items.length; i++) {
            const category = items[i].getElementsByTagName('category')[0].textContent;
            if (category === 'SKY') {
                const fcstValue = items[i].getElementsByTagName('fcstValue')[0].textContent;
                values.push(fcstValue);
                // setValues((prev) => [...prev, fcstValue]);
                break; 
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    return values;
}

export default function WeatherLogic(props) {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            (error) => {
              setError(error.message);
            }
          );
        } else {
          setError('Geolocation is not supported by this browser.');
        }
    }, []);
    console.log(location.latitude, location.longitude);

    let [PTY, REH, RN1, T1H, UUU, VEC, VVV, WSD, SKY] = getWeather('64', '104');
    if (SKY === undefined) {SKY = -1};
    console.log([PTY, REH, RN1, T1H, UUU, VEC, VVV, WSD, SKY]);

    return (<WeatherPresentation pty={PTY} 
        reh={REH} rn1={RN1} t1h={T1H} uuu={UUU} 
        vec={VEC} vvv={VVV} wsd={WSD} sky={SKY} />);
}