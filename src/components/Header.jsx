import React from 'react';

const Header = ({ handleSetTicker, ticker, fetchData }) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchData()
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input onChange={handleSetTicker} maxLength={4} type="text" value={ticker} />
                <button type="submit">Wyszukaj</button>
            </form>
        </>
    );
}

export default Header;