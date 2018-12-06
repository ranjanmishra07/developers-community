import React from 'react'
import {PropTypes} from 'prop-types';
import classnames from 'classnames';
function TextAreaGroup(props) {
  const {name,value,error,placeholder,info,onChange}=props;
  return (
    <div className="form-group">
    <textarea className={classnames("form-control form-control-lg", { "is-invalid": error })}
      placeholder={placeholder} name={name}
      value={value} onChange={onChange} />
      {info && <small className="form-text text-muted">{info}</small>}
    {error && (<div className="invalid-feedback">{error}</div>)}
  </div>
  )
}
TextAreaGroup.propTypes={
  name:PropTypes.string.isRequired,
  placeholder:PropTypes.string,
  value:PropTypes.string.isRequired,
  info:PropTypes.string,
  error:PropTypes.string,
  onChange:PropTypes.func.isRequired,
}
export default TextAreaGroup
