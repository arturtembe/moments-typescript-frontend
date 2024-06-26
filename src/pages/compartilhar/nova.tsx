import Header from "@/pages/components/header";
import styles from '@/styles/scss/compartilhar_novo.module.scss';
    
// Controler
import { addPostagem } from "@/controllers/postagemController";
import { useEffect, useState } from "react";
import { errorPostagem, fileNovaPostagem } from "@/helpers/novaPostagem";
import { getUsuarioCurrent } from "@/controllers/usuarioController";
import { useRouter } from "next/router";
import HeadMETA from "../components/head";

export default function nova(){
    const [erros,setErros]=useState<string[]>([]);
    const [sucesso,setSucesso]=useState<string[]>([]);
    const [pathFile,setPathFile]=useState<any>({src:'',title:'',alt:'Loading',type:'',path:'',
    filetoupload:''});
    const [img,setImg]=useState<any>({src:'',on:false})

    const [ID,setID]=useState<string>('')

    const router=useRouter();
    useEffect(()=>{
        if(!router.isReady) return;
        
        const {ref}=router.query;

        errorPostagem(`${ref}`,setErros);

        getID()

    },[router.isReady])

    async function getID(){
        setID((await getUsuarioCurrent()).getId());
        
    }

    return(
        <main className={styles.main}>
            
            <HeadMETA title="Nova Publicacao"/>

            <Header tipo={1}/>

            <section className={styles.section}>

                { 
                    erros.length>0&&(
                        <div className={styles.msg_erro}>{erros[0]}</div>
                    )
                }
                {
                    sucesso.length>0&&(
                        <div className={styles.msg_sucesso}>{sucesso[0]}</div>
                    )
                    //  onSubmit={(e)=>addPostagem(e,setErros,setSucesso,pathFile)}

                    //encType="multipart/form-data"
                }

                {/*
                method="post"
                action="http://localhost:8081/postagens/add" 
                encType="multipart/form-data"
                */}
                
                <form className={styles.form} 
                    onSubmit={e=>addPostagem(e,setErros,setSucesso)}>

                    <input type="hidden" name="usuario" value={ID} />

                    <input type="hidden" name="fileType" value={pathFile.type} />

                    <label>Conteudo</label>
                    <textarea name="conteudo" id="conteudo" ></textarea>

                    <label>Image</label>
                    <input type="file" name="filetoupload" id="filetoupload" onChange={e=>fileNovaPostagem(e,setPathFile,setImg)} 
                    accept=".png,.jpeg,.jpg"/>

                    {
                        img.on&&(
                            <img src={img.src} alt="edit001"
                            width={50} height={50}/>
                        )
                    }

                    <button type="submit">Postar</button>
                    
                </form>

            </section>

        </main>
    )
}