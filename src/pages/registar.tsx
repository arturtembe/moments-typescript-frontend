import { registarUsuario } from '@/controllers/usuarioController';
import { lerCookie } from '@/helpers/eCookie';
import styles from '@/styles/scss/registar.module.scss';

// Controler
import { useEffect, useState } from "react";
import HeadMETA from './components/head';

export default function registar(){

    //document.title="Registar";

    const [erros,setErros]=useState<string[]>([]);
    const [sucesso,setSucesso]=useState<string[]>([]);

    useEffect(()=>{
        lerCookie('momentsData')!=''&&(location.assign('/'));
    },[]);

    return(
        <main className={styles.main}>

            <HeadMETA title={'Registar'}/>

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
                
                <form className={styles.form} method="post"
                action="" onSubmit={e=>registarUsuario(e,setErros,setSucesso)}>

                    <div className={styles.box_form}>
                        <div className={styles.box_form}>
                            <input type="text" name='nome' placeholder='Nome' required/>
                        </div>
                        <div className={styles.box_form}>
                            <input type="text" name='sobrenome'  placeholder='Sobrenome' required/>
                        </div>
                    </div>
                    
                    <div className={styles.box_form}>
                        <input type="email" name='email' placeholder='Email' required/>
                    </div>
                    <div className={styles.box_form}>
                        <input type="password" name='senha' placeholder='Senha'/>
                    </div>
                    <div className={styles.box_form}>
                        <input type="password" name='re_senha' placeholder='Re-Senha'/>
                    </div>

                    <div className={styles.box_form}>
                        <button type="submit">Registar</button>
                    </div>

                    <div className={styles.box_form}>
                        <span>
                            Ja tens uma conta?
                            <a href='/login'>
                                Iniciar Sessao
                            </a>
                        </span>
                    </div>

                </form>

            </section>

        </main>
    )
}