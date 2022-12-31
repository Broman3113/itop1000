import React, {FC} from 'react';
import classes from './CurrencySelect.module.scss';
import Input from "../Input/Input";

type CurrencySelectProps = {
    currencyRates: {
        [key: string]: string,
    },
    className?: string,
    onSelectedCurrencyChange: (selectedCurrency: string) => void,
    selectedCurrency: string,
}
const CurrencySelect: FC<CurrencySelectProps> = ({currencyRates, selectedCurrency, className = "", onSelectedCurrencyChange}) => {
    const [isSelectOpen, setIsSelectOpen] = React.useState<boolean>(false);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const onSelectInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSelectedCurrencyChange(e.target.value);
    }
    const onSelectInputFocus = () => {
        setIsSelectOpen(true);
    }
    const onCurrencySelect = (key: string) => {
        onSelectedCurrencyChange(key);
        setIsSelectOpen(false);
    }

    const closeOpenMenus = (e: any)=>{
        if(wrapperRef.current && wrapperRef && !wrapperRef.current.contains(e.target)){
            setIsSelectOpen(false)
        }
    }

    document.addEventListener('mousedown',closeOpenMenus)

    return (
        <div className={[classes.CurrencySelect, className].join(' ')} ref={wrapperRef}>
            <Input type="text"
                   value={selectedCurrency}
                   onChange={onSelectInputChange}
                   onFocus={onSelectInputFocus}
                   className={classes.CurrencySelectInput}
                   placeholder={'Currency'}
            />
            <span className={classes.SelectIcon}></span>
            <ul className={[classes.CurrencyList, !isSelectOpen && classes.CurrencyListHidden].join(' ')}>
                {Object.keys(currencyRates).filter(key => {
                    return key.toLowerCase().includes(selectedCurrency.toLowerCase()) || currencyRates[key].toLowerCase().includes(selectedCurrency.toLowerCase());
                }).map((key) =>
                    <li key={key} onClick={() => onCurrencySelect(key)}>
                        {key}: {currencyRates[key]}
                    </li>
                )
                }
            </ul>
        </div>
    );
};

export default CurrencySelect;
