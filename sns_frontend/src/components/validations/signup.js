/**
 * Created by swpp on 02/05/17.
 */
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};
    let valid = true;

    if (Validator.isNull(data.username)) {
        errors.username = 'This field is required';
        valid = false;
    }
    if (Validator.isNull(data.email)) {
        errors.email = 'This field is required';
        valid = false;
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
        valid = false;
    }
    if (Validator.isNull(data.password)) {
        errors.password = 'This field is required';
        valid = false;
    }
    if (Validator.isNull(data.passwordConfirmation)) {
        errors.passwordConfirmation = 'This field is required';
        valid = false;
    }
    if (!Validator.equals(data.password, data.passwordConfirmation)) {
        errors.passwordConfirmation = 'Passwords must match';
        valid = false;
    }
    return {
        errors,
        valid
    }
}