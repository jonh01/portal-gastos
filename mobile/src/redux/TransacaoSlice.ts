import { createSlice } from '@reduxjs/toolkit';
import { TransacaoDia } from '../@types/transacao';

interface TransacaoSliceData {
    transacoes: TransacaoDia[] | null,
}

const initialState: TransacaoSliceData = {
    transacoes: null,
};

const transacaoSlice = createSlice({
    name: 'transacao',
    initialState,
    reducers: {
      setTransacoes: (state, action) => {
        state.transacoes = action.payload;
      },
    },
  });

export const { setTransacoes } = transacaoSlice.actions;

export default transacaoSlice.reducer;