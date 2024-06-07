import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import Favorites from "../islands/Favorites.tsx"
import { DataType, State } from "../types.ts";
import { VideoType } from "../types.ts";

export const handler: Handlers<DataType,State> = {
    async GET(_req:Request, ctx:FreshContext<State,DataType>) {
      const URL_API = Deno.env.get("URL_API")
      const {data} = await axios.get(`${URL_API}/videos/${ctx.state.id}`)
      return await ctx.render({
        data:data, 
        user_id:ctx.state.id
      });
    },
  }

const videos = (props: PageProps<DataType>) => {
  const {data,user_id} = props.data
  return (
    <>
    <div class="video-page-container">
    <h1 class="video-list-title">Curso Deno Fresh</h1>
    <div class="video-list-container">
    </div>
    {
        data.map((valor : VideoType)=> {
            return(
                <div class="video-item" data-fresh-key={valor.id}>
                    <a href={`/video/${valor.id}`} class="video-link">
                        <img src={valor.thumbnail} alt={valor.title} 
                        class="video-thumbnail"></img>
                        <div class="video-info">
                            <h3 class="video-title">{valor.title}</h3>
                            <p class="video-description">{valor.description}</p>
                            <p class="video-release-date">Release date: {valor.date}</p>
                        </div>
                    </a>
                    <Favorites id={valor.id} fav={valor.fav} user_id={user_id}></Favorites>
                    </div>
            )
        })
    }
    </div>
    </>
  )
}

export default videos