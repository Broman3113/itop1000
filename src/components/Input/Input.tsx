import React, {FC} from 'react';
import classes from './Input.module.scss';

type InputProps = {
    type?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void,
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
    className?: string,
    placeholder?: string,
}
const Input: FC<InputProps> = ({
                                   type= 'text',
                                   value,
                                   onChange,
                                   onFocus,
                                   onBlur,
                                   className,
                                   placeholder,
}) => {
    return (
        <input type={type}
               className={[classes.Input, className].join(' ')}
               value={value}
               onChange={onChange}
               onFocus={onFocus}
               onBlur={onBlur}
               placeholder={placeholder}
        />
    );
};

export default Input;
