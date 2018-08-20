import React from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({ id, field, value, label, error, type, onChange, checkUserExists }) => {
	var new_id = id+"_error";
  return (
    <div className={classnames('form-group', { 'has-error': error })}>
      <label className="control-label">{label}</label>
      <input
        id={id}
        onChange={onChange}
        onBlur={checkUserExists}
        value={value}
        type={type}
        name={field}
        className="form-control"
      />
    {error && <span id={new_id} className="help-block">{error}</span>}
    </div>  );
}

TextFieldGroup.propTypes = {
  id: React.PropTypes.string.isRequired,
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  error: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  checkUserExists: React.PropTypes.func
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup;
