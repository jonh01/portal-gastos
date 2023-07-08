export interface Usuario {
    id?:number,
    nome: string,
    saldo: number,
    email: string,
	senha: string,
};

export interface UsuarioLogin {
    email:string,
    senha:string,
};