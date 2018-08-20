/**
 * Created by swpp on 02/05/17.
 */
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};
    let valid = true;
    //console.log(data);

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
