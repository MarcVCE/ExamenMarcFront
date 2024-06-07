import { FreshContext, Handlers, PageProps, RouteConfig } from "$fresh/server.ts";
import axios from "npm:axios"
import jwt from "npm:jsonwebtoken@^9.0.2"
import {setCookie} from "$std/http/cookie.ts"

export const config : RouteConfig = {skipInheritedLayouts: true};

type ErrorMessageType = {
     message:string
}

export const handler: Handlers<ErrorMessageType> = {
  async POST(req:Request, ctx: FreshContext<unknown,ErrorMessageType>) {
    const url = new URL(req.url)
    const form = await req.formData();
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();
    const URL_API = Deno.env.get("URL_API")
    try{
        const {data,status} = await axios.post(`${URL_API}/checkuser`, {email,password})
        const JWT_SECRET = Deno.env.get("JWT_SECRET")
        if (!JWT_SECRET){
            throw new Error("JWT_SECRET is not set in the environment")
        }
        if (status == 200){
            const token = jwt.sign(
                {
                    email:data.email,
                    id: data.id,
                    name: data.name 
                },
                Deno.env.get("JWT_SECRET"),
                {
                    expiresIn: "24h"
                }
            )
            const headers = new Headers()
            setCookie(headers, {
                name: "auth",
                value: token,
                sameSite:"Lax",
                domain:url.hostname,
                path:"/",
                secure:true
            })
            headers.set("location","/videos")
            return new Response(null, {
                status: 303,
                headers
              });
        }
    }catch(error){
        if (error.response.status == 404){
            return ctx.render({
               message: "Credenciales incorrectas o el usuario no existe" 
            }) 
        }
    }
    return ctx.render()
  },
};


const login = (props: PageProps<ErrorMessageType>) => {
  const error_message = props.data?.message
  return (
        <div class="login-container">
            <h2>Login</h2>
            {error_message && <p class="error_message">{error_message}</p>}
            <form method="POST">
                <label for="email">Email</label>
                <input type="text" id="email" name="email" required></input>
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required></input>
                <button type="submit">Login</button>
                <p class="register-link">Don't have an account? <a href="/register">Register</a></p>
            </form>
        </div>
  )
}

export default login