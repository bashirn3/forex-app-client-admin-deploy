import { useState, useEffect } from 'react';
export const useForm = (
    callback,
    validate,
    initialValues,
) => {
    const [inputValues, setInputValues] = useState(initialValues || {});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            if (callback) {
                callback();
            } else {
                return;
            }
        }
        // eslint-disable-next-line
    }, [errors]);

    const onSubmitHandler = (event) => {
        if (event) {
            event.preventDefault();
        }
        setErrors(validate(inputValues));
        setIsSubmitting(true);
    };

    const onChangeHandler = (event, overRide = null) => {
        if (!event?.persist) {
            if (overRide && overRide.override) {
                setInputValues((inputValues) => ({
                    ...overRide,
                    [event?.name]: event?.value,
                }));
            } else {
                setInputValues((inputValues) => ({
                    ...inputValues,
                    [event?.name]: event?.value,
                }));
            }
        } else {
            event.persist();
            const target = event.target;
            if (target?.name) {
                setInputValues((inputValues) => ({
                    ...inputValues,
                    [target.name]: target.value,
                }));
            }
        }
    };

    return {
        onChangeHandler,
        onSubmitHandler,
        inputValues,
        errors,
    };
};
