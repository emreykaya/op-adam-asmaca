import { useState, useEffect } from 'react'
import { DATA } from "./data"
import './App.css'

function App() {
  //STATES
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerArray, setAnswerArray] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [resultQuestion, setResultQuestion] = useState(false);
  const [wrong, setWrong] = useState(false);

  // ALPHABET
  const alphabet = [
    "A", "B", "C", "Ç", "D", "E", "F", "G", "Ğ", "H",
    "I", "İ", "J", "K", "L", "M", "N", "O", "Ö", "P",
    "R", "S", "Ş", "T", "U", "Ü", "V", "Y", "Z"
  ];

  // SHUFFLE ALPHABET
  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  }

  const setKeyword = (keyword) => {
    if (keywords.length < answer.length) {
      keywords.push(keyword);
      setKeywords([...keywords]);
    }
    if (keywords.length == answer.length) {
      if(answer == keywords.join("")){
        setIndex(index + 1)
        setKeywords([]);
        setResultQuestion(true)
      } else {
        setWrong(true);
      }
    }
  }
  

  useEffect(() => {
    setWrong(false);
    setResultQuestion(false);
    setAnswer("");
  
    if (index < DATA.length) {
      const answer = DATA[index].answer.toLowerCase();
      setAnswer(answer);
      setQuestion(DATA[index].question);
  
      const stringToArray = answer.split("");
      stringToArray.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
      stringToArray.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
      stringToArray.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
      const alphabetLowerData = stringToArray.map((answer) => answer.toLowerCase());
      setAnswerArray(shuffle(alphabetLowerData));
    }
  }, [resultQuestion, index]);
  

  const removeKeyword = (index) => {
    keywords.splice(index, 1);
    setKeywords([...keywords]);
  }

  // RESET GAME: PLAY AGAIN
  const resetGame = () => {
    setIndex(0);
    setQuestion("");
    setAnswer("");
    setAnswerArray([]);
    setKeywords([]);
    setResultQuestion(false);
    setWrong(false);
  };
  

  return (
    <>
      <div className="App">
      {answer !== "" &&
        <div>
          <div className='question-top'>
            <span className='question-name' >{question}</span>
          </div>

          <div className='question-area'>
            {keywords.map((item, index) => (
              <span style={{'borderBottom':(wrong) ? '2px solid red':'2px solid #ddd'}} className='question' onClick={() => removeKeyword(index)} key={index}>
                {item}
              </span>
            ))}
          </div>

          <div className='button-area'>
            {answerArray.map((item, index) => (
              <button className='button' key={index} onClick={() => setKeyword(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
        }
        {answer == "" &&
        <div className='end-game'>
          <h2 className='empty-message'>Sorular Bitti!</h2>
          <p>Tebrikler!</p>
          <button className="end-btn" onClick={resetGame}>Tekrar Oyna</button>
        </div>
        }
      </div>
    </>
  )
}

export default App
