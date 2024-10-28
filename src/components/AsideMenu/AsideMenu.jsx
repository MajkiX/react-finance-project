import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import './AsideMenu.scss'

const AsideMenu = ({ handleShowAsideMenu, favouriteTickers, setTicker }) => {



    const favouriteTickersList = favouriteTickers.map(ticker => (
        <li key={ticker}>
            <h3>{ticker}</h3>
            <button className='setTickerButton' onClick={() => setTicker(ticker)}>Set Ticker</button>
        </li>
    ))

    return (
        <div className='asideMenu'>
            <button className='hideMenuButton' onClick={handleShowAsideMenu}><FontAwesomeIcon icon={faAnglesLeft} style={{ color: "#ebe5e5", }} /></button>
            <ul>{favouriteTickersList}</ul>
        </div>
    );
}

export default AsideMenu;