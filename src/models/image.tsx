import { imagePostModel } from "@/interface/imageInterface";

export class imagePost implements imagePostModel{
    
    id?: string | undefined;
    image?: string | undefined;
    postagem?: string | undefined;

    constructor(){}

    // GET
    getId(): string {
        return this.id||'';
    }
    getImage(): string {
        return this.image||'';
    }
    getPostagem(): string {
        return this.postagem||'';
    }

    // SET
    setId(id: string): void {
        this.id=id;
    }
    setImage(image: string): void {
        this.image=image;
    }
    setPostagem(postagem: string): void {
        this.postagem=postagem;
    }
}