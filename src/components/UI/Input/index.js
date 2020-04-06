import React from 'react';
import './Input.scss';

function  isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched;
}

const Input = props => {
    const inputType = props.type || 'text';

    const htmlFor = `${inputType}-${(Math.random()).toFixed(2) * 100}`;
    const cls = ['Input'];

    if (isInvalid(props)) {
        cls.push('inValid');
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                id={htmlFor}
                type={inputType}
                value={props.value}
                onChange={props.onChange}
            />

            {isInvalid(props) ?  <span className='error'>{props.errorMessage || 'Заполните поле'}</span> : null}

        </div>
    );
};

export default Input;