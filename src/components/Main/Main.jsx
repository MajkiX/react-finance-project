import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faArrowDownWideShort, faArrowTurnUp } from '@fortawesome/free-solid-svg-icons'
import useWindowDimensions from '../../hooks/useWindowDimensions';

import './Main.scss'




const Main = ({ stock, tickerInfo, favouriteTickers, API_KEY, yesterdayDate, handleAddToFavourite, isAsideMenuVisible }) => {
    const [isInfoVisible, setIsInfoVisible] = useState(false)
    const { height, width } = useWindowDimensions()

    const { results, resultsCount, ticker } = stock
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
        <div className='addicionalInfo__text'>
            <p>Market Cap: ${Math.floor(market_cap)}</p>
            {sic_description && <p>Category: {sic_description}</p>}
            {total_employees && <p>Total employees: {total_employees}</p>}
            {homepage_url && <p>HomePage: <a href={homepage_url}>{homepage_url}</a></p>}
            {address && <p>Addres: <br />
                {address.address1} <br />
                {address.city} <br />
                {address.postal_code} <br />
                {address.state}
            </p>}
        </div>

    const hideGraph = isAsideMenuVisible && width < 600

    return (
        <div className='main'>
            <div className='stockInfo'>
                <div className="stockTitle">
                    <img className='logoImg' src={branding?.logo_url + `?apiKey=${API_KEY}`} alt="" />
                    <h2>{name}</h2>
                    <div className='starIcon'>{isInFavourutes ?
                        <FontAwesomeIcon onClick={() => handleAddToFavourite(ticker)} icon={faStar} style={{ color: "#FFD43B" }} />
                        :
                        <FontAwesomeIcon onClick={() => handleAddToFavourite(ticker)} icon={faStar} />}
                    </div>
                </div>
                <div className='stockStats'>
                    <h2>{yesterdayDate}</h2>
                    {results && resultsCount > 0 ? (
                        <>
                            <p>Highest price: ${results[resultsCount - 1].h}</p>
                            <p>Lowest price: ${results[resultsCount - 1].l}</p>
                        </>
                    ) : (
                        <p>No data available for the selected date range.</p>
                    )
                    }
                </div>
            </div>
            {!hideGraph && <ResponsiveContainer className='graph' width="90%" height={500}>
                <LineChart
                    data={results}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 20,
                        bottom: 25,
                    }}
                >
                    <CartesianGrid stroke="#8884d8" strokeDasharray="3 3" />
                    <XAxis dataKey={(item) => formatTimestamp(item.t)} /> {/* Data na osi X */}
                    <YAxis domain={['dataMin - 10', 'dataMax + 10']} tickFormatter={(value) => `$${value}`} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="c" stroke="#8884d8" name="Close Price" />
                    <Line type="monotone" dataKey="h" stroke="#8444d8" name="Highest Price" />
                    <Line type="monotone" dataKey="l" stroke="#8422d8" name="Lowest Price" />
                </LineChart>
            </ResponsiveContainer>}
            <div className='description'>
                <h2>Description: </h2>
                <p className='description__text'>{description}</p>
            </div>
            <div className='addicionalInfo'>
                <div className='addicionalInfo__button' onClick={handleShowAddicionalInfo}>
                    Addicional Info {isInfoVisible ? <FontAwesomeIcon icon={faArrowTurnUp} /> : <FontAwesomeIcon icon={faArrowDownWideShort} />}
                </div>
                {addicionalInfo}
            </div>
        </div >
    );
}

export default Main;