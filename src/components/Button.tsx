import style from "./style.module.css";

interface ButtonProps {
  children: string;
  setGuessedLetter: React.Dispatch<React.SetStateAction<string[]>>;
  disabled: boolean;
}

function Button({ children, setGuessedLetter, disabled }: ButtonProps) {
  return (
    <button
      className={style.letterBtn}
      disabled={disabled}
      onClick={() => setGuessedLetter((prev) => [...prev, children])}
    >
      {children}
    </button>
  );
}

export default Button;
