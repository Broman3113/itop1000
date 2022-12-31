import React, {FC} from 'react';
import CurrencySelect from "../CurrencyDropdown/CurrencySelect";
import {useAppSelector} from "../../hooks/hooks";
import classes from './CurrencyInput.module.scss';
import Input from "../Input/Input";

type CurrencyInputProps = {
    onSelectedCurrencyChange: (selectedCurrency: string) => void,
    selectedCurrency: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const CurrencyInput: FC<CurrencyInputProps> = ({
                                                   onSelectedCurrencyChange,
                                                   selectedCurrency,
                                                   value,
                                                   onChange
                                               }) => {
    const {supportedCurrencies} = useAppSelector(state => state.currency);


    return (
        <div className={classes.CurrencyInputField}>
            <Input type="text" className={classes.CurrencyInput} placeholder={"Value"} value={value} onChange={onChange}/>
            <CurrencySelect currencyRates={supportedCurrencies} className={classes.CurrencySelect}
                            onSelectedCurrencyChange={onSelectedCurrencyChange} selectedCurrency={selectedCurrency}/>
        </div>
    );
};

export default CurrencyInput;
