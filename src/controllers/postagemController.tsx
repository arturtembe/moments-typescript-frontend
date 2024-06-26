
import Postagem from "@/models/postagen";
import postServices from "@/services/postServices";

import styles from '@/styles/scss/main.module.scss';
import imageServices from "@/services/imageServices";
import { addLike, getAllLikeCurrent } from "./likeController";
import { getUsuarioCurrent, getUsuarioOne } from "./usuarioController";
import usuarioServices from "@/services/usuarioServices";
import likeServices from "@/services/likeServices";
import { comentarioInterfaceDTO } from "@/interface/update/postAll.update.interface";

export async function addPostagem(e:any,setErros:any,setSucesso:any){
    e.preventDefault();

    const formData:any = new FormData(e.target);
    const data=Object.fromEntries(formData);

    var msg:string[] = [];
    var imgTeste:boolean = true;

    if(!data.conteudo || typeof data.conteudo==undefined ||
        data.conteudo==null){
        msg.push('Conteudo Vazio!');
    }
    if(!data.filetoupload.name || typeof data.filetoupload==undefined ||
        data.filetoupload==null){
        msg.push('Image Invalido!');
        imgTeste = false;
    }

    if(msg.length==2){
        setErros(msg);
        return;
    }


    setSucesso([]);
    setErros([]);
    //let ig:any=data.image;

    if(imgTeste){
        // IMG UPLOAD
        //console.log([...formData]);
        await new imageServices().uploadImg(formData);
        
        return;
    }

    await new postServices().add(formData);
    /*
    let post:Postagem=await new postServices().add(data,pathFile);
    
    if(pathFile.path!=''){
        //console.log(post.getId()+' - '+post.id);
        if(post.getId()!=''){
            post.setImage(await new imageServices().addPost(post.getId(),pathFile));
            
            if(post.getImage().getId()!=''){

                //console.log(await new imageServices().uploadImg(pathFile))
                
                if(await new imageServices().uploadImg(pathFile)){
                    //Message Success
                    msg.push("Postado com sucesso!");
                    setSucesso(msg);
                }else{
                    //Message ERROR
                    msg.push("Houve um erro ao postar, por favor tente novamente!");
                    setErros(msg);
                }
                
            }
        }else{
            //console.log('algo errado');
            msg.push("Houve um erro, nao foi possivel completar o registro da sua postagem!");
            setErros(msg);
        }
    }
    else{
        //Right
        msg.push("Postado com sucesso!");
        setSucesso(msg);
    }
    */
}

export async function getAllPostagemMain(setPost:any,setComentar:any,setResComentario:any){
    
    const ddUser=await new usuarioServices().getAllUser();
    const userCurrent=await getUsuarioCurrent();

    const likeCurrent=await new likeServices().getAllLIKE();

    const res=await new postServices().getAll();
    let item:any[]=[];

        res.forEach((el:Postagem,i:number) => {
            
            let usuario=getUsuarioOne(ddUser,el.getUsuario());

            //let ddLike=getAllLikeCurrent(likeCurrent,el.getId());
            let ddLike= el.getUsuarioCurrent();

            let like:string=(ddLike?styles.active:'');

            let comentarioLength:any =  el.comentarios?.length;

            item.push(
                <div className={styles.my_moments} 
                    key={el.id} id={'rmv'+el.id}>
                        <div className={styles.box_usuario}>
                            <h1>{usuario.getNome()+' '+usuario.getSobrenome()}</h1>
                        </div>

                        <div className={styles.box_conteudo}>
                            {el.conteudo}
                        </div>

                        {
                            el.image?.getImage()!=''&&(
                                <div className={styles.box_img}>
                                    <img src={el.image?.getImage()} alt="Looading"/>
                                </div>
                            )
                        }
                        
                        <div className={styles.box_controls}>

                            <button className={like} id={'lk'+el.getId()}
                            onClick={e=>addLike(e,el.getId(),styles.active)}>Gostar</button>
                    
                            <button onClick={()=>{
                                setComentar({
                                    idPost:el.getId(),
                                    idUsuario:userCurrent.getId(),
                                    usuario:(usuario.getNome()+' '+usuario.getSobrenome()),
                                    open:true});
                                setResComentario(el.comentarios);
                            }}
                            >Comentar { comentarioLength>0 ? `(${comentarioLength})`: `` }</button>

                        </div>
                </div>
            )
        });

        setPost(item);

}

export async function getOnePostagem(id:string,setID:any,setConteudo:any,setImg:any,setPathFile:any){
        
        const res:any = await new postServices().getOne(`${id}`);
        //console.log(res)
        
        if(res){    
            setID(res.id)
            setConteudo(res.conteudo);
                
            if(res.image?.getImage()!=''){
                setImg({src:res.image?.getImage(),on:true})

                setPathFile({type:'0'})
                //console.log(res.image?.getImage().split('.').pop())
            }
            else{
                setImg({src:'',on:false})
            }
                //console.log(res)
        }
        
}
/*
export async function getOnePostagem(comentarios:comentarioInterfaceDTO[]){
        
    console.log(comentarios)
    
}*/

// Edit
export async function editPostagem(e:any,setErros:any,setSucesso:any){
    e.preventDefault();

    const formData:any = new FormData(e.target);
    const data=Object.fromEntries(formData);

    var msg:string[] = [];
    
    setSucesso([]);
    setErros([]);

    if(data.filetoupload.name =='' && data.fileSrc!=''){
        //alert(`Sem Image!`)
        await new postServices().edit(formData);
        return;
    }
    if(data.filetoupload.name !='' && data.fileSrc!=''){
        // IMG UPLOAD
        //console.log([...formData]);
        await new imageServices().editUploadImg(formData);
            
        //alert(`Com Imagem!`)
    
        return;
    }

    if(!data.conteudo || typeof data.conteudo==undefined ||
        data.conteudo==null){
        msg.push('Conteudo Vazio!');
    }

    setErros(msg);

}