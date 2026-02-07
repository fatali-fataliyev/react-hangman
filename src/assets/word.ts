import wordsData from "../data/words.json";

const words = wordsData.words;

function getRandomWord(): string {
    return words[Math.floor(Math.random() * words.length)]
}

export { getRandomWord };
