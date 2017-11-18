import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validate(data) {
    let errors = {};

    if(!data.bookId) errors.bookId = "Podaj identyfikator książki";
    if(data.isPositive === undefined) errors.isPositive = "Podaj ocenę";

    return {
        errors,
        isValid: isEmpty(errors)
    }
}