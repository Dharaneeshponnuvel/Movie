import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './users.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users/users');
            setUsers(response.data.users);
            setTotalUsers(response.data.totalUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/users/${userId}`);
            fetchUsers(); // Refresh the user list after deletion
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container">
            <h1>Total Number of Users: {totalUsers}</h1>
            <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search by Username"
            />

            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>phone number</th>
                    <th>Gender</th>
                    <th>Address</th>
                    <th>Delete User</th>
                </tr>
                </thead>
                <tbody>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                        <tr key={index}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.Gender}</td>
                            <td>{user.Address}</td>
                            <td>
                                <button onClick={() => handleDeleteUser(user._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3">No users found</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
