import Postagem from "@/models/postagen";
import { getUsuarioCurrent } from "@/controllers/usuarioController";
import { imagePost } from "@/models/image";

export default class imageServices{
    endpoint?:string
    constructor(){
        //this.endpoint="http://localhost:8081/";
        this.endpoint="https://moments-next-mongodb.onrender.com/";
    }
    
    async addPost(postagem:string,pathImage:any){
    
        let img:imagePost=new imagePost();

        let data={
            image:pathImage.src,
            imageName:pathImage.title,
            imageType:pathImage.type,
            imagePath:pathImage.path,
            postagem:postagem
        }
        
        const img_res=await fetch(`${this.endpoint}postagens/add/image`,{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
        }).then(res=>res.json()).then(res=>{
            
            return res;

        }).catch(error=>{
            console.log('ERRROR: ',error);
        })
 
        if(img_res.tipo==1){
            //post
            img.setId(img_res.imagem[0]._id);
            img.setPostagem(img_res.imagem[0].postagem);
            //postt=1;
        }
    
        return img;
    }

    async uploadImg(formData:FormData){

        //const formData=new FormData()
        //formData.append('conteudo',data.conteudo)
        
        let data = await fetch(`${this.endpoint}postagens/add/upload`,{
            method:'post',
            headers:{
                //'Content-Type': 'multipart/form-data',
                'Accept': '*/*'
            },
            body: formData
        })
        .then(res=>res.json())
        .then(res=>{
            
            return res;
            //console.log(res)

        }).catch(error=>{
            console.log('ERRROR: ',error);
        })
        
        if(data.status==200){
            location.href = '/compartilhar';
        }
    }

    async editUploadImg(formData:FormData){

        //const formData=new FormData()
        //formData.append('conteudo',data.conteudo)
        
        let data = await fetch(`${this.endpoint}postagens/edit/upload`,{
            method:'post',
            headers:{
                //'Content-Type': 'multipart/form-data',
                'Accept': '*/*'
            },
            body: formData
        })
        .then(res=>res.json())
        .then(res=>{
            
            return res;
            //console.log(res)

        }).catch(error=>{
            console.log('ERRROR: ',error);
        })

        if(data.status==200){
            location.href = '/compartilhar';
            //console.log(data);
        }
    }
}