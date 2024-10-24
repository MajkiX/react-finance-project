import { useState } from 'react';
import axios from 'axios'
import './App.css';
import Main from './components/Main';
import Header from './components/Header';





function App() {
  const [ticker, setTicker] = useState('')
  const [stock, setStock] = useState(null);
  const [tickerInfo, setTickerInfo] = useState(null)

  const API_KEY = '3b7fOT4l9UZGBGtJGyuZzwwuF0n2hqxb'
  const date = new Date()
  date.setDate(date.getDate()-1)
  const yesterdayDate = date.toISOString().slice(0, 10)
  const TickerDataUrl = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2024-10-09/${yesterdayDate}?adjusted=false&apiKey=${API_KEY}`;
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
  }

  const handleSetTicker = e =>{
    e.preventDefault();
    setTicker(e.target.value)
  }


  return (
    <div className="App">
      <Header handleSetTicker={handleSetTicker} fetchData={fetchData} ticker={ticker}/>
      {stock && <Main stock={stock} tickerInfo={tickerInfo} API_KEY={API_KEY}/>}
    </div>
  );
}

export default App;
