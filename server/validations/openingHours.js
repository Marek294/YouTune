import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validate(data) {
    let errors = {};

    if(data.isOpen && Validator.isEmpty(data.from)) errors.from = "Wystąpił błąd przy podawaniu godziny otwarcia biblioteki. Sprawdź jeszcze raz wprowadzone dane";
    if(data.isOpen && Validator.isEmpty(data.to)) errors.to = "Wystąpił błąd przy podawaniu godziny zamknięcia biblioteki. Sprawdź jeszcze raz wprowadzone dane";

    return {
        errors,
        isValid: isEmpty(errors)
    }
}