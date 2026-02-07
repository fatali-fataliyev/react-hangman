import img1 from './0.jpg';
import img2 from './1.jpg';
import img3 from './2.jpg';
import img4 from './3.jpg';
import img5 from './4.jpg';
import img6 from './5.jpg';
import img7 from './6.jpg';
import loseGif from "./lose.gif"
import winGif from "./win.gif"

function getImages(): string[] {
    return [img1, img2, img3, img4, img5, img6, img7];
}

function getLoseGif(): string {
    return loseGif;
}

function getWinGif(): string {
    return winGif;
}

export { getImages, getLoseGif, getWinGif };