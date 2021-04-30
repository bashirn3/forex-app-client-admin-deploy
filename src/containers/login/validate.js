export default function validate(inputValues) {
    const errors = {};

    if (!inputValues.username) {
        errors.username = 'Username is required';
    }

    if (!inputValues.password) {
        errors.password = 'Password is required';
    }

    return errors;
}