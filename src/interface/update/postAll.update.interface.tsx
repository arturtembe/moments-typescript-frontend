
interface usuarioInterfaceDTO{
    id: string;
    nome: string;
    email: string;
    eAdmin: number;
}

export interface comentarioInterfaceDTO{
    id: string;
    comentario: string;
    data: string;
    usuario: usuarioInterfaceDTO;
}

export interface postInterfaceDTO{
    id: string;
    conteudo: string;
    usuario: usuarioInterfaceDTO;
    usuarioLike: usuarioInterfaceDTO[];
    like: boolean;
    likeLength: number;
    images: string[];
    comentarios: comentarioInterfaceDTO[];
}
