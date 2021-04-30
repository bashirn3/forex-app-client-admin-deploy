export default function validate(inputValues) {
    const errors = {};

    if (!inputValues.name) {
        errors.name = 'Topic name is required';
    }

    if (!inputValues.content) {
        errors.content = 'Class content is required';
    }

    if (!inputValues.stage) {
        errors.stage = 'Stage is required';
    }

    return errors;
}