import React from 'react'
import {PropTypes} from 'prop-types';
import classnames from 'classnames';
function InputFieldGroup(props) {
  const {name,value,error,type,placeholder,icon,info,onChange}=props;
  return (
    <div className="input-group mb-3">
    <div className="input-group-prepend">
      <span className="input-group-text">
        <i className={icon}/>
      </span>
    </div>
    <input type={type} className={classnames("form-control form-control-lg", { "is-invalid": error })}
      placeholder={placeholder} name={name}
      value={value} onChange={onChange} />
      {info && <small className="form-text text-muted">{info}</small>}
    {error && (<div className="invalid-feedback">{error}</div>)}
  </div>
  )
}
InputFieldGroup.propTypes={
  name:PropTypes.string.isRequired,
  placeholder:PropTypes.string,
  value:PropTypes.string.isRequired,
  info:PropTypes.string,
  error:PropTypes.string,
  type:PropTypes.string.isRequired,
  onChange:PropTypes.func.isRequired,
  icon:PropTypes.string,
}
InputFieldGroup.defaultProps={
  type:'text'
}
export default InputFieldGroup
