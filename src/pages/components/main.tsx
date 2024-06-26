import Header from "@/pages/components/header";
import styles from '@/styles/scss/main.module.scss';
import { useEffect, useState } from "react";

// Controler
import { getAllPostagemMain } from "@/controllers/postagemController";
import Comentario from "../compartilhar/comentario";
import HeadMETA from "./head";
import { comentarioInterfaceDTO } from "@/interface/update/postAll.update.interface";

export default function Main() {

    const styleObj:any={
    }

    const [active,setActive]=useState<number>(0);
    const [post,setPost]=useState<any[]>([]);

    const [comentar,setComentar]=useState<any>({idPost:'',idUsuario:'',usuario:'',open:false});

    const [resComentario, setResComentario] = useState <comentarioInterfaceDTO[]>([]);

    useEffect(()=>{
        getAllPostagemMain(setPost,setComentar,setResComentario)
    },[]);

    return (
        <main className={styles.main}>

            <HeadMETA title="Moments"/>

            <Header tipo={0}/>

            <section className={styles.section}>
                {
                    post
                }
            </section>

                {   
                    comentar.open&&(
                        <section className={styles.popupComentario}>
                            <Comentario comentario={comentar} setComentario={setComentar}
                            resComentario={resComentario}/>                
                        </section>
                    )
                }
            
        </main>
    );
}
