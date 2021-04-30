import React, { useState, useEffect } from 'react';
import BASE_URL from '../../utils/api';
import validate from './validateTopic';
import Input from '../../components/Input/Input';
import { useForm } from '../../utils/UseForm';
import axios from 'axios';
import { store } from 'react-notifications-component';
import { notification } from '../../utils/notifications';

function CreateTopic({ classid, topicId }) {
    const [loading, setLoading] = useState(false);
    const [pageMode, setPageMode] = useState('');

    const { onChangeHandler, inputValues, onSubmitHandler, errors } = useForm(
        submitHandler, validate, {}
    );

    useEffect(() => {
        if (topicId) {
            setPageMode('edit');
            axios.get(`${BASE_URL}/classes/${classid}/topics/${topicId}`)
                .then((resp) => {
                    const { data } = resp;

                    const initialvalues = {
                        name: data?.results?.name,
                        content: data?.results?.content,
                        stage: data?.results?.stage,
                        override: true
                    };

                    onChangeHandler(null, initialvalues);
                })
                .catch((err) => {
                    // console.log(err)
                })
        }

    }, [classid, onChangeHandler, topicId])

    function submitHandler() {
        if (pageMode === 'edit') {
            setLoading(true);
            delete inputValues.override;
            axios.put(`${BASE_URL}/classes/${classid}/topics/${topicId}`, inputValues)
                .then((resp) => {
                    const { data } = resp;
                    store.addNotification({
                        ...notification,
                        title: "Success",
                        message: "Class topic edited successfully.",
                        type: "success"
                    })
                    // console.log(data);
                })
                .catch((err) => {
                    store.addNotification({
                        ...notification,
                        title: "Error",
                        message: "Error editing class topic.",
                        type: "danger"
                    })
                    // console.log(err)
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            setLoading(true);
            axios.post(`${BASE_URL}/classes/${classid}/topics`, inputValues)
                .then(({ data }) => {
                    store.addNotification({
                        ...notification,
                        title: "Success",
                        message: "Class topic created successfully.",
                        type: "success"
                    })
                    // console.log(data)
                })
                .catch((err) => {
                    store.addNotification({
                        ...notification,
                        title: "Error",
                        message: "Error editing class topic.",
                        type: "danger"
                    })
                    // console.log(err)
                })
                .finally(() => {
                    setLoading(false);
                })
        }


    }
    return (
        <div>
            <h3 style={{ marginBottom: "10px" }}>{pageMode === 'edit' ? 'Edit Class Topic' : 'Create Class Topic'}</h3>
            <Input
                name="name"
                onChange={onChangeHandler}
                label="Topic Name"
                placeholder="What is Forex?"
                error={errors.name}
                value={inputValues.name || ''}
                type="text"

            />
            <Input
                name="content"
                onChange={onChangeHandler}
                label="Content"
                placeholder="Forex is forex"
                error={errors.content}
                value={inputValues.content || ''}
                rows="10"
                type="textarea"

            />
            <Input
                name="stage"
                onChange={onChangeHandler}
                placeholder='1'
                label="Stage"
                error={errors.stage}
                value={inputValues.stage || ''}
                type="number"
            />
            <button onClick={onSubmitHandler} disabled={loading} className="button button-login">Submit</button>
        </div>
    )
}

export default CreateTopic
