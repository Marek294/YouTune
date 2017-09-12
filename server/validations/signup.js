import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validate(data) {
    let errors = {};

    if(!Validator.isEmail(data.email)) errors.email = "Email jest nieprawidłowy";
    if(Validator.isEmpty(data.email)) errors.email = "Wprowadź email";

    if(Validator.isEmpty(data.password)) errors.password = "Wprowadź hasło";

    if(!Validator.equals(data.password,data.confirmPassword)) errors.confirmPassword = "Hasła muszą się powtarzać";
    if(Validator.isEmpty(data.confirmPassword)) errors.confirmPassword = "Wpisz hasło jeszcze raz";

    return {
        errors,
        isValid: isEmpty(errors)
    }
}