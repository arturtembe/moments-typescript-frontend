import Postagem from "@/models/postagen";
import { getUsuarioCurrent } from "@/controllers/usuarioController";
import { imagePost } from "@/models/image";
import { postInterfaceDTO } from "@/interface/update/postAll.update.interface";

export default class postServices{
    endpoint?:string
    constructor(){
        //this.endpoint="http://localhost:8081/";
        this.endpoint="https://moments-next-mongodb.onrender.com/";
    }
    
    async add(obj:any){
        
        let data = await fetch(`${this.endpoint}postagens/add`,{
            method:'post',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                "Accept": "*/*"
            },
            body: new URLSearchParams(obj)
        })
        .then(res=>res.json())
        .then(res=>{
            return res;
        }).catch(error=>{
            console.log('ERRROR: ',error);
        })

        //console.log(data);
        if(data.status==200){
            location.href = '/compartilhar';
        }
        else{
            alert(`Houve um erro interno!`);
        }
        

    }
    /*
    async add(obj:any,pathImage:any){
        //usuario
        const usuario=await getUsuarioCurrent();

        let post:Postagem=new Postagem();

        let data={
            image:'',
            imageName:'',
            imageType:'',
            imagePath:'',
            conteudo:obj.conteudo,
            usuario:usuario.getId()
        }

        if(pathImage.src!=''){
            data={
                image:pathImage.src,
                imageName:pathImage.title,
                imageType:pathImage.type,
                imagePath:pathImage.path,
                conteudo:obj.conteudo,
                usuario:usuario.getId()
            }
        }
        
        const post_res= await fetch(`${this.endpoint}postagens/add`,{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
        }).then(res=>res.json()).then(res=>{
            return res;
        }).catch(error=>{
            console.log('ERRROR: ',error);
        })

        if(post_res.tipo==1){
            post.setId(post_res.postagem[0]._id);
            post.setCouteudo(post_res.postagem[0].conteudo);
            post.setUsuario(post_res.postagem[0].usuario);
        }

        return post;
        
    }*/

    addPo(data:any){

        const obj:any=data;
        console.log(JSON.stringify(data.filetoupload))

        fetch(`${this.endpoint}postagens/add`,{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
        }).then(res=>res.text()).then(res=>{
            
            console.log(res)

        }).catch(error=>{
            console.log('ERRROR: ',error);
        })

        //return post;
    }

    async getAll(){

        const usuario=await getUsuarioCurrent();

        //console.log(usuario.getId());
        
        let data:postInterfaceDTO[] = await fetch(`${this.endpoint}postagens/like/${usuario.getId()}`)
        .then(res=>res.json())
        .then((res)=>{
            return res;
        }).catch(error=>{
            console.log('ERRROR: ',error);
        });

        const postagem:Postagem[]=[];

        data.forEach((el:postInterfaceDTO,i:number) => {

            let post = new Postagem();
            post.setId(el.id);
            post.setUsuario(el.usuario.id);
            post.setCouteudo(el.conteudo);
            post.setLike(el.like);
            post.setUsuarioCurrent(el.like)
            post.setComentarios(el.comentarios)

            let img=new imagePost();
            img.setImage(el.images[0])

            post.setImage(img);

            postagem.push(post);
            
            //console.log(el.comentarios);
            
        });

        //console.log(data)

        return postagem;
    }

    async getAllUserCurrent(){

        const usuario = await getUsuarioCurrent();

        let data:postInterfaceDTO[] = await fetch(`${this.endpoint}postagens/share/${usuario.getId()}`)
        .then(res=>res.json())
        .then((res)=>{
            return res;
        }).catch(error=>{
            console.log('ERRROR: ',error);
        });

        const postagem:Postagem[]=[];
/*
        data.forEach((el:any,i:number) => {
            let post=new Postagem();
            post.setId(el._id);
            post.setUsuario(el.usuario);
            post.setCouteudo(el.conteudo);
            post.setLike(el.like);
            post.setUsuarioCurrent(el.usuarioLike)

            let img=new imagePost();
            img.setImage(el.image)

            post.setImage(img);

            postagem.push(post);
        });
        */
        data.forEach((el:postInterfaceDTO,i:number) => {

            let post = new Postagem();
            post.setId(el.id);
            post.setUsuario(el.usuario.id);
            post.setCouteudo(el.conteudo);
            post.setLike(el.like);
            post.setUsuarioCurrent(el.like)
            post.setComentarios(el.comentarios)

            let img=new imagePost();
            img.setImage(el.images[0])

            post.setImage(img);

            postagem.push(post);
            
            //console.log(el.comentarios);
            
        });

        //console.log(postagem[0])

        return postagem;
    }


    async getOne(id:string){
        
        const el:postInterfaceDTO[] = await fetch(`${this.endpoint}postagens/${id}`)
        .then(res=>res.json())
        .then((res)=>{
            return res;
        }).catch(error=>{
            console.log('ERRROR: ',error);
        });

        if(el.length>0){

            const post:Postagem=new Postagem();

            post.setId(el[0].id);
            post.setUsuario(el[0].usuario.id);
            post.setCouteudo(el[0].conteudo);

            let img=new imagePost();
            if(el[0].images.length>0)
            {
                img.setImage(el[0].images[0]);
            }
            else{
                img.setImage('');
            }
            post.setImage(img);
            
            //console.log(postagem[0])

            return post;

        }

        return {};

    }

    async edit(obj:any){
        
        await fetch(`${this.endpoint}postagens/edit`,{
            method:'post',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                "Accept": "*/*"
            },
            body: new URLSearchParams(obj)
        }).then(res=>res.json())
        .then(res=>{
            //console.log(res);
            if(res.status==200){
                location.href = '/compartilhar';
            }
            else{
                alert(`Houve um erro interno!`);
            }

        }).catch(error=>{
            console.log('ERRROR: ',error);
        })

    }

    async remove(id:string|undefined){
        
        //const endpoint=`http://localhost:8081/postagens/remove/${id}`;

        //console.log(endpoint);
        
        return await fetch(`${this.endpoint}postagens/remove/${id}`)
                    .then(res=>res.json())
                    .then(res=>{
                        return res;
                    })
                    .catch(error=>{
                        console.log(error);
                    })
    }

}