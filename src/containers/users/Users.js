import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../utils/api';
import Loader from 'react-loader-spinner';



function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/users`)
            .then((resp) => {
                const { data } = resp;
                setUsers(data.results);
            })
            .catch((err) => {
                // console.log(err)
            })
            .finally(() => {
                setLoading(false);
            })

    }, [])
    return (
        <div>
            <table>
                <caption><h3>Users</h3></caption>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>First name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Class Payment</th>
                        <th>Signal Payment</th>
                    </tr>
                </thead>
                {loading ? (<Loader
                    className="page-loader"
                    visible={loading}
                    type="Rings"
                    color="#880000"
                    width={80}
                    height={80} />)
                    : <tbody>
                        {users.map((user, i) => {
                            return (
                                <tr key={user.id}>
                                    <td>{i + 1}</td>
                                    <td>{user?.user_profiles?.first_name}</td>
                                    <td>{user?.user_profiles?.last_name}</td>
                                    <td>{user?.email}</td>
                                    <td>{user?.username}</td>
                                    <td>{user?.user_profiles?.paid === true ? 'Paid' : 'Not Paid'}</td>
                                    <td>{user?.user_profiles?.signal_paid === true ? 'Paid' : 'Not Paid'}</td>
                                </tr>
                            )
                        })}
                    </tbody>}

            </table>
        </div>
    )
}

export default Users
