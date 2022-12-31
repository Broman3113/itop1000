import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import currencyAPI from "../api/currencyAPI";


type tCurrencyState = {
    base: string,
    date: string,
    rates: {
        [key: string]: number
    },
    currencyState: {
        status: 'loading' | 'success' | 'error',
        error: string | null
    },
    supportedCurrenciesState: {
        status: 'loading' | 'success' | 'error',
        error: string | null
    },
    supportedCurrencies: {
        [key: string]: string
    },
    convertRatio: number | null,
    firstSelectedCurrency: string,
    secondSelectedCurrency: string
}

export const fetchLatestRatesThunk = createAsyncThunk(
    'currency/fetchLatestRates',
    async (_, {dispatch, rejectWithValue}) => {
        return currencyAPI.fetchLatestRates()
            .then(data => dispatch(setCurrencies(data)))
            .catch(error => rejectWithValue(error.message))
    }
);

export const fetchCurrencySymbolsThunk = createAsyncThunk(
    'currency/fetchCurrencySymbols',
    async (_, {dispatch, rejectWithValue}) => {
        return currencyAPI.fetchCurrencySymbols()
            .then(data => dispatch(setSupportedCurrencies(data)))
            .catch(error => rejectWithValue(error.message))
    }
);

export const fetchCurrencyRatioThunk = createAsyncThunk(
    'currency/fetchCurrencyRatio',
    async (payload: { from: string, to: string }, {dispatch, rejectWithValue}) => {
        return currencyAPI.fetchCurrencyRatio(payload.from, payload.to)
            .then(data => dispatch(setConvertRatio(data)))
            .catch(error => rejectWithValue(error.message))
    }
);

export const currencySlice = createSlice({
    name: 'currency',
    initialState: {
        base: 'UAH',
        date: '',
        rates: {
            USD: 0,
            EUR: 0
        },
        supportedCurrencies: {},
        currencyState: {
            status: 'success',
            error: null
        },
        supportedCurrenciesState: {
            status: 'success',
            error: null
        },
        convertRatio: null,
        firstSelectedCurrency: 'USD',
        secondSelectedCurrency: 'UAH'
    } as tCurrencyState,
    reducers: {
        setCurrencies: (state, action) => {
            state.base = action.payload.base;
            state.date = action.payload.date;
            state.rates = action.payload.rates;
        },
        setSupportedCurrencies: (state, action) => {
            state.supportedCurrencies = action.payload.symbols;
        },
        setConvertRatio: (state, action) => {
            state.convertRatio = action.payload.info.rate;
        },
        setFirstSelectedCurrency(state, action) {
            state.firstSelectedCurrency = action.payload;
        },
        setSecondSelectedCurrency(state, action) {
            state.secondSelectedCurrency = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Handling loading and error state for fetchLatestRatesThunk
        builder.addCase(fetchLatestRatesThunk.pending, (state) => {
            state.currencyState = {
                status: 'loading',
                error: null
            }
        });
        builder.addCase(fetchLatestRatesThunk.fulfilled, (state) => {
            state.currencyState = {
                status: 'success',
                error: null
            }
        });
        builder.addCase(fetchLatestRatesThunk.rejected, (state, action) => {
            state.currencyState = {
                status: 'error',
                error: action.payload as string
            }
        });

        // Handling loading and error state for fetchCurrencySymbolsThunk
        builder.addCase(fetchCurrencySymbolsThunk.pending, (state) => {
            state.supportedCurrenciesState = {
                status: 'loading',
                error: null
            }
        });
        builder.addCase(fetchCurrencySymbolsThunk.fulfilled, (state) => {
            state.supportedCurrenciesState = {
                status: 'success',
                error: null
            }
        });
        builder.addCase(fetchCurrencySymbolsThunk.rejected, (state, action) => {
            state.supportedCurrenciesState = {
                status: 'error',
                error: action.payload as string
            }
        });
    }
})

export const {setCurrencies, setSupportedCurrencies, setConvertRatio, setFirstSelectedCurrency, setSecondSelectedCurrency} = currencySlice.actions;
export default currencySlice.reducer
