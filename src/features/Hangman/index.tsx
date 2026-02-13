import { useEffect, useState } from "react";
import style from "./style.module.css";
import {
  getHangmanImages,
  getWinGif,
  getLoseGif,
  getHintImg,
  getRestartImg,
} from "../../assets/images.ts";
import { getRandomWord } from "../../assets/word.ts";
import Button from "../../components/Button.tsx";

function Hangman() {
  const [images, setImages] = useState<string[]>([]);
  const [word, setWord] = useState<string>("");
  const [guessedLetters, setGuessedLetter] = useState<string[]>([]);
  const [encryptedWord, setEncryptedWord] = useState<string[]>([]);
  const [choice, setChoice] = useState<number>(6);
  const [isWin, setIsWin] = useState<boolean>(false);
  const [isLose, setIsLose] = useState<boolean>(false);
  const [hints, setHints] = useState<number>(3);

  useEffect(() => {
    const newWord = getRandomWord().toLowerCase();
    setWord(newWord);
    setImages(getHangmanImages());
    setChoice(6);
    const encrypted = newWord.split("").map(() => "?");
    setEncryptedWord(encrypted);
  }, []);

  useEffect(() => {
    if (guessedLetters.length === 0) return;

    let guessedLetter: string = guessedLetters[guessedLetters.length - 1];

    let isGuessed: number = word.toLowerCase().indexOf(guessedLetter);

    if (isGuessed !== -1) {
      let totalRepeat: number = isDoubleOrMoreLetter(word, guessedLetter);

      if (totalRepeat > 1) {
        for (let i = 0; i < totalRepeat; i++) {
          encryptedWord[isGuessed + i] = word[isGuessed];
        }
      } else {
        encryptedWord[isGuessed] = word[isGuessed];
      }

      setEncryptedWord([...encryptedWord]);

      if (encryptedWord.join("").toLowerCase() === word.toLocaleLowerCase()) {
        setIsWin(true);
        setTimeout(() => {
          restartGame();
        }, 3000);
      }

      return;
    } else {
      setChoice((prev) => prev - 1);
    }
  }, [guessedLetters, hints]);

  useEffect(() => {
    if (choice === 0) {
      setIsLose(true);
      setTimeout(() => {
        restartGame();
      }, 3000);
    }
  }, [choice]);

  const isDoubleOrMoreLetter = (word: string, letter: string): number => {
    let totalRepeat: number = 0;
    for (let letterOfWord of word) {
      if (letterOfWord === letter) totalRepeat++;
    }
    return totalRepeat;
  };

  const useHint = () => {
    if (hints <= 0) return;

    const hintIndexes = encryptedWord
      .map((char, i) => (char === "?" ? i : -1))
      .filter((i) => i !== -1);

    if (hintIndexes.length === 0) return;

    const priorityIdx = 3 - hints;
    const revealIdx =
      encryptedWord[priorityIdx] === "?" && priorityIdx < word.length
        ? priorityIdx
        : hintIndexes[hintIndexes.length - 1];

    const revealedLetter = word[revealIdx].toLowerCase();

    const newEncryptedWord = [...encryptedWord];
    newEncryptedWord[revealIdx] = revealedLetter;

    setEncryptedWord(newEncryptedWord);
    setGuessedLetter([...guessedLetters, revealedLetter.toLowerCase()]);
    setHints((prev) => prev - 1);
  };

  const restartGame = () => {
    const newWord = getRandomWord();
    setWord(newWord);
    setChoice(6);
    setHints(3);
    setGuessedLetter([]);
    const encrypted = newWord.split("").map(() => "?");
    setEncryptedWord(encrypted);
    setIsWin(false);
    setIsLose(false);
  };

  const getImg = (): string => {
    switch (choice) {
      case 6:
        return images[0];
      case 5:
        return images[1];
      case 4:
        return images[2];
      case 3:
        return images[3];
      case 2:
        return images[4];
      case 1:
        return images[5];
      case 0:
        return images[6];
      default:
        return images[0];
    }
  };

  const getKeyboard = () => {
    const rows: string[] = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
    const keyboardParts: JSX.Element[] = [];

    keyboardParts.push(
      <div>
        {rows[0].split("").map((letter) => (
          <Button
            disabled={guessedLetters.includes(letter)}
            setGuessedLetter={setGuessedLetter}
            key={letter}
          >
            {letter}
          </Button>
        ))}
      </div>,
    );

    keyboardParts.push(
      <div>
        {rows[1].split("").map((letter) => (
          <Button
            disabled={guessedLetters.includes(letter)}
            setGuessedLetter={setGuessedLetter}
            key={letter}
          >
            {letter}
          </Button>
        ))}
      </div>,
    );

    keyboardParts.push(
      <div>
        {rows[2].split("").map((letter) => (
          <Button
            disabled={guessedLetters.includes(letter)}
            setGuessedLetter={setGuessedLetter}
            key={letter}
          >
            {letter}
          </Button>
        ))}
      </div>,
    );
    return keyboardParts;
  };

  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        <img
          alt="Game"
          width={150}
          src={getImg()}
          style={{ borderRadius: 10 }}
        />
      </div>
      <div className={style.choices}>
        <span style={{ color: "#43A047", fontWeight: "bold" }}>Choices:</span>{" "}
        <span
          style={{
            color: choice < 3 ? "red" : "black",
            fontWeight: "bolder",
            textDecoration: "underline",
          }}
        >
          {choice}
        </span>
      </div>
      <hr />
      <div className={style.guessedWordsArea}>
        <p className={style.secretWord}>{encryptedWord}</p>
      </div>
      <hr />
      <div className={style.keyboardContainer}>
        {getKeyboard().map((part, i) => (
          <div key={i}>{part}</div>
        ))}
      </div>
      <hr />
      {isWin && (
        <div className={style.winBoxContainer}>
          <div>
            <h3>YOU WON 🏆</h3>
          </div>
          <div>
            <img
              alt="Win Gif"
              width={150}
              src={getWinGif()}
              style={{ borderRadius: 20 }}
            ></img>
          </div>
          <div>
            <p style={{ color: "white", marginTop: 10, marginBottom: 10 }}>
              The word was{" "}
              <span
                style={{
                  fontWeight: "bold",
                  textDecoration: "underline",
                  color: "#43A047",
                }}
              >
                {word.toUpperCase()}
              </span>
            </p>
          </div>
          <hr />
          <span>New game in 3s</span>
        </div>
      )}
      {isLose && (
        <div className={style.loseBoxContainer}>
          <div>
            <h3>YOU LOST 😭</h3>
          </div>
          <div>
            <img
              alt="Lose Gif"
              width={150}
              src={getLoseGif()}
              style={{ borderRadius: 20 }}
            ></img>
          </div>
          <div>
            <p style={{ color: "white", marginTop: 10, marginBottom: 10 }}>
              The word was{" "}
              <span
                style={{
                  fontWeight: "bold",
                  textDecoration: "underline",
                  color: "#E53935",
                }}
              >
                {word.toUpperCase()}
              </span>
            </p>
          </div>
          <hr />
          <span>New game in 3s</span>
        </div>
      )}
      <div className={style.menuContainer}>
        <div className={style.menuItem}>
          <img alt="hint" src={getHintImg()} onClick={useHint} />
          <p style={style.hintCounter} title="Remaining hint">
            {hints}
          </p>
        </div>

        <div
          className={style.menuItem}
          onClick={() => {
            restartGame();
          }}
        >
          <img alt="restart" src={getRestartImg()} />
        </div>
      </div>
    </div>
  );
}

export default Hangman;
