import React, {useEffect} from 'react';
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import classes from './Converter.module.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {fetchCurrencyRatioThunk, setFirstSelectedCurrency, setSecondSelectedCurrency} from "../../store/currencySlice";


const Converter = () => {

    const dispatch = useAppDispatch();
    const [firstValue, setFirstValue] = React.useState<string>('1');
    const [secondValue, setSecondValue] = React.useState<string>('');
    const {firstSelectedCurrency, secondSelectedCurrency, convertRatio} = useAppSelector(state => state.currency);
    console.log(convertRatio);
    const onFirstSelectChange = (selectedCurrency: string) => {
        dispatch(setFirstSelectedCurrency(selectedCurrency));
    }
    const onSecondSelectChange = (selectedCurrency: string) => {
        dispatch(setSecondSelectedCurrency(selectedCurrency));
    }
    const onFirstInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstValue(e.target.value);
        setSecondValue(convertRatio ? (+e.target.value * convertRatio).toFixed(2) : '');
    }
    const onSecondInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSecondValue(e.target.value);
        setFirstValue(convertRatio ? (+e.target.value / convertRatio).toFixed(2) : '');
    }
    useEffect(() => {
        dispatch(fetchCurrencyRatioThunk({from: firstSelectedCurrency, to: secondSelectedCurrency}));
    }, [dispatch, firstSelectedCurrency, secondSelectedCurrency]);

    useEffect(() => {
        setSecondValue(convertRatio ? (+firstValue * convertRatio).toFixed(2) : '');
    } , [convertRatio]);
    return (
        <div className={classes.Converter}>
            <h1 className={classes.Header}>Converter</h1>
            <div className={classes.CurrencyConverterWrapper}>
                <CurrencyInput
                    onSelectedCurrencyChange={onFirstSelectChange}
                    selectedCurrency={firstSelectedCurrency}
                    value={firstValue}
                    onChange={onFirstInputChange}
                />
                <span className={classes.Separator}></span>
                <CurrencyInput
                    onSelectedCurrencyChange={onSecondSelectChange}
                    selectedCurrency={secondSelectedCurrency}
                    value={secondValue}
                    onChange={onSecondInputChange}
                />
            </div>
        </div>
    );
};

export default Converter;
