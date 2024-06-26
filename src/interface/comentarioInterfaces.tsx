import Postagem from "@/models/postagen";
import Usuario from "@/models/usuario";

export interface comentarioModel{
    id?:string,
    comentario?:string,
    postagem?:Postagem,
    usuario?:Usuario,
    getId():string,
    getComentario():string,
    getPostagem():Postagem,
    getUsuario():Usuario,
    setId(id:string):void,
    setComentario(comentario:string):void,
    setPostagem(postagem:Postagem):void,
    setUsuario(usuario:Usuario):void,
}