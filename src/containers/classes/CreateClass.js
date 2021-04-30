import React, { useEffect, useState } from 'react';
import Input from '../../components/Input/Input';
import axios from 'axios';
import BASE_URL from '../../utils/api';
import { useForm } from '../../utils/UseForm';
import validate from './validate';
import { store } from 'react-notifications-component';
import { notification } from '../../utils/notifications';

function CreateClass({ editId }) {
    const { onChangeHandler, inputValues, onSubmitHandler, errors } = useForm(
        submitHandler, validate, {}
    );
    const [loading, setLoading] = useState(false);
    const [pageMode, setPageMode] = useState('');

    useEffect(() => {
        if (editId) {
            setPageMode('edit');
            axios.get(`${BASE_URL}/classes/${editId}`)
                .then((resp) => {
                    const { data } = resp;

                    const initialvalues = {
                        name: data?.results?.name,
                        price: data?.results?.price,
                        description: data?.results?.description,
                        override: true
                    };

                    onChangeHandler(null, initialvalues);
                })
                .catch((err) => {
                    // console.log(err)
                })
        }

    }, [editId, onChangeHandler])

    function submitHandler() {

        if (pageMode === 'edit') {
            setLoading(true);
            delete inputValues.override;
            axios.put(`${BASE_URL}/classes/${editId}`, inputValues)
                .then((resp) => {
                    const { data } = resp;
                    store.addNotification({
                        ...notification,
                        title: "Success",
                        message: "Class edited successfully.",
                        type: "success"
                    })
                    // console.log(data);
                })
                .catch((err) => {
                    store.addNotification({
                        ...notification,
                        title: "Error",
                        message: "Error creating class.",
                        type: "danger"
                    })
                    // console.log(err)
                })
                .finally(() => {
                    setLoading(false)
                })

        } else {

            setLoading(true);
            axios.post(`${BASE_URL}/classes`, inputValues)
                .then((resp) => {
                    // console.log(resp.data)
                })
                .catch((err) => {
                    // console.log(err)
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }
    return (
        <div>
            <h3 style={{ marginBottom: "10px" }}>{pageMode === 'edit' ? 'Edit Class' : 'Create Class'}</h3>
            <Input
                name="name"
                onChange={onChangeHandler}
                label="Class Name"
                placeholder="Forex"
                error={errors.name}
                value={inputValues.name || ''}
                type="text"

            />
            <Input
                name="description"
                onChange={onChangeHandler}
                label="Class Description"
                error={errors.description}
                value={inputValues.description || ''}
                type="text"

            />
            <Input
                name="price"
                onChange={onChangeHandler}
                placeholder='$'
                label="Price"
                error={errors.price}
                value={inputValues.price || ''}
                type="number"
            />
            <button onClick={onSubmitHandler} disabled={loading} className="button button-login">Submit</button>
        </div>
    )
}

export default CreateClass;
