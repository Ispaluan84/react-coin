import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
 
function Coin() {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem('favorites') || '[]')
    );

   

useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/assets/${id}?apiKey=${import.meta.env.VITE_API_KEY}`,
            { headers: {'Accept': 'application/json'}}
        )
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json()
        })
        .then(data => {
            setCoin(data.data);
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
        setLoading(false)
    });
    }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }


  if (!coin) {
   return <p>Error al cargar la Criptomoneda</p>
  }

  function toggleFavorite() {
    let update;
    if(favorites.includes(id)) {
      update = favorites.filter(f => f !== id);
  } else {
    update = [...favorites, id]
  }

  setFavorites(update);
  localStorage.setItem('favorites', JSON.stringify(update));
  }

  return (
    <div className="container" style={{ maxWidth: '500px' }}>
      <h1>{coin.name} <small>({coin.symbol})</small></h1>
      <img
        className="coin-icon"
        src={`https://assets.coincap.io/assets/icons/${coin.id}@2x.png`}
        alt={coin.symbol}
        onError={e => e.currentTarget.style.display = 'none'}
      />
      <p>Precio: <strong>${parseFloat(coin.priceUsd).toFixed(2)}</strong></p>
      <p>Rank: <strong>{coin.rank}</strong></p>
      <button className="cta" onClick={toggleFavorite}>
        {favorites.includes(id) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      </button>
    </div>
    
  );
}

export default Coin;