import React, {FC} from 'react';
import classes from './Header.module.scss';

type HeaderProps = {
    currencyRates: {
        [key: string]: number,
    }
}
const Header: FC<HeaderProps> = ({currencyRates}) => {
    return (
        <header className={classes.Header}>
            <a href="/" className={classes.Logo}>ITOP1000</a>
            <div className={classes.CurrencyBlock}>
                Currency rates:
                <ul className={classes.CurrencyList}>
                    {Object.keys(currencyRates).map((key) =>
                        <li key={key}>
                            {key}: {currencyRates[key]}
                        </li>
                    )}
                </ul>
            </div>
        </header>
    );
};

export default Header;
