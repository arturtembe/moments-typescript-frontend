
import Head from "next/head"
interface headeMetaProps{
    title:string
}
export default function HeadMETA(props:headeMetaProps){
    return(
        <Head>
            <title>{props.title}</title>
            <meta http-equiv="X-UA-Compatible" content="IE=7" />
            <meta name="description" content="" />
            <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        </Head>
    )
}