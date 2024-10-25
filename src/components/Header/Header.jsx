import React from 'react';
import './Header.scss'

const Header = ({ handleSetTicker, handleSetFirstDate, handleSetSecondDate, fetchData, ticker, firstDate, secondDate, yesterdayDate }) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchData()
    }

    return (
        <div className='header'>
            <form className='header__form' onSubmit={handleSubmit}>
                <input onChange={handleSetTicker} maxLength={4} type="text" value={ticker} />
                <div>
                    <input onChange={handleSetFirstDate} type="date" max={secondDate} name="" id="" value={firstDate} />
                    <input onChange={handleSetSecondDate} type="date" max={yesterdayDate} min={firstDate} name="" id="" value={secondDate} />
                </div>
                <button type="submit">Wyszukaj</button>
            </form>
        </div>
    );
}

export default Header;