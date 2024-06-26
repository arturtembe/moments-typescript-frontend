import Header from "@/pages/components/header";
import styles from '@/styles/scss/compartilhar_novo.module.scss';

// Controler
import { editPostagem, getOnePostagem } from "@/controllers/postagemController";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fileNovaPostagem } from "@/helpers/novaPostagem";
import { getUsuarioCurrent } from "@/controllers/usuarioController";
import HeadMETA from "../components/head";

export default function nova(){
    const [erros,setErros]=useState<string[]>([]);
    const [sucesso,setSucesso]=useState<string[]>([]);

    const [id,setID]=useState<string>('');
    const [conteudo,setConteudo]=useState<string>('');
    
    const [pathFile,setPathFile]=useState<any>({src:'',title:'',alt:'Loading',type:'',path:'',
    filetoupload:''});
    const [img,setImg]=useState<any>({src:'',on:false})

    const [IDUSER,setIDUser]=useState<string>('')

    const router=useRouter();
    useEffect(()=>{
        if(!router.isReady) return;
        
        const {id}=router.query;

        getOnePostagem(`${id}`,setID,setConteudo,setImg,setPathFile)

        getID()

    },[router.isReady]);

    async function getID(){
        setIDUser((await getUsuarioCurrent()).getId());
    }
    
    return(
        <main className={styles.main}>

            <HeadMETA title="Editar a Publicacao"/>
            
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
                }
                
                {/* method="post"
                action="http://localhost:8081/postagens/edit" 
                encType="multipart/form-data" */}
                <form className={styles.form}
                    onSubmit={e=>editPostagem(e,setErros,setSucesso)}>

                    <input type="hidden" name="id" value={id} onChange={e=>setID(e.target.value)} />

                    <input type="hidden" name="usuario" value={IDUSER} />

                    <input type="hidden" name="fileType" value={pathFile.type} />
                    <input type="hidden" name="fileSrc" value={img.src} />

                    <label>Conteudo</label>
                    <textarea name="conteudo" value={conteudo}
                    onChange={e=>setConteudo(e.target.value)}></textarea>

                    <label>Image</label>
                    <input type="file" name="filetoupload" accept=".png,.jpeg,.jpg"
                    onChange={e=>fileNovaPostagem(e,setPathFile,setImg)}/>

                    {
                        img.on&&(
                            <img src={img.src} alt="edit001"
                            width={50} height={50}/>
                        )
                    }

                    <button type="submit">Actualizar</button>
                    
                </form>

            </section>

        </main>
    )
}