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
    descricao?: string|null,
    valor?: number|null,
}

export interface TransacaoDia {
    data: string;
    transacao: Transacao[];
}
