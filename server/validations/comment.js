import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validate(data) {
    let errors = {};

    if(!data.bookId) errors.bookId = "Podaj identyfikator książki";
    if(Validator.isEmpty(data.text)) errors.text = "Wprowadź komentarz";
    if(!Validator.isEmpty(data.text) && data.text.length > 255) errors.text = "Komentarz jest za długi";

    return {
        errors,
        isValid: isEmpty(errors)
    }
}