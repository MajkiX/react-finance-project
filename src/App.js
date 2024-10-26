import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.scss';
import Main from './components/Main/Main';
import Header from './components/Header/Header';
import AsideMenu from './components/AsideMenu/AsideMenu';

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
  const [favouriteTickers, setFavouriteTickers] = useState([])

  
  const API_KEY = '3b7fOT4l9UZGBGtJGyuZzwwuF0n2hqxb'
  const TickerDataUrl = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${firstDate}/${secondDate}?adjusted=false&apiKey=${API_KEY}`;
  const TickerDetailsUrl = `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${API_KEY}`

  const fetchTickerData = () =>{
      axios.get(TickerDataUrl)
      .then(response => {
        setStock(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }
  
  const fetchTickerDetails = () => {
    axios.get(TickerDetailsUrl)
        .then(response => {
            setTickerInfo(response.data.results);
            console.log(response.data.results);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
  }

  const fetchData = () => {
    fetchTickerData()
    fetchTickerDetails()
    setTicker('')
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
    <button onClick={handleShowAsideMenu}>showMenu</button>


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
        secondDate={secondDate}/>
      {stock && tickerInfo && 
      <Main
      stock={stock} 
      tickerInfo={tickerInfo} 
      favouriteTickers={favouriteTickers}
      API_KEY={API_KEY}
      yesterdayDate={yesterdayDate}
      handleAddToFavourite={handleAddToFavourite}/>}
    </div>
  );
}

export default App;
