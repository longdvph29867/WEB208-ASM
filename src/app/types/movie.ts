export type Movie = {
  _id: string,
  name: string,
  poster: string,
  director: string
  cast: string,
  genre: string | Genre[],
  runingTime: number,
  language: string,
  rated: number,
  trailer: string,
  imgBanner: string
}
export type Genre = {_id: string, categoryName: string, categorySlug: string}
