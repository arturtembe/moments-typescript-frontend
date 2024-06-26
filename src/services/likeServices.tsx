
import { getUsuarioCurrent } from "@/controllers/usuarioController";
import Postagem from "@/models/postagen";

export default class likeServices{
    endpoint?:string
    constructor(){
        //this.endpoint="http://localhost:8081/";
        this.endpoint="https://moments-next-mongodb.onrender.com/";
    }

    //LIKE
    async addLIKE(data:any){
        
        return await fetch(`${this.endpoint}like/add`,{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
        }).then(res=>res.json()).then(res=>{
            
            return res;
        }).catch(error=>{
            console.log('ERRROR: ',error);
        })
    }

    async getAllLIKE(){
        
        const userCurrent=await getUsuarioCurrent();

        return await fetch(`${this.endpoint}like/usuario/${userCurrent.getId()}`)
        .then(res=>res.json())
        .then(res=>{
            return res;
        }).catch(error=>{
            console.log('ERRROR: ',error);
        })
    }

    async getOneLIKE(postagem:string){
        
        return await fetch(`${this.endpoint}like/view/${postagem}/${(await getUsuarioCurrent()).getId()}`)
        .then(res=>res.json())
        .then(res=>{
            return res;
        }).catch(error=>{
            console.log('ERRROR: ',error);
        })
    }
    async removeLIKE(postagem:string){
        
        return await fetch(`${this.endpoint}like/delete/${postagem}/${(await getUsuarioCurrent()).getId()}`)
        .then(res=>res.json())
        .then(res=>{
            return res;
        }).catch(error=>{
            console.log('ERRROR: ',error);
        })
    }
}
