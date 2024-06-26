import Postagem from "@/models/postagen";
import Usuario from "@/models/usuario";

export interface likePostModel{
    id?:string,
    postagem?:Postagem,
    usuario?:Usuario,
    getId():string,
    getPostagem():Postagem,
    getUsuario():Usuario,
    setId(id:string):void,
    setPostagem(postagem:Postagem):void,
    setUsuario(usuario:Usuario):void,
}