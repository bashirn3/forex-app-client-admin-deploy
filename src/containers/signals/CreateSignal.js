import React, { useState, useEffect } from 'react';
import Input from '../../components/Input/Input';
import axios from 'axios';
import BASE_URL from '../../utils/api';
import { useForm } from '../../utils/UseForm';
import validate from './validate';
import { store } from 'react-notifications-component';
import { notification } from '../../utils/notifications';

function CreateSignal({ id }) {

    const { onChangeHandler, inputValues, onSubmitHandler, errors } = useForm(
        submitHandler, validate, {}
    );
    const [loading, setLoading] = useState(false);
    const [pageMode, setPageMode] = useState('')

    useEffect(() => {
        if (id) {
            setPageMode('edit');
            axios.get(`${BASE_URL}/signals/${id}`)
                .then((resp) => {
                    const { data } = resp;
                    const initialvalues = {
                        currencyPair: data?.results?.currency_pair,
                        type: data?.results?.type,
                        entry: data?.results?.entry,
                        takeProfit1: data?.results.take_profit_1,
                        takeProfit2: data?.results.take_profit_2,
                        takeProfit3: data?.results.take_profit_3,
                        stopLoss: data?.results.stop_loss,
                        override: true
                    };

                    onChangeHandler(null, initialvalues);
                })
                .catch((err) => {
                    // console.log(err)
                })
        }

    }, [id])

    function submitHandler() {
        if (pageMode === 'edit') {
            setLoading(true);
            delete inputValues.override;
            axios.put(`${BASE_URL}/signals/${id}`, inputValues)
                .then((resp) => {
                    // const { data } = resp;
                    store.addNotification({
                        ...notification,
                        title: "Success",
                        message: "Signal edited successfully.",
                        type: "success"
                    })
                })
                .catch((err) => {
                    store.addNotification({
                        ...notification,
                        title: "Error",
                        message: "Error editing signal.",
                        type: "danger"
                    })
                    // console.log(err)
                })
                .finally(() => {
                    setLoading(false)
                })

        } else {
            setLoading(true);
            axios.post(`${BASE_URL}/signals`, inputValues)
                .then((resp) => {
                    // console.log(resp.data)
                    store.addNotification({
                        ...notification,
                        title: "Success",
                        message: "Signal created successfully.",
                        type: "success"
                    })
                })
                .catch((err) => {
                    store.addNotification({
                        ...notification,
                        title: "Error",
                        message: "Error creating signal.",
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
            <h3 style={{ marginBottom: "10px" }}>Create Signal</h3>
            <Input
                name="currencyPair"
                onChange={onChangeHandler}
                label="Currency Pair"
                placeholder="EURUSD"
                error={errors.currencyPair}
                type="text"
                value={inputValues.currencyPair || ''}
            />
            <Input
                name="type"
                onChange={onChangeHandler}
                placeholder="BUY"
                label="Order Type"
                error={errors.type}
                value={inputValues.type || ''}
                type="text"
            />
            <Input
                name="entry"
                onChange={onChangeHandler}
                label="Entry"
                error={errors.entry}
                value={inputValues.entry || ''}
                step="0.0001"
                type="number"
            />
            <Input
                name="takeProfit1"
                onChange={onChangeHandler}
                label="Take Profit 1"
                error={errors.takeProfit1}
                value={inputValues.takeProfit1 || ''}
                step="0.0001"
                type="number"
            />
            <Input
                name="takeProfit2"
                onChange={onChangeHandler}
                label="Take Profit 2"
                error={errors.takeProfit2}
                value={inputValues.takeProfit2 || ''}
                step="0.0001"
                type="number"
            />
            <Input
                name="takeProfit3"
                onChange={onChangeHandler}
                label="Take Profit 3"
                error={errors.takeProfit3}
                value={inputValues.takeProfit3 || ''}
                step="0.0001"
                type="number"
            />

            <Input
                name="stopLoss"
                onChange={onChangeHandler}
                label="Stop Loss"
                error={errors.stopLoss}
                value={inputValues.stopLoss || ''}
                step="0.0001"
                type="number"
            />
            <button onClick={onSubmitHandler} disabled={loading} className="button button-login">Submit</button>
        </div>
    )
}

export default CreateSignal
