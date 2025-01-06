import texture1 from "../img/texture1.jpg";

export const PARAMS = {
  WINDOW: {
    W: window.innerWidth,
    H: window.innerHeight,
    PIXEL_RATIO: window.devicePixelRatio,
  },
  CAMERA: {
    FOV: 60,
    ASPECT: window.innerWidth / window.innerHeight,
    NEAR: 1,
    FAR: 1000,
    POSITION: {
      X: 0,
      Y: 0,
      Z: 1,
    },
  },
  PLANE_GEOMETRY: {
    X: 350,
    Y: 250,
    X_SEGMENTS: 1,
    Y_SEGMENTS: 1,
  },
  TEXTURE: [texture1],
};

export const MODAL: {
  [key: number]: { TITLE: string; DIRECTOR: string; DESC: string };
} = [
  {
    TITLE: "Echoes of Eternity",
    DIRECTOR: "Sebastian Grey",
    DESC: 'In the ancient city of Aeternum, where time flows like a river and echoes of the past linger in every shadow, "Echoes of Eternity" tells the story of two star-crossed lovers, Amelia and Marcus. Born into rival noble families, their forbidden love threatens to ignite a war that could consume the entire realm. As they fight to defy the expectations of their families and the dictates of fate, Amelia and Marcus uncover a dark conspiracy that spans centuries, reaching back to the very origins of their city. Guided by the mysterious whispers of the ancient stones and the echoes of their ancestors, they embark on a perilous quest to uncover the truth and break the cycle of violence that has plagued their land for generations. "Echoes of Eternity" is an epic tale of love, betrayal, and redemption set against the backdrop of a world where the past and present collide in a timeless dance of destiny. In the ancient city of Aeternum, where time flows like a river and echoes of the past linger in every shadow, "Echoes of Eternity" tells the story of two star-crossed lovers, Amelia and Marcus. Born into rival noble families, their forbidden love threatens to ignite a war that could consume the entire realm. As they fight to defy the expectations of their families and the dictates of fate, Amelia and Marcus uncover a dark conspiracy that spans centuries, reaching back to the very origins of their city. Guided by the mysterious whispers of the ancient stones and the echoes of their ancestors, they embark on a perilous quest to uncover the truth and break the cycle of violence that has plagued their land for generations. "Echoes of Eternity" is an epic tale of love, betrayal, and redemption set against the backdrop of a world where the past and present collide in a timeless dance of destiny.',
  },
  {
    TITLE: "Whispers in the Wind",
    DIRECTOR: "Isabella Moon",
    DESC: "Set against the backdrop of a quaint seaside town, 'Whispers in the Wind' follows the story of Sarah, a young woman grappling with loss and longing. After inheriting her grandmother's dilapidated beach house, Sarah retreats to the coastal haven in search of solace and inspiration. There, she discovers a hidden attic filled with dusty journals and faded photographs, each containing cryptic messages from the past. Guided by the enigmatic whispers of the wind, Sarah embarks on a journey of self-discovery, uncovering long-buried family secrets and untangling the threads of her own identity. Along the way, she forms unexpected connections with the eclectic residents of the town, including a mysterious lighthouse keeper who holds the key to unlocking the mysteries of her grandmother's legacy. 'Whispers in the Wind' is a poignant tale of love, forgiveness, and the enduring power of memory to shape our lives.",
  },
  {
    TITLE: "Shadow's Embrace",
    DIRECTOR: "Gabriel Steele",
    DESC: "In the heart of a sprawling metropolis cloaked in darkness, Shadow's Embrace unfolds the tale of Emily, a reclusive artist haunted by her past. When she stumbles upon a hidden underground gallery filled with mesmerizing yet eerie artworks, Emily is drawn into a mysterious world where shadows come to life. As she delves deeper into the secrets of the gallery and its enigmatic curator, Emily discovers a connection between her own inner turmoil and the sinister forces lurking within the shadows. With each stroke of her brush, she unravels the mysteries of her own existence and confronts the demons that have long haunted her. Shadow's Embrace is a captivating journey into the depths of the human psyche, exploring themes of fear, redemption, and the power of art to illuminate even the darkest corners of the soul.",
  },
  {
    TITLE: "Silent Serenade",
    DIRECTOR: "Evelyn Cross",
    DESC: "'Silent Serenade' takes place in a world where music is forbidden and silence reigns supreme. In this dystopian society, a young musician named Aria discovers a forbidden instrument hidden deep within the bowels of the city. Drawn to its enchanting melody, Aria embarks on a perilous journey to uncover the truth behind the silence that plagues their world. Along the way, she encounters a clandestine group of rebels who believe in the power of music to change the course of history. As Aria's music becomes the rallying cry for a revolution, she must confront the oppressive forces that seek to silence her and reclaim the voice of their people. 'Silent Serenade' is a captivating tale of courage, resilience, and the transformative power of music in the face of tyranny.",
  },
  {
    TITLE: "Eternal Reverie",
    DIRECTOR: "Amelia Rivers",
    DESC: "In a world where dreams and reality intertwine, 'Eternal Reverie' follows the journey of Alice, a young artist who discovers a mysterious portal that leads her into a realm of infinite possibilities. Guided by a enigmatic figure known only as the Dreamweaver, Alice navigates through surreal landscapes and encounters a cast of eccentric characters, each with their own desires and fears. As she delves deeper into this ethereal realm, Alice must confront her own inner demons and unlock the secrets of her past in order to find her way back to reality. 'Eternal Reverie' is a visually stunning tale of self-discovery, love, and the power of imagination.",
  },
];
