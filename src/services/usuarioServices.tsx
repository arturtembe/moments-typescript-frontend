import { lerCookie } from "@/helpers/eCookie";
import Usuario from "@/models/usuario";

export default class usuarioServices{
    endpoint?:string

    constructor(){
        //this.endpoint="http://localhost:8081/";
        this.endpoint="https://moments-next-mongodb.onrender.com/";
    }

    async registar(data:Object){
        let user:Usuario=new Usuario();

        return await fetch(`${this.endpoint}user/registro`,{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
        })

    }

    async login(data:Object){
        let user:Usuario=new Usuario();

        return await fetch(`${this.endpoint}user/login`,{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
        })

    }

    async getUsuario(){

        let user:Usuario=new Usuario();

        return await fetch(`${this.endpoint}user/token/${lerCookie('momentsData')}`)

    }

    async getAllUser(){
        
        return await fetch(`${this.endpoint}user/view`)
        .then(res=>res.json()).then(res=>{
            
            return res;

        }).catch(error=>{
            console.log('ERRROR: ',error);
        })
    }
    async getUsuarioCurrent(){

        let user:Usuario=new Usuario();

        return await fetch(`${this.endpoint}user/token/${lerCookie('momentsData')}`)
        .then(res=>res.json()).then(res=>{
            
            return res;

        }).catch(error=>{
            console.log('ERRROR: ',error);
        })

    }

}