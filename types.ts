export type VideoType = {
    title: string,
    thumbnail: string,
    description: string,
    duration: number,
    youtubeid: string,
    date: string,
    id: string,
    fav: boolean
}

export type DataType = {
  data: VideoType[]
  user_id: string
}

export type State = {
  id:string,
  name:string,
  email:string
}

export type ErrorMessageType = {
    message:string
}

export type FavouriteType = {
    id: string
    fav: boolean
    user_id: string
  }

export type DataTypeSingleVideo = {
  data: VideoType
  user_id: string
}

export type StateLayout = {
    name : string
  }