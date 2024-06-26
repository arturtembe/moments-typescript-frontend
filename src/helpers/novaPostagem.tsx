
export function fileNovaPostagem(e:any,setPathFile:any,setImg:any){
        
    let tg=e.target||window.event?.srcElement;
    let files=tg.files;

    //FileReader support
    if(FileReader && files && files.length){
        let fr=new FileReader();

        fr.onload=function(){
            let src:string=fr.result+'';
            
            setPathFile({src:src,alt:'',title:files[0].name,type:files[0].type.replace('image/','.'),
            path:URL.createObjectURL(files[0]),filetoupload:files[0]})
            //console.log(src)
            setImg({src:URL.createObjectURL(files[0]),filetoupload:files[0],on:true})
        }
        fr.readAsDataURL(files[0])
    }else{
        console.log('Houve um erro')
    }

}

export function errorPostagem(msg:string,setErro:any){
    
    switch(msg){
        case 'cfempty':setErro(['Conteudo e Image Invalido']);break;
        default:setErro([]);break;
    }
}