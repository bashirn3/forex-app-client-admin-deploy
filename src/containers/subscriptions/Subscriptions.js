import React, { useEffect, useState } from 'react';
import BASE_URL from '../../utils/api';
import axios from 'axios';
import Loader from 'react-loader-spinner';


function Subscriptions() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/subscriptions`)
            .then(({ data }) => {
                setSubscriptions(data.results);
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [])

    return (
        <div>
            <table>
                <caption><h3>Subscriptions</h3></caption>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Package</th>
                        <th>Price</th>
                        <th>Duration</th>
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
                        {subscriptions?.map((sub, i) => {
                            return (
                                <tr key={sub.id}>
                                    <td>{i + 1}</td>
                                    <td>{sub?.package}</td>
                                    <td>${sub?.price}</td>
                                    <td>{sub?.duration}</td>
                                </tr>
                            )
                        })}

                    </tbody>}

            </table>
        </div>
    )
}

export default Subscriptions;
