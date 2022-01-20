import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
function App() {
  const [listCoins, setListCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
      (response) => {
        setListCoins(response.data.coins);
      }
    );
  }, []);

  const filteredCoins = listCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLocaleLowerCase());
  });

  return (
    <div className="App">
      <div className="header">
        <div className="one-row">
          {" "}
          <div className="logo">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <h1>Cryptocurrencies</h1>
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="crypto-display">
        {filteredCoins.map((coin) => {
          return (
            <div key={coin.id} className="card">
              <h3 className="heading">
                {coin.name} (<span>{coin.symbol}</span>)
              </h3>{" "}
              <img src={coin.icon} alt="" />
              <div className="inner">
                <div className="inner-area">
                  <h3>Rank : {coin.rank}</h3>
                  <h3>Price : $ {coin.price}</h3>
                  <h3>Supply : {coin.availableSupply}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
