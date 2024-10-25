import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import './Main.scss'

const Main = ({ stock, tickerInfo, API_KEY, handleAddToFavourite }) => {

    const { results, ticker } = stock
    const { name, address, branding, description, homepage_url, market_cap, sic_description, total_employees } = tickerInfo

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toISOString().slice(0, 10);
    };

    return (
        <>
            <h1><img className='logoImg' src={branding.logo_url + `?apiKey=${API_KEY}`} alt="" /> </h1>
            <h2>{name}</h2>
            <h3>{ticker}</h3>
            <ResponsiveContainer width="100%" height={500}>
                <LineChart
                    data={results}
                    margin={{
                        top: 55,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={(item) => formatTimestamp(item.t)} /> {/* Data na osi X */}
                    <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
                    <Tooltip />
                    <Legend />
                    {/* Wyświetlanie danych cen zamknięcia */}
                    <Line type="monotone" dataKey="c" stroke="#8884d8" name="Cena zamknięcia" />
                    <Line type="monotone" dataKey="h" stroke="#8444d8" name="Highest Price" />
                    <Line type="monotone" dataKey="h" stroke="#8422d8" name="Lowest Price" />
                </LineChart>
            </ResponsiveContainer>
            <button onClick={() => handleAddToFavourite(ticker)}>Favorite</button>
            <article>
                <p>Description: <br /> {description}</p>
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
            </article>
        </>
    );
}

export default Main;