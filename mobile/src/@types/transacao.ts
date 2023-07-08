import { TipoTransacao } from "./enums";

export interface Transacao {

    id?:number,
    descricao: string,
    valor: number,
    data:string,
    tipo: TipoTransacao,
    usuarioId: number,
}

export interface TransacaoUpdate {

    id:number,
    descricao?: string,
    valor?: number,
}

export interface TransacaoDia {
    [data: string]: Transacao[];
}
