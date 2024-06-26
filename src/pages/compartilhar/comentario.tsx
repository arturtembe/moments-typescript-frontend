
import { addComentario, getComentarioController } from '@/controllers/comentarioController';
import { getOnePostagem } from '@/controllers/postagemController';
import { comentarioInterfaceDTO } from '@/interface/update/postAll.update.interface';
import styles from '@/styles/scss/comentario.module.scss';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface commProps{
    comentario:any,
    setComentario:any,
    resComentario:comentarioInterfaceDTO[]
}

export default function Comentario(props:commProps) {
    const [erros,setErros]=useState<string[]>([]);
    const [sucesso,setSucesso]=useState<string[]>([]);

    const [id,setID]=useState<string>('');
    const [conteudo,setConteudo]=useState<string>('');
    
    const [pathFile,setPathFile]=useState<any>({src:'',title:'',alt:'Loading',type:'',path:'',
    filetoupload:''});
    const [img,setImg]=useState<any>({src:'',on:false})

    const [comentario,setComentario]=useState<any[]>([])
    const [comentarioValue,setComentarioValue]=useState<string>('')

    useEffect(()=>{
        getComentarioController(props.resComentario,setComentario);
        //console.log(props.comentario);
        
    },[]);

    function close(){
        props.setComentario({idPost:'',open:false})
    }

    return (
        <div className={styles.popup}>
            <main className={styles.main}>
                <header className={styles.header}>
                    <h1>Comentarios</h1>

                    <svg onClick={close} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                </header>

                <section className={styles.section}>
                    
                    {
                        comentario
                    }


                </section>

                <form method='post' className={styles.form} onSubmit={e=>addComentario(e,
                    props.comentario.idPost,
                    setComentario,setComentarioValue)}>
                    <input type="hidden" name='postagem' value={props.comentario.idPost} />
                    <input type="hidden" name='usuario' value={props.comentario.idUsuario} />
                    <input type='text' name='comentario' id='comentario' placeholder='Comentario' required
                    value={comentarioValue} onChange={e=>setComentarioValue(e.target.value)}/>
                    <button>Enviar</button>
                </form>

            </main>
        </div>
    );
}
