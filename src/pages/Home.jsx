import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Home() {
    console.log('Home rendder')
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/assets?limit=20&apiKey=${import.meta.env.VITE_API_KEY}`,
            { headers: {'Accept': 'application/json'}}
        )
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json()
        })
        .then(data => {
            setCoins(data.data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
        setLoading(false)
    });
    }, []);

    if(loading) return <p>Loading...</p>;

    return(
        <ul className="coin-list">
            {coins.map(coin =>(
                <li key={coin.id} className="coin-item">
                    <Link to={`/coin/${coin.id}`} className="coin-link">
                        <img className="coin-icon" src={`https://assets.coincap.io/assets/icons/${coin.id}@2x.png`} alt={coin.symbol} onError={e => e.currentTarget.style.display = 'none'} />
                        <div className="coin-info">
                        <span>{coin.name} <small>({coin.symbol})</small></span>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default Home;