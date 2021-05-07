import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';
import BASE_URL from '../../utils/api';
import './Signals.css';
import Modal from '../../components/Modal/Modal';
import CreateSignal from './CreateSignal';
import Loader from 'react-loader-spinner';
import { store } from 'react-notifications-component';
import { notification } from '../../utils/notifications';

function Signals() {
    const [editId, setEditId] = useState('');
    const [loading, setLoading] = useState(false);
    const [signals, setSignals] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [modalView, setModalView] = useState(false);
    useEffect(() => {
        setLoading(true)
        axios.get(`${BASE_URL}/signals`)
            .then((resp) => {
                const { data } = resp;
                setSignals(data.results);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])


    return (
        <div>
            <Modal closeModal={() => { setModalView(!modalView); setEditId('') }} show={modalView}>
                <CreateSignal id={editId} />
            </Modal>
            <Modal closeModal={() => { setDeleteModal(!deleteModal); setEditId('') }} show={deleteModal}>
                <SignalDeleteConfirmation closeModal={() => setDeleteModal(!deleteModal)} id={editId} />
            </Modal>
            <button onClick={() => setModalView(!modalView)} style={{ float: 'right', backgroundColor: 'black', marginRight: '10px' }} className='button button-login'>New</button>
            <table>
                <caption><h3>Signals</h3></caption>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Currency Pair</th>
                        <th>Order</th>
                        <th>Entry</th>
                        <th>Take Profit 1</th>
                        <th>Take Profit 2</th>
                        <th>Take Profit 3</th>
                        <th>Stop Loss</th>
                        <th>Action</th>
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
                        {signals?.map((signal, i) => {
                            return (
                                <tr key={signal.id}>
                                    <td>{i + 1}</td>
                                    <td>{signal?.currency_pair}</td>
                                    <td>{signal?.type}</td>
                                    <td>{signal?.entry}</td>
                                    <td>{signal?.take_profit_1 || '-'}</td>
                                    <td>{signal?.take_profit_2 || '-'}</td>
                                    <td>{signal?.take_profit_3 || '-'}</td>
                                    <td>{signal?.stop_loss}</td>
                                    <td>
                                        <button onClick={() => { setModalView(!modalView); setEditId(signal?.id) }} className='btn'>Edit</button>
                                        <button onClick={() => { setDeleteModal(!deleteModal); setEditId(signal?.id) }} className='btn disable'>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>}

            </table>
        </div>
    )
}

export default Signals

function SignalDeleteConfirmation({ closeModal, id }) {
    const [loading, setLoading] = useState(false);

    function handleDelete() {
        setLoading(true);
        axios.delete(`${BASE_URL}/signals/${id}`)
            .then((resp) => {
                const { data } = resp;
                // console.log(data);
                store.addNotification({
                    ...notification,
                    title: "Success",
                    message: "Signal deleted successfully.",
                    type: "success"
                })
            })
            .catch((err) => {
                // console.log(err)
                store.addNotification({
                    ...notification,
                    title: "Error",
                    message: "Error deleting signal.",
                    type: "danger"
                })
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <div style={{ textAlign: 'center' }}>
            <span>Are you sure you want to delete this signal?</span>
            <div class='confirm-button-container'>
                <button className='btn' disabled={loading} onClick={() => handleDelete()}>Yes</button>
                <button className='btn' onClick={() => closeModal()}>No</button>
            </div>

        </div>
    )
}
