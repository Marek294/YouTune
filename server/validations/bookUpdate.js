import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validate(data) {
    let errors = {};

    if(Validator.isEmpty(data.id)) errors.id = "Brak podanego id";
    if(Validator.isEmpty(data.title)) errors.title = "Wprowadź tytuł";
    if(Validator.isEmpty(data.author)) errors.author = "Wprowadź autora";

    return {
        errors,
        isValid: isEmpty(errors)
    }
}