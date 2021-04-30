export default function validate(inputValues) {
    const errors = {};

    if (!inputValues.name) {
        errors.name = 'Class name is required';
    }

    if (!inputValues.description) {
        errors.description = 'Class description is required';
    }

    if (!inputValues.price) {
        errors.price = 'Price is required';
    }

    return errors;
}