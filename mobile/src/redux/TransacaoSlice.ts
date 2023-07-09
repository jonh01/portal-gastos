import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TransacaoDia } from "../@types/transacao";
import {
  axiosInstance,
  findAll,
  findSaldoByUsuId,
  somaSaldoMes,
} from "../services/api";
import { TipoTransacao } from "../@types/enums";

interface TransacaoSliceData {
  loading: boolean;
  transacoes: TransacaoDia[] | null;
  saldo: number;
  entrada: number;
  saida: number;
  error: string;
}

interface BuscaInfo {
  saldo: number;
  entrada: number;
  saida: number;
}

const initialState: TransacaoSliceData = {
  
  loading: false,
  transacoes: null,
  saldo: 0.0,
  entrada: 0.0,
  saida: 0.0,
  error: "",
};

export const fetchInfo = createAsyncThunk(
  "transacao/fetchInfo",
  async (id: number) => {
    try {
      const saldo = await findSaldoByUsuId(id);
      const entrada = await somaSaldoMes(id, TipoTransacao.ENTRADA);
      const saida = await somaSaldoMes(id, TipoTransacao.SAIDA);
      const busca: BuscaInfo = {
        saldo: saldo.data,
        entrada: entrada.data,
        saida: saida.data,
      };

      return busca;
    } catch (error: any) {
      throw new Error("Erro ao obter os dados: " + error.message);
    }
  }
);

const transacaoSlice = createSlice({
  name: "transacao",
  initialState,
  reducers: {
    setTransacao: (state, action) => {
      state.transacoes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.saldo = action.payload.saldo;
      state.entrada = action.payload.entrada;
      state.saida = action.payload.saida;
    });
    builder.addCase(fetchInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ? action.error.message : "";
    });
  },
});

export const { setTransacao } = transacaoSlice.actions;

export default transacaoSlice.reducer;
