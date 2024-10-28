import React from 'react';
import './WelcomePage.scss'

const WelcomePage = () => {
    return (
        <div className='welcomePage'>
            <h1>Welcome</h1>
            <h2>
                This is a small project displaying stock market information using React and the Recharts library
            </h2>
            <h2>
                If you want to display stock information, enter the appropriate US company ticker and date
                from which you want to get data
            </h2>
        </div>
    );
}

export default WelcomePage;