import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validate(data) {
    let errors = {};

    if(Validator.isEmpty(data.receiverId)) errors.receiverId = "Nieprawidłowy odbiorca";

    if(Validator.isEmpty(data.title)) errors.title = "Wprowadź tytuł";
    if(Validator.isEmpty(data.body)) errors.title = "Wprowadź wiadomość";

    return {
        errors,
        isValid: isEmpty(errors)
    }
}