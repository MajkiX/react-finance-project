import React from 'react';
import './AsideMenu.scss'

const AsideMenu = ({ handleShowAsideMenu, favouriteTickers, setTicker }) => {



    const favouriteTickersList = favouriteTickers.map(ticker => (
        <li>
            <h3>{ticker}</h3>
            <button onClick={() => setTicker(ticker)}>Set Ticker</button>
        </li>
    ))

    return (
        <div className='asideMenu'>
            <button onClick={handleShowAsideMenu}>schowaj</button>
            <ul>{favouriteTickersList}</ul>
        </div>
    );
}

export default AsideMenu;