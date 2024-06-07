import { useSignal } from "@preact/signals";
import axios from "npm:axios";
import { FavouriteType } from "../types.ts";


const Favorites = (props: FavouriteType) => {
  const {id, fav, user_id} = props
  const mi_fav = useSignal(fav)
  async function HandleFavourite() {
    const data = await axios.post(`https://videoapp-api.deno.dev/fav/${user_id}/${id}`) 
    if (data.status == 200){
        mi_fav.value = !mi_fav.value
    }
  }
  return (
    <>
        <button class="fav-button" onClick={() => HandleFavourite()} >
            {mi_fav.value ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
        </button>
    </>
  )
}

export default Favorites