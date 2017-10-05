import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validate(data) {
    let errors = {};

    if(Validator.isEmpty(data.firstname)) errors.firstname = "Podaj imię";
    if(Validator.isEmpty(data.lastname)) errors.lastname = "Podaj nazwisko";

    return {
        errors,
        isValid: isEmpty(errors)
    }
}