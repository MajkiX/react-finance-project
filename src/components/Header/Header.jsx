import React from 'react';
import './Header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Header = ({ handleSetTicker, handleSetFirstDate, handleSetSecondDate, fetchData, ticker, firstDate, secondDate, yesterdayDate }) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchData()
    }

    return (
        <div className='header'>
            <form className='header__form' onSubmit={handleSubmit}>
                <input onChange={handleSetTicker} maxLength={4} type="text" value={ticker} placeholder='type stock ticker...' />
                <div>
                    <input onChange={handleSetFirstDate} type="date" max={secondDate} name="" id="" value={firstDate} />
                    <input onChange={handleSetSecondDate} type="date" max={yesterdayDate} min={firstDate} name="" id="" value={secondDate} />
                </div>
                <button type="submit">Search <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#ebe5e5", }} /></button>
            </form>
        </div>
    );
}

export default Header;