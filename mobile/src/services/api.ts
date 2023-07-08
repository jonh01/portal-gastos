import { Transacao, TransacaoUpdate } from '../@types/transacao';
import { Usuario, UsuarioLogin } from './../@types/usuario';
import axios from "axios";

const axiosInstance = axios.create({ baseURL: 'http://localhost:8080/'});

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

export const findAll = async (usuId:number, dataini:string|null, datafim?:string|null) => {

    const requestParam = dataini || datafim == null? `transacoes?usuid=${usuId}`: `transacoes?usuid=${usuId}&dataini=${dataini}&datafim=${datafim}`;

    const response = await axiosInstance.get(requestParam);
    return response;
};

export const findById = async (id:number) => {

    const response = await axiosInstance.get(`transacoes/${id}`);
    return response;
};