import React, { useEffect, useState } from 'react';

function Watchlist() {
    const [watchlists, setWatchlists] = useState([]);
    const [name, setName] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/watchlists/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => setWatchlists(data))
        .catch(error => console.error('Error:', error));
    }, [token]);

    const handleCreateWatchlist = async () => {
        if (watchlists.length >= 5) {
            alert('Maximum 5 watchlists allowed.');
            return;
        }

        const response = await fetch('http://127.0.0.1:8000/api/watchlists/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name })
        });

        if (response.ok) {
            const newWatchlist = await response.json();
            setWatchlists([...watchlists, newWatchlist]);
            setName('');
        } else {
            const error = await response.json();
            alert(error.error);
        }
    };

    return (
        <div className="container">
            <h3>Watchlists</h3>
            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="New Watchlist Name" 
                className="form-control mb-2" 
            />
            <button 
                onClick={handleCreateWatchlist} 
                className="btn btn-primary mb-3"
            >
                Create Watchlist
            </button>
            <ul className="list-group">
                {watchlists.map(watchlist => (
                    <li key={watchlist.id} className="list-group-item">
                        {watchlist.name} ({watchlist.stocks.length} stocks)
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Watchlist;
