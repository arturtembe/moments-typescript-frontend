import { comentarioModel } from "@/interface/comentarioInterfaces";
import Postagem from "./postagen";
import Usuario from "./usuario";

export class comentarioPost implements comentarioModel{
    
    id?: string | undefined;
    comentario?: string | undefined;
    postagem?: Postagem | undefined;
    usuario?: Usuario | undefined;

    constructor(){}

    // GET
    getId(): string {
        return this.id||'';
    }
    getComentario(): string {
        return this.comentario||'';
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
    setComentario(comentario: string): void {
        this.comentario=comentario;
    }
    setPostagem(postagem: Postagem): void {
        this.postagem=postagem;
    }
    setUsuario(usuario: Usuario): void {
        this.usuario=usuario;
    }
}