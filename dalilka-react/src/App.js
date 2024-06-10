import './App.css';
import MyNavBar from './MyNavBar/MyNavBar';
import MySideBar from './MySideBar/MySideBar';
import WeatherLogic from './WeatherLogic/\bWeatherLogic';
import TargetsPresentation from './TargetsPresentation/TargetsPresentation';
import CommunityPresentation from './CommunityPresentation/CommunityPresentation';

function App() {
  return (
    <div className='app'>
      <MyNavBar />
      <MySideBar />
      <div className='container'>
        <WeatherLogic />
        <TargetsPresentation />
        <CommunityPresentation />
      </div>
      
    </div>
  );
}

export default App;
