import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function StocksList() {
    const [stocks, setStocks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchStocks();
    }, []);

    const fetchStocks = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/stocks/');
            setStocks(response.data);
        } catch (error) {
            console.error("Error fetching stocks:", error);
        }
    };

    const addToWatchlist = async (stockId) => {
        try {
            await axios.post('/api/watchlist/add/', { stock_id: stockId });
            alert("Stock added to watchlist!");
        } catch (error) {
            console.error("Error adding to watchlist:", error);
            alert("Failed to add stock to watchlist.");
        }
    };

    const filteredStocks = stocks.filter(stock =>
        stock.stock_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search Stocks"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="list-group">
                {filteredStocks.slice(0, 10).map(stock => (
                    <li key={stock.stock_code} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{stock.stock_name}</span>
                        <span className="ms-auto me-3">{stock.stock_price}</span>
                        <button 
                            className="btn btn-primary btn-sm" 
                            onClick={() => addToWatchlist(stock.stock_code)}>
                            Add to Watchlist
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StocksList;
