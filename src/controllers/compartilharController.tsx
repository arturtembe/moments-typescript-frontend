
import Postagem from "@/models/postagen";
import postServices from "@/services/postServices";

import styles_share from '@/styles/scss/compartilhar.module.scss';
import { getUsuarioCurrent } from "./usuarioController";


function editarForm(link:string){
    location.assign(link);
}

export async function getAllPostagem(setPost:any){
    
    const usuario=await getUsuarioCurrent();

    const res=await new postServices().getAllUserCurrent();
    
    let item:any[]=[];
    
        await res.forEach((el:Postagem) => {
            
                item.push(
                    <div className={styles_share.my_moments} key={el.id} id={'rmv'+el.id}>
                            <div className={styles_share.box_usuario}>
                                <h1>{usuario.getNome()+' '+usuario.getSobrenome()}</h1>
                            </div>

                            <div className={styles_share.box_conteudo}>
                                {el.conteudo}
                            </div>

                            {
                                el.image?.getImage()!=''&&(
                                    <div className={styles_share.box_img}>
                                        <img src={el.image?.getImage()} alt="Looading"/>
                                    </div>
                                )
                            }
                            
                            <div className={styles_share.box_controls}>
                                <button onClick={()=>editarForm(`/compartilhar/editar?id=${el.id}`)}>
                                        Editar
                                </button>
                                <button onClick={()=>removePostagem(el.id)}>Remover</button>
                            </div>
                    </div>
                )

        })

        setPost(item);
    
}

// Remove
export async function removePostagem(id:string|undefined){
    
    let remove = await new postServices().remove(id)
    
    if(remove.status==200){
        document.getElementById(`rmv${remove.data}`)?.remove();
    }
    else{
        alert(`Houve um erro ao remover!`);
    }
    
    /*
    new postServices().remove(id)
    .then(res=>res.json())
    .then(res=>{
        
        if(res.length>0){
            //post
            //location.assign('/compartilhar/');
            document.getElementById(`rmv${id}`)?.remove();
            //console.log(res);
        }

    }).catch(error=>{
        console.log('ERRROR: ',error);
    });
    */
        
}