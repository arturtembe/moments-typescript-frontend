
import { getUsuario } from '@/controllers/usuarioController';
import { lerCookie,deletarCookie } from '@/helpers/eCookie';
import Usuario from '@/models/usuario';
import styles from '@/styles/scss/header.module.scss';
import { redirect } from 'next/dist/server/api-utils';
import { cookies } from 'next/headers';
import { useEffect, useState } from 'react';
import HeadMETA from './head';

interface headerProps{
    tipo:number
}

export default function Header(props:headerProps){

    const [iconMenu,setIconMenu]=useState<boolean>(true);

    const [navbar,setNavbar]=useState<string>("header_navbar__scHEe");

    const iconOnClose=()=>{
        !iconMenu?setNavbar("header_navbar__scHEe"):setNavbar("header_navbar__scHEe header_onclose__EVcty");
        setIconMenu(!iconMenu);
    }

    useEffect(()=>{
        lerCookie('momentsData')==''&&(location.assign('/login'))
        //console.log(cookies().get('momentsData'))
        //deletarCookie('momentsData')
        //console.log(styles.active)
    },[]);

    function tabOneM():string{
        return props.tipo==0?styles.active:'';
    }

    function tabTwoM():string{
        return props.tipo==1?styles.active:'';
    }

    function logout():void{
        lerCookie('momentsData')!=''&&(deletarCookie('momentsData'));
        lerCookie('momentsData')==''&&(location.assign('/login'));
    }

    function getTitle(){
        let title='Moments';
        if(props.tipo==1)
        {
            title='Compartilhar'
        }

        return title;
    }

    return(
        <div>
        <header className={styles.header}>
            <div className="logo">
                <h1>Moments</h1>
            </div>
            <nav id='navbar' className={navbar}>
                <a href="/" className={tabOneM()}>Moments</a>
                <a href="/compartilhar/" className={tabTwoM()}>Compartilhar</a>
                <a onClick={logout}>Logout</a>
            </nav>

            <div className={styles.icon}>
                {
                    iconMenu?(
                        <svg onClick={iconOnClose} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                    ):(
                        <svg onClick={iconOnClose} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
                    )
                }
            </div>

        </header>

        </div>
    )
}