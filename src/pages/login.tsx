import { loginUsuario, registarUsuario } from '@/controllers/usuarioController';
import { lerCookie } from '@/helpers/eCookie';
import styles from '@/styles/scss/login.module.scss';

// Controler
import { useEffect, useState } from "react";
import HeadMETA from './components/head';

export default function registar(){
    const [erros,setErros]=useState<string[]>([]);
    const [sucesso,setSucesso]=useState<string[]>([]);

    useEffect(()=>{
        lerCookie('momentsData')!=''&&(location.assign('/'));
    },[]);

    return(
        <main className={styles.main}>
            <HeadMETA title={'Login'}/>

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
                action="" onSubmit={e=>loginUsuario(e,setErros,setSucesso)}>
                    
                    <div className={styles.box_form}>
                        <input type="email" name='email' placeholder='Email' required/>
                    </div>
                    <div className={styles.box_form}>
                        <input type="password" name='senha' placeholder='Senha'/>
                    </div>

                    <div className={styles.box_form}>
                        <button type="submit">Login</button>
                    </div>
                    <div className={styles.box_form}>
                        <span>
                            Nao tens uma conta?
                            <a href='/registar'>
                                Criar conta
                            </a>
                        </span>
                    </div>
                </form>

            </section>

        </main>
    )
}