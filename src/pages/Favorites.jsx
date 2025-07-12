import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Favorites() {

  const [favs, setFavs] = useState(
    JSON.parse(localStorage.getItem('favorites') || '[]')
  );
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!favs.length) {
      setLoading(false)
      return;
    }
        fetch(`${import.meta.env.VITE_API_URL}/assets?apiKey=${import.meta.env.VITE_API_KEY}`,
            { headers: {'Accept': 'application/json'}}
        )
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json()
        })
        .then(data => {
          const filtered =data.data.filter(c => favs.includes(c.id));
            setCoins(filtered);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
        setLoading(false)
    });
    }, []);

  if (loading)  return <p>Loading...</p>;
  if (!coins.length)  return <p>No tienes monedas favoritas.</p>; 

  return (
    <ul className="coin-list">
      {coins.map(c => (
        <li key={c.id} className="coin-item">
          <Link to={`/coin/${c.id}`} className="coin-link">
            <img className="coin-icon" src={`https://assets.coincap.io/assets/icons/${c.id}@2x.png`} alt={c.symbol} onError={e => e.currentTarget.style.display = 'none'} />
            <div className="coin-info">
              <span>{c.name} <small>({c.symbol})</small></span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Favorites;