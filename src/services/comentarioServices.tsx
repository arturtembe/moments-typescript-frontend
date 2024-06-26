import { getUsuarioCurrent, getUsuarioOne } from "@/controllers/usuarioController";
import { comentarioPost } from "@/models/comentario";
import usuarioServices from "./usuarioServices";
import { comentarioInterfaceDTO } from "@/interface/update/postAll.update.interface";
import { resComentarioInterfaceDTO } from "@/interface/update/comentarioAll.update.interface";

export default class comentarioServices{
    endpoint?:string
    constructor(){
        //https://moments-next-mongodb.onrender.com/
        //this.endpoint="http://localhost:8081/";
        this.endpoint="https://moments-next-mongodb.onrender.com/";
    }
    
    async addComentario(data:any){
        
        return await fetch(`${this.endpoint}comentario/add`,{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then(res=>res.json()).then(res=>{
            
            return res;

        }).catch(error=>{
            console.log('ERRROR: ',error);
        })
    }

    async getComentario(postagem:string){
        
        const res:resComentarioInterfaceDTO = await fetch(`${this.endpoint}comentario/view/${postagem}`)
        .then(res=>res.json()).then(res=>{    
            return res;
        }).catch(error=>{
            console.log('ERRROR: ',error);
        })
        /*
        const comm:comentarioPost[]=[]

        const ddUser=await new usuarioServices().getAllUser();

        res.forEach((el:comentarioInterfaceDTO) => {
                let commentario=new comentarioPost();
                commentario.setId(el.id);
                commentario.setComentario(el.comentario);

                commentario.setUsuario(getUsuarioOne(ddUser,el.usuario.id));

                comm.push(commentario);
        });
        */
        
        return res;
    }

}