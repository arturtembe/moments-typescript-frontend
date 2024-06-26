
export interface imagePostModel{
    id?:string,
    image?:string,
    postagem?:string,
    getId():string,
    getImage():string,
    getPostagem():string,
    setId(id:string):void,
    setImage(image:string):void,
    setPostagem(postagem:string):void,
}