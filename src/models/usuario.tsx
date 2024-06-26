import { imagePost } from "./image";

export default class Usuario{
    id?: string;
    nome?: string;
    sobrenome?: string;
    email?: string;
    senha?: string;
    msg?:string;
    token?:string;
    tipo?:number;

    /*
    constructor(id:string,nome:string,sobrenome:string,email:string,senha:string){
        this.id=id;
        this.nome=nome;
        this.sobrenome=sobrenome;
        this.senha=senha;
        this.email=email;
    }*/
    constructor(){}

    setId(id: string): void {
        this.id=id;
    }

    setNome(nome: string): void {
        this.nome=nome;
    }
    setSobrenome(sobrenome: string): void {
        this.sobrenome=sobrenome;
    }
    setSenha(senha: string): void {
        this.senha=senha;
    }
    setObjToken(msg: string,token:string,tipo:number): void {
        this.msg=msg;
        this.token=token;
        this.tipo=tipo;
    }

    // GET
    getId(): string {
        return this.id || '';
    }

    getNome(): string {
        return this.nome||'';
    }
    getSobrenome(): string {
        return this.sobrenome||'';
    }
    getEmail(): string {
        return this.email||'';
    }
    getSenha(): string {
        return this.senha||'';
    }
    getMsg(): string {
        return this.msg||'';
    }
    getToken(): string {
        return this.token||'';
    }
    getTipo(): number {
        return this.tipo||0;
    }

}