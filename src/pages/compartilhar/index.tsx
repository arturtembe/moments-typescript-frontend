import Header from "@/pages/components/header";
import styles from '@/styles/scss/compartilhar.module.scss';
import { useEffect, useState } from "react";

// Controler
import { getAllPostagem } from "@/controllers/compartilharController";
import HeadMETA from "../components/head";

export default function Home() {

    const [active,setActive]=useState<number>(0);
    const [post,setPost]=useState<any[]>([]);

    useEffect(()=>{
        getAllPostagem(setPost)
    },[]);

    return (
        <main className={styles.main}>
            
            <HeadMETA title="Compartilhar"/>

            <Header tipo={1}/>

            <section className={styles.section}>

                <div className={styles.compartilhar}>

                    <div className={styles.btnPost}>
                        <a href="/compartilhar/nova">Nova publicacao</a>
                    </div>

                    <div className={styles.tab_header}>
                        
                        {active==0?(
                            <button className={styles.active}>My moments</button>
                        ):(
                            <button onClick={()=>setActive(0)}>My moments</button>
                        )}
                        {
                            active==1&&(
                            <button className={styles.active}>Partilhado</button>
                            )
                        }
                        
                    </div>

                </div>
                {
                    post
                }
            </section>
            
        </main>
    );
}
