import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import Favorites from "../../islands/Favorites.tsx";
import { DataTypeSingleVideo, State } from "../../types.ts";




export const handler: Handlers<DataTypeSingleVideo,State> = {
  async GET(_req:Request, ctx:FreshContext<State,DataTypeSingleVideo>) {
    const mi_id = ctx.params.id
    const {data} = await axios.get(`https://videoapp-api.deno.dev/video/${ctx.state.id}/${mi_id}`)
    return await ctx.render({
      data:data, 
      user_id:ctx.state.id
    });
  },
}

const SingleVideo = (props: PageProps<DataTypeSingleVideo>) => {
  const {data,user_id} = props.data
  return (
    <>
     <div class="video-detail-container">
        <a href="/videos" class="back-button">← Go Back to List</a>
        <div class="video-frame">
          <iframe width="100%" height="400px" src={`https://www.youtube.com/embed/${data.youtubeid}`}
          title={data.title}
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen>
          </iframe>
        </div>
        <h2 class="video-detail-title">{data.title}</h2>
        <p class="video-detail-description">{data.description}</p>
        <Favorites id={data.id} fav={data.fav} user_id={user_id}></Favorites>
      </div>
    </>
  )
}

export default SingleVideo