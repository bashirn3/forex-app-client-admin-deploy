export default function validate(inputValues) {
    const errors = {};

    if (!inputValues.currencyPair) {
        errors.currencyPair = 'Currency Pair is required';
    }

    if (!inputValues.entry) {
        errors.entry = 'Entry Price is required';
    }
    if (!inputValues.type) {
        errors.type = 'Order Type  is required';
    }
    if (!inputValues.takeProfit1) {
        errors.takeProfit1 = 'Take Profit 1 is required';
    }
    if (!inputValues.stopLoss) {
        errors.stopLoss = 'Stop loss is required';
    }



    return errors;
}