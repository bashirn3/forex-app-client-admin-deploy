import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../utils/api';
import { useHistory, useParams } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import CreateTopic from './CreateTopic';
import Loader from 'react-loader-spinner';


function Topics() {
    const history = useHistory();
    const { id } = useParams();
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalView, setModalView] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/classes/${id}/topics`)
            .then((resp) => {
                const { data } = resp;
                setTopics(data.results);

            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [id])
    return (
        <div>
            <Modal closeModal={() => { setModalView(!modalView); }} show={modalView}>
                <CreateTopic classid={id} />
            </Modal>
            <button onClick={() => setModalView(!modalView)} style={{ float: 'right', backgroundColor: 'black', marginRight: '10px' }} className='button button-login'>New</button>
            <table>
                <caption><h3>Users</h3></caption>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Topic Name</th>
                        <th>Stage</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {loading ?
                    (<Loader
                        className="page-loader"
                        visible={loading}
                        type="Rings"
                        color="#880000"
                        width={80}
                        height={80} />)
                    : <tbody>
                        {
                            topics.map((topic, i) => {
                                return (
                                    <tr key={topic.id}>
                                        <td>{i + 1}</td>
                                        <td>{topic?.name}</td>
                                        <td>{topic?.stage}</td>
                                        <td>
                                            <button onClick={() => history.push(`/app/classes/${id}/topics/${topic?.id}`)} className='btn'>
                                                Topic Detail
                                    </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>}

            </table>
        </div>
    )
}

export default Topics;
