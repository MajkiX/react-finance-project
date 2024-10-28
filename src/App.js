import { useState } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'

import './App.scss';
import Main from './components/Main/Main';
import Header from './components/Header/Header';
import AsideMenu from './components/AsideMenu/AsideMenu';
import Footer from './components/Footer/Footer';
import WelcomePage from './components/WelcomePage/WelcomPage';

function App() {
  const date = new Date()
  date.setDate(date.getDate()-1)
  const yesterdayDate = date.toISOString().slice(0, 10)
  date.setDate(date.getDate()-7)
  const weekAgoDate = date.toISOString().slice(0, 10)
  
  const [ticker, setTicker] = useState('')
  const [stock, setStock] = useState(null);
  const [firstDate, setFirstDate] = useState(weekAgoDate)
  const [secondDate, setSecondDate] = useState(yesterdayDate)
  const [tickerInfo, setTickerInfo] = useState(null)
  const [isAsideMenuVisible, setIsAsideMenuVisible] = useState(false)
  const [favouriteTickers, setFavouriteTickers] = useState(['TSLA', "T", "AAPL", "AADI", "CERO", "CEP", "DOW"])
  const [errors, setErrors] = useState()

  
  const API_KEY = '3b7fOT4l9UZGBGtJGyuZzwwuF0n2hqxb'
  const TickerDataUrl = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${firstDate}/${secondDate}?adjusted=false&apiKey=${API_KEY}`;
  const TickerDetailsUrl = `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${API_KEY}`

  const fetchTickerData = () =>{
      axios.get(TickerDataUrl)
      .then(response => {
        if(response.data.queryCount > 0){
          setStock(response.data);
        }
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching ticker data:', error);
        setErrors(error.message)
      });
    }
  
  const fetchTickerDetails = () => {
    axios.get(TickerDetailsUrl)
        .then(response => {
            setTickerInfo(response.data.results);
            console.log(response.data.results);
        })
        .catch(error => {
            console.error('Error fetching details data:', error);
            setErrors(error.message)
        });
  }

  const fetchData = () => {
    fetchTickerData()
    fetchTickerDetails()
    setTicker('')
    setErrors(null)
  }

  const handleSetTicker = e =>{
    e.preventDefault();
    setTicker(e.target.value)
  }

  const handleSetFirstDate = e =>{
    e.preventDefault();
    setFirstDate(e.target.value)
  }

  const handleSetSecondDate = e =>{
    e.preventDefault();
    setSecondDate(e.target.value)
  }

  const handleShowAsideMenu = () => {
    setIsAsideMenuVisible(!isAsideMenuVisible)
  }

  const handleAddToFavourite = (ticker) => {
    if(!favouriteTickers.includes(ticker)){
    setFavouriteTickers([...favouriteTickers, ticker])
    }else {
      setFavouriteTickers(favouriteTickers.filter(
        element => element !== ticker
      ));
    }
  }

  const showAsideMenu = isAsideMenuVisible ? 
    <AsideMenu 
      handleShowAsideMenu={handleShowAsideMenu} 
      favouriteTickers={favouriteTickers}
      setTicker={setTicker} 
    />
    : 
    <button className='showMenuButton' onClick={handleShowAsideMenu}><FontAwesomeIcon icon={faAnglesRight} style={{color: "#ebe5e5",}} /></button>


  return (
    <div className="App">
      <aside>{showAsideMenu}</aside>
      <Header 
        handleSetTicker={handleSetTicker} 
        fetchData={fetchData} 
        handleSetFirstDate={handleSetFirstDate} 
        handleSetSecondDate={handleSetSecondDate}
        yesterdayDate={yesterdayDate} 
        ticker={ticker} 
        firstDate={firstDate} 
        secondDate={secondDate}
      />
      {errors}
      {!stock && <WelcomePage/>}
      {stock && tickerInfo && 
      <Main
        stock={stock} 
        tickerInfo={tickerInfo} 
        favouriteTickers={favouriteTickers}
        API_KEY={API_KEY}
        yesterdayDate={yesterdayDate}
        handleAddToFavourite={handleAddToFavourite}
        isAsideMenuVisible={isAsideMenuVisible}
      />}
      <Footer/>
    </div>
  );
}

export default App;
