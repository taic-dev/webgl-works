import { uuid } from "../utils/uuid"
import { MovieList } from "../types"
import GoneGirl from "../images/gone-girl.jpg"
import Seven from "../images/seven.jpeg"

export const MOVIE_LIST: MovieList[] = [
  {
    id: uuid(),
    director: "David Fincher",
    title: "GONE GIRL",
    description: "On their fifth wedding anniversary, writing teacher Nick Dunne returns home to find his wife Amy missing. Amy's fame as the inspiration for her parents' Amazing Amy children's books ensures widespread press coverage. The media find Nick's apathy towards the disappearance suspicious.",
    imgUrl: GoneGirl,
    link: 'https://en.wikipedia.org/wiki/Gone_Girl_(film)'
  },
  {
    id: uuid(),
    director: "David Fincher",
    title: "Seven",
    description: "In an unnamed city overcome with violent crime and corruption, disillusioned police detective William Somerset is one week from retirement. He is partnered with David Mills, a short-tempered, idealistic detective who recently relocated to the city with his wife, Tracy.",
    imgUrl: Seven,
    link: 'https://en.wikipedia.org/wiki/Seven_(1995_film)'
  },
  {
    id: uuid(),
    director: "David Fincher",
    title: "GONE GIRL",
    description: "On their fifth wedding anniversary, writing teacher Nick Dunne returns home to find his wife Amy missing. Amy's fame as the inspiration for her parents' Amazing Amy children's books ensures widespread press coverage. The media find Nick's apathy towards the disappearance suspicious.",
    imgUrl: GoneGirl,
    link: 'https://en.wikipedia.org/wiki/Gone_Girl_(film)'
  },
]