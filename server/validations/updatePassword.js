import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validate(data) {
    let errors = {};

    if(Validator.isEmpty(data.password)) errors.password = "Wprowadź hasło";
    if(!Validator.equals(data.password,data.confirmPassword)) errors.confirmPassword = "Hasła muszą się powtarzać";

    return {
        errors,
        isValid: isEmpty(errors)
    }
}