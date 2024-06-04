import React from 'react';
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

function getWeather(x, y, values) {
    const [base_date, base_time] = getDate();
    const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'; /*URL*/
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
        console.log(data);
        // Parse XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        
        // Extract data (example: extracting temperature data)
        const items = xmlDoc.getElementsByTagName('item');
        for (const i = 0; i < items.length; i++) {
            const category = items[i].getElementsByTagName('category')[0].textContent;
            const obsrValue = items[i].getElementsByTagName('obsrValue')[0].textContent;
          
            values.push(obsrValue);
            console.log(category, obsrValue);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

export default function WeatherLogic(props) {
    let [OK, PTY, REH, RN1, T1H, UUU, VEC, VVV, WSD] = [false, -1, -1, -1, -1, -1, -1, -1, -1];
    const values = [];
    getWeather('64', '104', values);
    if (values.length == 8) {
        [PTY, REH, RN1, T1H, UUU, VEC, VVV, WSD] = [true, ...values];
    };

    // http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst

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

    return (<WeatherPresentation ok={OK} temperature={T1H} condition={PTY} />);
}