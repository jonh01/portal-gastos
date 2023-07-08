import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TransacaoDia } from '../@types/transacao';

interface TransacaoSliceData {
    transacoes: TransacaoDia[] | null,
    saldo:number,
    entrada:number,
    saida:number
}

const initialState: TransacaoSliceData = {
    transacoes: null,
    saldo:0.00,
    entrada:0.00,
    saida:0.00
};

const transacaoSlice = createSlice({
    name: 'transacao',
    initialState,
    reducers: {
      setTransacoes: (state, action) => {
        state.transacoes = action.payload;
      },
      setSaldo: (state, action: PayloadAction<number>) => {
        state.saldo = action.payload;
      },
      setEntrada: (state, action: PayloadAction<number>) => {
        state.entrada = action.payload;
      },
      setSaida: (state, action: PayloadAction<number>) => {
        state.saida = action.payload;
      },
    },
  });

export const { setTransacoes, setSaldo, setEntrada, setSaida } = transacaoSlice.actions;

export default transacaoSlice.reducer;