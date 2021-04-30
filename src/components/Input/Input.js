import React from 'react';
import './Input.css';
import Select from 'react-select';
function Input(props) {
    return (
        <div>
            <label className='input-label'>{props.label}</label>
            {props.type === 'select' ? (
                <Select
                    options={props.options}
                    className={`select ${props.error && `form-group__error`}`}
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                    name={props.name}
                />
            ) : props.type === 'textarea' ? (
                <textarea
                    id={props.id}
                    name={props.name}
                    type={props.type}
                    value={props.value}
                    defaultValue={props.defaultValue}
                    onChange={props.onChange}
                    className={`form-group-textarea ${props.error && `form-group__error`}`}
                    placeholder={props.placeholder}
                    rows={props.rows}

                />
            )
                : (
                    <input
                        id={props.id}
                        name={props.name}
                        type={props.type}
                        value={props.value}
                        defaultValue={props.defaultValue}
                        onChange={props.onChange}
                        className={`form-group ${props.error && `form-group__error`}`}
                        placeholder={props.placeholder}
                        required={props.required}
                        step={props.step}
                        min="0"
                    />
                )}
            <div className="error__message">{props.error || ''}</div>
        </div>
    )
}

export default Input;

