import { comentarioModel } from "@/interface/comentarioInterfaces";
import { resComentarioInterfaceDTO } from "@/interface/update/comentarioAll.update.interface";
import { comentarioInterfaceDTO } from "@/interface/update/postAll.update.interface";
import comentarioServices from "@/services/comentarioServices";

import styles from '@/styles/scss/comentario.module.scss';

export async function addComentario(e:any,idPost:string,setComentario:any,setComentarioValue:any){
    e.preventDefault();

    //console.log()
    const comm = await new comentarioServices().addComentario(Object.fromEntries(new FormData(e.target)))
    
    if(comm[0].tipo==1){
        
        setComentarioValue('');

        let comentarioRes:resComentarioInterfaceDTO = await new comentarioServices().getComentario(idPost);

        getComentarioController(comentarioRes.comentario,setComentario);
        
        //await getComentarioController(idPost,setComentario)
    }
    //console.log(comm);
}
/*
export async function getComentarioController(postagem:string,setComentario:any){

    const comm=await new comentarioServices().getComentario(postagem);

    let item:any[]=[];

    comm.forEach((el:comentarioModel)=>{
        
        item.push(
            <div key={el.id} className={styles.box_comentario}>
                <h1>{el.getUsuario().getNome()+' '+el.getUsuario().getSobrenome()}</h1>
                <p>
                    {el.getComentario()}
                </p>
            </div>
        )
    })

    setComentario(item)
    
}
*/
export async function getComentarioController(comentario:comentarioInterfaceDTO[],setComentario:any){

    let item:any[]=[];

    comentario.forEach((el:comentarioInterfaceDTO)=>{
        
        item.push(
            <div key={el.id} className={styles.box_comentario}>
                <h1>{el.usuario.nome}</h1>
                <p>
                    {el.comentario}
                </p>
            </div>
        )
    })

    setComentario(item)
    
}