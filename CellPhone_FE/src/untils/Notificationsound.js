import typings from './typing.mp3'
import LaLung from './LaLung.mp3'

export const playSound = (type, sound) => {
 
    const list = {
      bruh: "https://www.myinstants.com/media/sounds/movie_1.mp3",
      boom: "https://www.myinstants.com/media/sounds/vine-boom.mp3",
      quack : "https://www.myinstants.com/media/sounds/quack.mp3",
      pew: "https://www.myinstants.com/media/sounds/pew.mp3",
      piano : "https://www.myinstants.com/media/sounds/piano.mp3",
      typing : typings,
      LaLung : LaLung,
      tiktok : "https://www.myinstants.com/media/sounds/tiktok.mp3",
      violin: "https://www.myinstants.com/media/sounds/555.mp3",
    pause:"",
    };
  
    const audio = new Audio(list[type]);
 
    if (sound) {
    audio.play();
    }
  
    return audio;
  };
  