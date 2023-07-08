import { createSlice } from '@reduxjs/toolkit';
import { Usuario } from '../@types/usuario';

interface AuthSliceData {
    signed: boolean,
    usuario: Usuario | null,
}

const initialState: AuthSliceData = {
    signed: false,
    usuario: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setUsuario: (state, action) => {
        state.usuario = action.payload;
      },
      signIn:  (state, action) => {
        state.usuario = action.payload.usuario;
        state.signed = true;
      },
      signOut: (state) => {
        state.usuario = null;
        state.signed = false;
      },
    },
  });

export const { setUsuario, signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
