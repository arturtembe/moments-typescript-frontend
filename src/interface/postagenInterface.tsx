import { imagePost } from "@/models/image";
import Postagem from "@/models/postagen";
import { comentarioInterfaceDTO } from "./update/postAll.update.interface";

export interface postagenModel{
    id?:string,
    conteudo?:string,
    usuario?:string,
    like?:boolean,
    usuarioCurrent?:boolean,
    image?:imagePost;
    comentarios?:comentarioInterfaceDTO[];
    getId():string,
    getConteudo():string,
    getUsuario():string,
    getLike():boolean,
    getUsuarioCurrent():boolean,
    getImage():imagePost,
    getComentarios():comentarioInterfaceDTO[];
    setId(id:string):void,
    setCouteudo(conteudo:string):void,
    setUsuario(usuario:string):void,
    setLike(like:boolean):void,
    setUsuarioCurrent(usuarioCurrent:boolean):void,
    setImage(image:imagePost):void
    setComentarios(comentarios:comentarioInterfaceDTO[]):void;
}
