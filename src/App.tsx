import { useEffect, useState } from "react";
import "./App.css";

interface Coin {
  uuid: string;
  symbol: string;
  name: string;
  price: string;
  iconUrl: string;
}

function App() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiUrl = "https://api.coinranking.com/v2/coins";

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("API fetch failed");
        const data = await res.json();
        setCoins(data.data.coins);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="App">
      <h1>Coin Rank App</h1>
      <div className="card-wrapper">
        {coins.map((coin) => (
          <div className="card" key={coin.uuid}>
            <img src={coin.iconUrl} alt={coin.name} />
            <h2>{coin.symbol}</h2>
            <p>{coin.name}</p>
            <p>${Number(coin.price).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
