import axios from "axios";

const fetchLatestRates = () => {
    const options = {
        method: 'GET',
        url: 'https://fixer-fixer-currency-v1.p.rapidapi.com/latest',
        params: {base: 'UAH', symbols: 'USD,EUR'},
        headers: {
            'X-RapidAPI-Key': '6f7ecd976fmsh1d8983d2092cce8p1b253cjsn646b033e4233',
            'X-RapidAPI-Host': 'fixer-fixer-currency-v1.p.rapidapi.com'
        }
    };
    return axios.request(options)
        .then((response) => response.data)
        .catch((error) => error);
}

const fetchCurrencySymbols = () => {
    const options = {
        method: 'GET',
        url: 'https://fixer-fixer-currency-v1.p.rapidapi.com/symbols',
        headers: {
            'X-RapidAPI-Key': '6f7ecd976fmsh1d8983d2092cce8p1b253cjsn646b033e4233',
            'X-RapidAPI-Host': 'fixer-fixer-currency-v1.p.rapidapi.com'
        }
    }
    return axios.request(options)
        .then((response) => response.data)
        .catch((error) => error);
}

const fetchCurrencyRatio = (from: string, to: string) => {
    const options = {
        method: 'GET',
        url: 'https://fixer-fixer-currency-v1.p.rapidapi.com/convert',
        params: {from, to, amount: '1'},
        headers: {
            'X-RapidAPI-Key': '6f7ecd976fmsh1d8983d2092cce8p1b253cjsn646b033e4233',
            'X-RapidAPI-Host': 'fixer-fixer-currency-v1.p.rapidapi.com'
        }
    };

    return axios.request(options).then((response) => response.data)
        .catch((error) => error);
}
export default {fetchLatestRates, fetchCurrencySymbols, fetchCurrencyRatio};
