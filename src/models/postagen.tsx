import {postagenModel} from "@/interface/postagenInterface";
import { imagePost } from "./image";
import { comentarioInterfaceDTO } from "@/interface/update/postAll.update.interface";

export default class Postagem implements postagenModel{
    id?: string;
    conteudo?: string;
    usuario?: string | undefined;
    like?: boolean | undefined;
    usuarioCurrent?: boolean | undefined;
    image?: imagePost | undefined;
    comentarios?: comentarioInterfaceDTO[] | undefined;

    constructor(){
        this.like=false;
    }

    setId(id: string): void {
        this.id=id;
    }

    setCouteudo(conteudo: string): void {
        this.conteudo=conteudo;
    }
    setUsuario(usuario: string): void {
        this.usuario=usuario;
    }

    setLike(like: boolean): void {
        this.like=like;
    }

    setUsuarioCurrent(usuarioCurrent: boolean): void {
        this.usuarioCurrent=usuarioCurrent;
    }
    setImage(image: imagePost): void {
        this.image=image;
    }
    setComentarios(comentarios: comentarioInterfaceDTO[]): void {
        this.comentarios = comentarios;
    }

    // GET
    getId(): string {
        return this.id || '';
    }

    getConteudo(): string {
        return this.conteudo||'';
    }
    getUsuario(): string {
        return this.usuario||'';
    }

    getLike(): boolean {
        return this.like||false;
    }

    getUsuarioCurrent(): boolean {
        return this.usuarioCurrent||false;
    }

    getImage(): imagePost {
        return this.image||new imagePost;
    }

    getComentarios(): comentarioInterfaceDTO[] {
        return this.comentarios || [];
    }

}