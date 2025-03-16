import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StocksList({ watchlists }) {
    const [stocks, setStocks] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (query) {
            fetchStocks();
        }
    }, [query]);

    const fetchStocks = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/stocks/?q=${query}`);
            setStocks(response.data);
        } catch (error) {
            console.error('Error fetching stocks:', error);
        }
    };

    const addToWatchlist = async (stockId, watchlistId) => {
        try {
            const response = await axios.post('http://localhost:8000/api/stocks/', {
                stock_id: stockId,
                // watchlist_id: watchlistId,
            });
            console.log('Stock added:', response.data);
            alert('Stock added successfully' + watchlists);

        } catch (error) {
            console.error('Error adding to watchlist:', error);
            alert(error.response?.data?.error || 'Failed to add stock' + stockId)
        }
    };

    return (
        <div>
            <h4>Watchlists</h4>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search stocks..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {stocks.map(stock => (
                <div key={stock.id} className="d-flex justify-content-between align-items-center">
                    <span>{stock.name} ({stock.symbol})</span>
                    <button
                        
                            onClick={() => addToWatchlist(stock.id)}
                            className="btn btn-primary btn-sm"
                        >
                            Add to Watchlist
                        </button>
                    {watchlists.map(watchlist => (
                        <button
                            key={watchlist.id}
                            onClick={() => addToWatchlist(stock.id, watchlist.id)}
                            className="btn btn-primary btn-sm"
                        >
                            Add to {watchlist.name}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default StocksList;
