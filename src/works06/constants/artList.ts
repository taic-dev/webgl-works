import { uuid } from "../utils/uuid"
import { MovieList } from "../types"
import GoneGirl from "../images/gone-girl.jpg"
import Seven from "../images/seven.jpeg"
import FightClub from "../images/fight-club.jpeg"
import PanicRoom from "../images/panic-room.jpeg"
import TheGirlwiththeDragonTattoo from "../images/the-girl-with-the-dragon-tattoo.jpeg"
import TheGame from "../images/the-game.jpeg"
import Zodiac from "../images/zodiac.jpeg"

export const MOVIE_LIST: MovieList[] = [
  {
    id: uuid(),
    director: "David Fincher",
    title: "GONE GIRL",
    description: "On their fifth wedding anniversary, writing teacher Nick Dunne returns home to find his wife Amy missing. Amy's fame as the inspiration for her parents' Amazing Amy children's books ensures widespread press coverage. The media find Nick's apathy towards the disappearance suspicious.",
    imgUrl: GoneGirl,
    link: 'https://en.wikipedia.org/wiki/Gone_Girl_(film)',
    width: 1.5,
    height: 1,
    x: 1,
    y: 1,
  },
  {
    id: uuid(),
    director: "David Fincher",
    title: "Seven",
    description: "In an unnamed city overcome with violent crime and corruption, disillusioned police detective William Somerset is one week from retirement. He is partnered with David Mills, a short-tempered, idealistic detective who recently relocated to the city with his wife, Tracy.",
    imgUrl: Seven,
    link: 'https://en.wikipedia.org/wiki/Seven_(1995_film)',
    width: 1,
    height: 1.5,
    x: -1.35,
    y: 1.1,
  },
  {
    id: uuid(),
    director: "David Fincher",
    title: "Fight Club",
    description: "The unnamed Narrator, an insomniac dissatisfied with his job and lifestyle, fakes illnesses to attend support groups for therapy. His relief is disrupted when another impostor, Marla Singer, joins the same groups. Viewing her as a mirror to his own deceit, he arranges for them to attend different sessions, to which she reluctantly agrees.",
    imgUrl: FightClub,
    link: 'https://en.wikipedia.org/wiki/Fight_Club',
    width: 1,
    height: 1.5,
    x: 1,
    y: -1.25,
  },
  {
    id: uuid(),
    director: "David Fincher",
    title: "Panic Room",
    description: "Recently divorced Meg Altman and her eleven-year-old daughter, Sarah, move into a four-story brownstone in New York City's Upper West Side. The house's previous owner, a reclusive millionaire, installed a 'panic room' to protect the occupants from intruders. The room is reinforced by concrete and steel on all sides and a thick steel door. There is also an extensive security system with multiple surveillance cameras and a public address system.",
    imgUrl: PanicRoom,
    link: 'https://en.wikipedia.org/wiki/Panic_Room',
    width: 1,
    height: 1.5,
    x: -1.3,
    y: -1.1,
  },
  {
    id: uuid(),
    director: "David Fincher",
    title: "The Girl \n with the Dragon Tattoo",
    description: "In Stockholm, journalist Mikael Blomkvist is recovering from the legal and professional fallout of a libel suit brought against him by businessman Hans-Erik Wennerström. The wealthy Henrik Vanger offers Blomkvist evidence against Wennerström in exchange for an unusual task: investigate the 40-year-old disappearance and presumed murder of Henrik's grandniece, 16-year-old Harriet.",
    imgUrl: TheGirlwiththeDragonTattoo,
    link: 'https://en.wikipedia.org/wiki/The_Girl_with_the_Dragon_Tattoo_(2011_film)',
    width: 1,
    height: 1.5,
    x: -2.3,
    y: 0,
  },
  {
    id: uuid(),
    director: "David Fincher",
    title: "The Game",
    description: "Nicholas Van Orton, a wealthy, selfish investment banker in San Francisco, has lunch with his estranged younger brother Conrad, who gifts him an unusual present for his 48th birthday— a voucher for a game offered by a company called Consumer Recreation Services (CRS). Though skeptical, he goes to the CRS office to apply, but the time-consuming psychological and physical examinations required irritate him, and he is later informed that his application has been rejected.",
    imgUrl: TheGame,
    link: 'https://en.wikipedia.org/wiki/The_Game_(1997_film)',
    width: 1,
    height: 1.5,
    x: 2.3,
    y: 0.5,
  },
  {
    id: uuid(),
    director: "David Fincher",
    title: "ZODIAC",
    description: "On July 4, 1969, an unknown man attacks Darlene Ferrin and Mike Mageau with a handgun at a lovers' lane in Vallejo, California. Only Mike survives.One month later, the San Francisco Chronicle receives encrypted letters written by the killer calling himself 'Zodiac,' who threatens to kill a dozen people unless his coded message containing his identity is published. Political cartoonist Robert Graysmith, who correctly guesses that his identity is not in the message, is not taken seriously by crime reporter Paul Avery or the editors and is excluded from the initial details about the killings. When the newspaper publishes the letters, a married couple deciphers one. In September, the killer stabs law student Bryan Hartnell and Cecelia Shepard at Lake Berryessa in Napa County; Cecelia dies two days later.",
    imgUrl: Zodiac,
    link: 'https://en.wikipedia.org/wiki/Zodiac_(film)',
    width: 1,
    height: 1.5,
    x: 0,
    y: 0.1,
  },
]