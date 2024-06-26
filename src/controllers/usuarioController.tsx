import Usuario from "@/models/usuario";
import usuarioServices from "@/services/usuarioServices";
import {criarCookie, deletarCookie} from '@/helpers/eCookie';

export function registarUsuario(e:any,setErros:any,setSucesso:any):void{
    e.preventDefault();

    const data=Object.fromEntries(new FormData(e.target));

    let msg=[];

    if(!data.nome || typeof data.nome==undefined ||
        data.nome==null){
        msg.push('Nome Invalido');
    }
    if(!data.sobrenome || typeof data.sobrenome==undefined ||
        data.sobrenome==null){
        msg.push('Sobrenome Invalido');
    }
    if(!data.email || typeof data.email==undefined ||
        data.email==null){
        msg.push('Email Invalido');
    }
    if(!data.senha || typeof data.senha==undefined ||
        data.senha==null){
        msg.push('Senha Invalido');
    }
    if(!data.re_senha || typeof data.re_senha==undefined ||
        data.re_senha==null){
        msg.push('Re-Senha Invalido');
    }

    if(data.re_senha !=data.senha){
        msg.push('Senha diferente');
    }

    if((data.email+'').indexOf('@')==-1 || (data.email+'').indexOf('.')==-1){
        msg.push(`Email Invalido`);
    }
    if((data.email+'').split('@').length>2){
        msg.push('Email Invalido (.)');
    }

    if((data.senha+'').length<8){
        msg.push('Senha dever ter de 8 ou mais caracteres');
    }

    if(msg.length>0){
        setErros(msg);
    }
    else{
        setErros([]);
        setSucesso([]);

        const row=new usuarioServices().registar(data)
        
        row.then(res=>res.json()).then(res=>{
            
            if(res[0].tipo==0){
                msg.push(res[0].texto)
                setErros(msg);
            }
            else{
                msg.push(res[0].texto)
                setSucesso(msg);
                
                criarCookie("momentsData", res[0].token);
                
                location.assign('/');
            }

        }).catch(error=>{
            console.log('ERRROR: ',error);
        })
    }
}

export function loginUsuario(e:any,setErros:any,setSucesso:any):void{
    e.preventDefault();

    const data=Object.fromEntries(new FormData(e.target));

    let msg=[];

    if(!data.email || typeof data.email==undefined ||
        data.email==null){
        msg.push('Email Invalido');
    }
    if(!data.senha || typeof data.senha==undefined ||
        data.senha==null){
        msg.push('Senha Invalido');
    }

    if((data.email+'').indexOf('@')==-1 || (data.email+'').indexOf('.')==-1){
        msg.push(`Email Invalido`);
    }
    if((data.email+'').split('@').length>2){
        msg.push('Email Invalido (.)');
    }

    if((data.senha+'').length<8){
        msg.push('Senha dever ter de 8 ou mais caracteres');
    }

    if(msg.length>0){
        setErros(msg);
    }
    else{
        setErros([]);
        setSucesso([]);
        
        const row=new usuarioServices().login(data)
        
        row.then(res=>res.json()).then(res=>{
            
            if(res[0].tipo==0){
                msg.push(res[0].texto)
                setErros(msg);
            }
            else{
                msg.push(res[0].texto)
                setSucesso(msg);
                
                criarCookie("momentsData", res[0].token);

                location.assign('/');
            }

        }).catch(error=>{
            console.log('ERRROR: ',error);
        })
        
    
    }
}

export function getUsuario(setUsuario:any):void{

    const row=new usuarioServices().getUsuario()
        
        row.then(res=>res.json()).then(res=>{
            
            if(res[0].tipo==0){
                //
                deletarCookie('momentsData')
                location.assign('/login');
            }
            else{
                let user=new Usuario();
                user.setId(res[0].usuario._id)
                user.setNome(res[0].usuario.nome);
                user.setSobrenome(res[0].usuario.sobrenome);
                
                setUsuario(user)
            }

        }).catch(error=>{
            console.log('ERRROR: ',error);
        })
}

export async function getUsuarioCurrent(){

    let user:Usuario=new Usuario;

    const res= await new usuarioServices().getUsuarioCurrent()
        
    if(res[0].tipo==0){
        //
        deletarCookie('momentsData')
        location.assign('/login');
    }
    else{
        user=new Usuario();
        user.setId(res[0].usuario._id)
        user.setNome(res[0].usuario.nome);
        user.setSobrenome(res[0].usuario.sobrenome);
        
    }

    return user;

}

export function getUsuarioOne(res:any,idUser:string){

    let user:Usuario=new Usuario;
        
    res.forEach((el:any) => {
        if(`${el._id}`===`${idUser}`){
            user.setId(el._id)
            user.setNome(el.nome);
            user.setSobrenome(el.sobrenome);
        }
    });

    return user;

}