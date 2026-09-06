import {serve} from "bun";

serve({
    fetch(request){
        const url = new URL(request.url);
        if(url.pathname === '/'){
            return new Response("this is shit",{status:200});
        }else if(url.pathname === '/new-shit'){
            return new Response("this is new shit",{status: 200});
        }else{
            return new Response("this shit is not found", {status:404});
        }
    },
    port:3000,
    hostname: '127.0.0.1'
})