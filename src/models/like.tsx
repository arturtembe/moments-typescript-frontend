import Postagem from "./postagen";
import Usuario from "./usuario";
import { likePostModel } from "@/interface/likeInterfaces";

export class likePost implements likePostModel{
    
    id?: string | undefined;
    postagem?: Postagem | undefined;
    usuario?: Usuario | undefined;

    constructor(){}

    // GET
    getId(): string {
        return this.id||'';
    }
    getPostagem(): Postagem {
        return this.postagem||new Postagem;
    }
    getUsuario(): Usuario {
        return this.usuario||new Usuario;
    }

    // SET
    setId(id: string): void {
        this.id=id;
    }
    setPostagem(postagem: Postagem): void {
        this.postagem=postagem;
    }
    setUsuario(usuario: Usuario): void {
        this.usuario=usuario;
    }
}