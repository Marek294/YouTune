import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validate(data) {
    let errors = {};

    if(!Array.isArray(data.bookIds)) errors.bookIds = "Podaj identyfikator książki";
    if(!data.userId) errors.userId = "Podaj identyfikator użytkownika";

    return {
        errors,
        isValid: isEmpty(errors)
    }
}