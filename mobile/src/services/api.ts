import { TipoTransacao } from '../@types/enums';
import { Transacao, TransacaoUpdate } from '../@types/transacao';
import { Usuario, UsuarioLogin } from './../@types/usuario';
import axios from "axios";

export const axiosInstance = axios.create({ baseURL: 'http://192.168.1.65:8080/'});

// Usuario

export const loginUsu = async (login:UsuarioLogin) => {

    const response = await axiosInstance.post('usuarios/login', login);
    return response;
};

export const AlterSenhaUsu = async (login:UsuarioLogin) => {

    const response = await axiosInstance.put('usuarios/senha', login);
    return response;
};

export const findUsuByEmail = async (email:string) => {

    const response = await axiosInstance.get(`usuarios?email=${email}`);
    return response;
};

export const findSaldoByUsuId = async (id:number) => {

    const response = await axiosInstance.get(`usuarios/${id}/saldo`);
    return response;
};

export const createUsu = async (usu:Usuario) => {

    const response = await axiosInstance.post('usuarios', usu);
    return response;
};

export const deleteUsu = async (id:number) => {

    const response = await axiosInstance.delete(`usuarios/${id}`);
    return response;
};

// Transacao

export const createTransacao = async (transacao:Transacao) => {

    const response = await axiosInstance.post('transacoes', transacao);
    return response;
};

export const AlterTransacao = async (transacao:TransacaoUpdate) => {

    const response = await axiosInstance.put('transacoes', transacao);
    return response;
};

export const deleteTransacao = async (id:number) => {

    const response = await axiosInstance.delete(`transacoes/${id}`);
    return response;
};

export const findAll = async (usuId:number, tipo?: TipoTransacao|null, dataini?:string|null, datafim?:string|null) => {

    let requestParam = '';
    if(dataini || datafim == null){
        requestParam = tipo == null? `transacoes?usuid=${usuId}`: `transacoes?usuid=${usuId}&tipo=${tipo}`;
    }
    else{
        requestParam = tipo == null? 
        `transacoes?usuid=${usuId}&dataini=${dataini}&datafim=${datafim}`:
        `transacoes?usuid=${usuId}&tipo=${tipo}&dataini=${dataini}&datafim=${datafim}`;
    }
    const response = await axiosInstance.get(requestParam);
    return response;
};

export const somaSaldoMes = async (usuId:number, tipo: TipoTransacao) => {

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()+1).padStart(2, '0');

    const dataini = `${year}-${month}-01`;
    const datafim = `${year}-${month}-${day}`;

    const requestParam = `transacoes/soma?usuid=${usuId}&tipo=${tipo}&dataini=${dataini}&datafim=${datafim}`;
    const response = await axiosInstance.get(requestParam);
    return response;
};

export const findById = async (id:number) => {

    const response = await axiosInstance.get(`transacoes/${id}`);
    return response;
};