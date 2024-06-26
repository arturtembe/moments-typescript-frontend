import likeServices from "@/services/likeServices";
import styles from '@/styles/scss/main.module.scss';
import { getUsuarioCurrent } from "./usuarioController";
import { likePost } from "@/models/like";

export const likeActive= async function(postagem:string,setLike:any) {
    
    let like=await new likeServices().getOneLIKE(postagem);
    like.tipo==1?setLike(true):setLike(false);
}

export const addLike= async function(e:any,postagem:string,likeClass:string) {
    
    const usuario=await getUsuarioCurrent();

    let data={
        postagem:postagem,
        usuario:usuario.getId()
    }

    let getLike=await new likeServices().getOneLIKE(postagem);
    //console.log(getLike);
    
    if(getLike.tipo==1){
        let remLike=await new likeServices().removeLIKE(postagem);
        if(remLike.tipo==1){
            //console.log(remLike);
            
            document.getElementById(`lk${postagem}`)?.classList.remove(likeClass)
        }
    }
    else{
        let like=await new likeServices().addLIKE(data);

        if(like[0].tipo==1){
            //console.log(like);
            document.getElementById(`lk${postagem}`)?.classList.add(likeClass)
        }
    }
    
}

export function getAllLikeCurrent(res:any,idPost:string){

    let like=false;

    res.forEach((el:any) => {
        if(`${el.postagem}`===idPost){
            like=true;
        }
    });

    return like;
}
