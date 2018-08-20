/**
 * Created by swpp on 02/05/17.
 */
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};
    let valid = true;

    if (Validator.isNull(data.email)) {
        errors.email = 'This field is required';
        valid = false;
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
        valid = false;
    }
    return {
        errors,
        valid
    }
}
