
export const criarCookie=function(nome:string, valor:string) {
        var dtExpira:string = "expires= "+"Tue, 01 Jan 2115 12:00:00 UTC ";
        document.cookie = nome + "=" + valor + "; " + dtExpira+"; path=/;";
    }

export const lerCookie=function(nome:string) {
        var vnome:string = nome + "=";
        var ca = document.cookie.split(';');
        
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
        
            if (c.indexOf(vnome) == 0) return c.substring(vnome.length,c.length);
        }
        return "";
    }

export const deletarCookie=function(nome:string) {
        var dtExpira:string = "expires= "+"Tue, 01 Jan 1970 00:00:00 UTC ";
        document.cookie = nome + "=; " + dtExpira+"; path=/;";
    }