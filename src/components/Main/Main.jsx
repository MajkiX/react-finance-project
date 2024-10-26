import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import './Main.scss'

const Main = ({ stock, tickerInfo, favouriteTickers, API_KEY, yesterdayDate, handleAddToFavourite }) => {
    const [isInfoVisible, setIsInfoVisible] = useState(false)

    const { results, ticker } = stock
    const { name, address, branding, description, homepage_url, market_cap, sic_description, total_employees } = tickerInfo

    const isInFavourutes = favouriteTickers.includes(ticker)

    const handleShowAddicionalInfo = () => {
        setIsInfoVisible(!isInfoVisible)
    }

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toISOString().slice(0, 10);
    };

    const addicionalInfo = isInfoVisible &&
        <div className='addicionalInfo'>
            <p>HomePage: <a href={homepage_url}>{homepage_url}</a></p>
            <p>Market Cap: {market_cap}$</p>
            <p>Category: {sic_description}</p>
            <p>Addres: <br />
                {address.address1} <br />
                {address.city} <br />
                {address.postal_code} <br />
                {address.state}
            </p>
            <p>Total employees: {total_employees}</p>
        </div>

    return (
        <div className='main'>
            <div className='stockInfo'>
                <div className="stockTitle">
                    <img className='logoImg' src={branding.logo_url + `?apiKey=${API_KEY}`} alt="" />
                    <h2>{name}</h2>
                    <div className='starIcon'>{isInFavourutes ? <FontAwesomeIcon onClick={() => handleAddToFavourite(ticker)} icon={faStar} style={{ color: "#FFD43B" }} /> : <FontAwesomeIcon onClick={() => handleAddToFavourite(ticker)} icon={faStar} />}</div>
                </div>
                <div className='stockStats'>
                    <p>{yesterdayDate}</p>
                    <p>Highest price {results[0].h}</p>
                    <p>Lowest price {results[0].l}</p>
                </div>
            </div>
            <ResponsiveContainer className='graph' width="70%" height={500}>
                <LineChart
                    data={results}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid stroke="#8884d8" strokeDasharray="3 3" />
                    <XAxis dataKey={(item) => formatTimestamp(item.t)} /> {/* Data na osi X */}
                    <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="c" stroke="#8884d8" name="Cena zamknięcia" />
                    <Line type="monotone" dataKey="h" stroke="#8444d8" name="Highest Price" />
                    <Line type="monotone" dataKey="h" stroke="#8422d8" name="Lowest Price" />
                </LineChart>
            </ResponsiveContainer>
            <h2>Description: </h2>
            <p className='description'>{description}</p>
            <div onClick={handleShowAddicionalInfo}>
                Addicional Info
            </div>
            {addicionalInfo}
        </div>
    );
}

export default Main;