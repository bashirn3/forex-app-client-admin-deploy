import React, { useState, useEffect } from 'react';
import BASE_URL from '../../utils/api';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import './TopicDetail.css';
import CreateTopic from '../classes/CreateTopic';
import Modal from '../../components/Modal/Modal';
import Loader from 'react-loader-spinner';
import { store } from 'react-notifications-component';
import { notification } from '../../utils/notifications';


function TopicDetail() {

    const [topic, setTopic] = useState({});
    const [loading, setLoading] = useState(false);
    const [modalView, setModalView] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const { id, topic_id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/classes/${id}/topics/${topic_id}`)
            .then((resp) => {
                const { data } = resp;
                setTopic(data.results);
            })
            .catch((err) => {
                // console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [id, topic_id])
    
    return (
        <div className='topic-container'>
            <Modal show={modalView} closeModal={() => setModalView(!modalView)}>
                <CreateTopic classid={id} topicId={topic_id} />
            </Modal>
            <Modal show={deleteModal} closeModal={() => setDeleteModal(!deleteModal)}>
                <DeleteConfirmation classid={id} topicId={topic_id} closeModal={() => setDeleteModal(!deleteModal)} />
            </Modal>
            <h1>{topic?.name}</h1>
            {/* <div className='topic-image-container'>
                <img src="https://a.c-dn.net/b/4hTC25/support-and-resistance-trading_body_Supportandresistanceexplained-Copy.png" alt='topic_image'></img>
            </div> */}
            {loading ? (<Loader
                className="page-loader"
                visible={loading}
                type="Rings"
                color="#880000"
                width={80}
                height={80} />)
                : <>
                    <div>
                        {topic?.content}
                    </div>
                    <div class='topic-button-container'>
                        <button className='btn' onClick={() => setModalView(!modalView)}>
                            Edit
                    </button>
                        <button className='btn disable' onClick={() => setDeleteModal(!deleteModal)}>
                            Delete
                    </button>
                    </div>
                </>}


        </div>
    )
}

export default TopicDetail



function DeleteConfirmation({ classid, topicId, closeModal }) {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    function deleteTopic() {
        setLoading(true);
        axios.delete(`${BASE_URL}/classes/${classid}/topics/${topicId}`)
            .then(({ data }) => {
                // console.log(data);
                history.push(`/app/topics/${classid}`)
                store.addNotification({
                    ...notification,
                    title: "Success",
                    message: "Topic deleted successfully.",
                    type: "success"
                })

            })
            .catch((err) => {
                // console.log(err);
                store.addNotification({
                    ...notification,
                    title: "Error",
                    message: "Error deleting topic.",
                    type: "danger"
                })
            })
            .finally(() =>
                setLoading(false));

    }
    return (
        <div style={{ textAlign: 'center' }}>
            <span>Are you sure you want to delete this class topic?</span>
            <div class='confirm-button-container'>
                <button className='btn' disabled={loading} onClick={() => deleteTopic()}>Yes</button>
                <button className='btn' onClick={() => closeModal()}>No</button>
            </div>

        </div>
    )
}