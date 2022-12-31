import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {fetchCurrencySymbolsThunk, fetchLatestRatesThunk} from "./store/currencySlice";
import Converter from "./components/Converter/Converter";

function App() {
  const dispatch = useAppDispatch();
  const {rates, supportedCurrencies} = useAppSelector(state => state.currency);
  console.log(rates);
    console.log(supportedCurrencies);
  useEffect(() => {
    dispatch(fetchLatestRatesThunk());
    dispatch(fetchCurrencySymbolsThunk());
  } , [dispatch]);
  return (
    <div className="App">
      <Header currencyRates={rates}/>
      <Converter/>
    </div>
  );
}

export default App;
