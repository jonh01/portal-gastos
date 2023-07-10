import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Usuario } from '../@types/usuario';
import { findUsuByEmail } from '../services/api';

interface AuthSliceData {
    loading:boolean
    signed: boolean,
    usuario: Usuario | null,
    error: string;
}

const initialState: AuthSliceData = {
    loading:false,
    signed: false,
    usuario: null,
    error: "",
};

export const fetchUsuario = createAsyncThunk(
  "auth/fetchUsuario",
  async (email: string) => {
    try {
      const res = await findUsuByEmail(email);
      const data = await res.data;
      return data;
    } catch (error: any) {
      throw new Error("Erro ao obter usuario: " + error.message);
    }
  }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      signIn:  (state, action) => {
        state.usuario = action.payload.usuario;
        state.signed = true;
      },
      signOut: (state) => {
        state.usuario = null;
        state.signed = false;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchUsuario.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchUsuario.fulfilled, (state, action) => {
        state.loading = false;
        state.usuario = action.payload
      });
      builder.addCase(fetchUsuario.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : "";
      });
    },
  });

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
