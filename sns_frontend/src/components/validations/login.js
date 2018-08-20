/**
 * Created by swpp on 02/05/17.
 */

import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};
    let valid = true;
    if (Validator.isNull(data.identifier)) {
        errors.identifier = 'This field is required';
        valid = false;
    }

    if (Validator.isNull(data.password)) {
        errors.password = 'This field is required';
        valid = false;
    }

    return {
        errors,
        valid
    };
}