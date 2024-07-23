// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Make a request to the backend to get all users
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const searchUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/search?username=${searchTerm}`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="App">
            <h1>Users :</h1>
            <input type="text" value={searchTerm} onChange={handleSearchChange} />
            <button onClick={searchUsers}>Search</button>
            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <strong>Username:</strong> {user.U_name}<br />
                            <strong>Email:</strong> {user.email}<br />
                            <strong>Role:</strong> {user.RoleType}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
}

export default App;
