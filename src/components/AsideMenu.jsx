import React, { useEffect } from 'react';
import './AsideMenu.scss'

const AsideMenu = ({ handleShowAsideMenu, favouriteTickers }) => {



    const favouriteTickersList = favouriteTickers.map(ticker => (
        <div>
            <h3>{ticker}</h3>
            <button>Show Graph</button>
        </div>
    ))

    return (
        <div>
            {favouriteTickersList}
            <button onClick={handleShowAsideMenu}>schowaj</button>
        </div>
    );
}

export default AsideMenu;