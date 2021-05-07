import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../utils/api';
import { useHistory } from 'react-router-dom';
import CreateClass from './CreateClass';
import Modal from '../../components/Modal/Modal';
import Loader from 'react-loader-spinner';
import { store } from 'react-notifications-component';
import { notification } from '../../utils/notifications';


function Classes() {
    const [classes, setClasses] = useState([]);
    const [modalView, setModalView] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState('');

    const history = useHistory();
    useEffect(() => {
        setLoading(true)
        axios.get(`${BASE_URL}/classes`)
            .then((resp) => {
                const { data } = resp;
                setClasses(data.results);

            })
            .catch((err) => {
                // console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])
    return (
        <div>
            <Modal closeModal={() => { setModalView(!modalView); setEditId('') }} show={modalView}>
                <CreateClass editId={editId} />
            </Modal>
            <Modal show={deleteModal} closeModal={() => { setDeleteModal(!deleteModal); setEditId('') }}>
                <ClassDeleteConfirmation closeModal={() => setDeleteModal(!deleteModal)} classid={editId} />
            </Modal>
            <button onClick={() => setModalView(!modalView)} style={{ float: 'right', backgroundColor: 'black', marginRight: '10px' }} className='button button-login'>New</button>
            <table>
                <caption><h3>Classes</h3></caption>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Class Name</th>
                        <th>Price</th>
                        <th>Description</th>
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
                            classes.map((clas, i) => {
                                return (
                                    <tr key={clas.id}>
                                        <td>{i + 1}</td>
                                        <td>{clas?.name}</td>
                                        <td>${clas?.price}</td>
                                        <td>{clas?.description}</td>
                                        <td>
                                            <button onClick={() => history.push(`/app/topics/${clas?.id}`)} className='btn'>View Topics</button>
                                            <button onClick={() => { setModalView(!modalView); setEditId(clas?.id) }} className='btn'>Edit</button>
                                            <button onClick={() => { setDeleteModal(!deleteModal); setEditId(clas?.id) }} className='btn disable'>Delete</button>
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

export default Classes;

function ClassDeleteConfirmation({ classid, closeModal }) {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    function deleteTopic() {
        setLoading(true);
        axios.delete(`${BASE_URL}/classes/${classid}`)
            .then(({ data }) => {
                // console.log(data);
                history.push('/app/classes');
                store.addNotification({
                    ...notification,
                    title: "Success",
                    message: "Class deleted successfully.",
                    type: "success"
                })


            })
            .catch(() => {
                // console.log(err);
                store.addNotification({
                    ...notification,
                    title: "Error",
                    message: "Error deleting class.",
                    type: "danger"
                })

            })
            .finally(() =>
                setLoading(false));

    }
    return (
        <div style={{ textAlign: 'center' }}>
            <span>Are you sure you want to delete this class?</span>
            <div class='confirm-button-container'>
                <button className='btn' disabled={loading} onClick={() => deleteTopic()}>Yes</button>
                <button className='btn' onClick={() => closeModal()}>No</button>
            </div>

        </div>
    )
}
