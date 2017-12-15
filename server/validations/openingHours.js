import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validate(data) {
    const errors = {};

    data.map(item => {
        if(item.isOpen && Validator.isEmpty(item.from)) {
            if(!errors[item.day]) {
                errors[item.day] = {};
                errors[item.day].from = "Wystąpił błąd przy podawaniu godziny otwarcia biblioteki. Sprawdź jeszcze raz wprowadzone dane";
            }
            else errors[item.day].from = "Wystąpił błąd przy podawaniu godziny otwarcia biblioteki. Sprawdź jeszcze raz wprowadzone dane";
        }
        if(item.isOpen && Validator.isEmpty(item.to)) {
            if(!errors[item.day]) {
                errors[item.day] = {};
                errors[item.day].to = "Wystąpił błąd przy podawaniu godziny zamknięcia biblioteki. Sprawdź jeszcze raz wprowadzone dane";
            }
            else errors[item.day].to = "Wystąpił błąd przy podawaniu godziny zamknięcia biblioteki. Sprawdź jeszcze raz wprowadzone dane";
        }
    })

    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}