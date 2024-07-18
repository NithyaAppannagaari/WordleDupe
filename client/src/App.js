import './App.css';
import {useState, useEffect} from 'react';
import * as React from 'react';
import axios from 'axios';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import {Modal as BaseModal} from '@mui/base/Modal';
import { css } from '@mui/system';

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);




function App() {
  const [word, setWord] = useState({firstLetter: "", secondLetter: "", thirdLetter: "", fourthLetter: "", fifthLetter: ""});

  const [numGuesses, setNumGuesses] = useState(0);

  const handleClose = () => {
    setWordGuessed(false);
    setFailAlert(false);
  }

  

  useEffect(() => {
    axios.get('http://localhost:3001/hello')
      .then(response => {
        console.log(response.data);
        setWord(response.data.value);
      }).catch(error => {
        console.error(error);
      });
  }, []);


  const [row, setRow] = useState(0);

  const [wordGuessed, setWordGuessed] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);
  const [failAlert, setFailAlert] = useState(false);

  // add another parameter which is by rows
  // create different object for keyboard vs. grid, so that on the grid, the color stays based off of the row it was in, vs. in the keyboard the color stays what the latest guess was
  const [keyboardLetterColors, setKeyboardLetterColors] = useState({'Q': '#696969', 'W': '#696969', 'E':'#696969', 'R': '#696969', 'T': '#696969', 'Y': '#696969', 'U':'#696969','I':'#696969','O':'#696969','P':'#696969','A':'#696969','S':'#696969','D':'#696969','F':'#696969','G':'#696969','H':'#696969','J':'#696969','K':'#696969','L':'#696969','Z':'#696969','X':'#696969','C':'#696969','V':'#696969','B':'#696969','N':'#696969','M':'#696969', 'ENTER':'#696969','DELETE':'#696969'})
  const [boardLetterColors, setBoardLetterColors] = useState({0:{'Q': '#121213', 'W': '#121213', 'E':'#121213', 'R': '#121213', 'T': '#121213', 'Y': '#121213', 'U':'#121213','I':'#121213','O':'#121213','P':'#121213','A':'#121213','S':'#121213','D':'#121213','F':'#121213','G':'#121213','H':'#121213','J':'#121213','K':'#121213','L':'#121213','Z':'#121213','X':'#121213','C':'#121213','V':'#121213','B':'#121213','N':'#121213','M':'#121213', 'ENTER':'#121213','DELETE':'#121213'},
    1:{'Q': '#121213', 'W': '#121213', 'E':'#121213', 'R': '#121213', 'T': '#121213', 'Y': '#121213', 'U':'#121213','I':'#121213','O':'#121213','P':'#121213','A':'#121213','S':'#121213','D':'#121213','F':'#121213','G':'#121213','H':'#121213','J':'#121213','K':'#121213','L':'#121213','Z':'#121213','X':'#121213','C':'#121213','V':'#121213','B':'#121213','N':'#121213','M':'#121213', 'ENTER':'#121213','DELETE':'#121213'},
    2:{'Q': '#121213', 'W': '#121213', 'E':'#121213', 'R': '#121213', 'T': '#121213', 'Y': '#121213', 'U':'#121213','I':'#121213','O':'#121213','P':'#121213','A':'#121213','S':'#121213','D':'#121213','F':'#121213','G':'#121213','H':'#121213','J':'#121213','K':'#121213','L':'#121213','Z':'#121213','X':'#121213','C':'#121213','V':'#121213','B':'#121213','N':'#121213','M':'#121213', 'ENTER':'#121213','DELETE':'#121213'},
    3:{'Q': '#121213', 'W': '#121213', 'E':'#121213', 'R': '#121213', 'T': '#121213', 'Y': '#121213', 'U':'#121213','I':'#121213','O':'#121213','P':'#121213','A':'#121213','S':'#121213','D':'#121213','F':'#121213','G':'#121213','H':'#121213','J':'#121213','K':'#121213','L':'#121213','Z':'#121213','X':'#121213','C':'#121213','V':'#121213','B':'#121213','N':'#121213','M':'#121213', 'ENTER':'#121213','DELETE':'#121213'},
    4:{'Q': '#121213', 'W': '#121213', 'E':'#121213', 'R': '#121213', 'T': '#121213', 'Y': '#121213', 'U':'#121213','I':'#121213','O':'#121213','P':'#121213','A':'#121213','S':'#121213','D':'#121213','F':'#121213','G':'#121213','H':'#121213','J':'#121213','K':'#121213','L':'#121213','Z':'#121213','X':'#121213','C':'#121213','V':'#121213','B':'#121213','N':'#121213','M':'#121213', 'ENTER':'#121213','DELETE':'#121213'},
    5:{'Q': '#121213', 'W': '#121213', 'E':'#121213', 'R': '#121213', 'T': '#121213', 'Y': '#121213', 'U':'#121213','I':'#121213','O':'#121213','P':'#121213','A':'#121213','S':'#121213','D':'#121213','F':'#121213','G':'#121213','H':'#121213','J':'#121213','K':'#121213','L':'#121213','Z':'#121213','X':'#121213','C':'#121213','V':'#121213','B':'#121213','N':'#121213','M':'#121213', 'ENTER':'#121213','DELETE':'#121213'}})

  const [prevGuesses, setPrevGuesses] = useState({0: ['','','','',''], 1:['','','','',''],2: ['','','','',''],3: ['','','','',''],4: ['','','','',''],5: ['','','','','']})

  const Item = styled(Paper)(({theme, spacing}) => ({
    ...theme.typography.h4,
    fontWeight: 700,
    backgroundColor:  '#121213' ,
    elevation: 1,
    padding: theme.spacing(spacing),
    textAlign: 'center',
    color: 'white'
  }))

  const KeyItem= styled(Paper)(({theme, spacing}) => ({
    ...theme.typography.h5,
    fontWeight: 700,
    backgroundColor:  '#121213' ,
    elevation: 1,
    padding: theme.spacing(spacing),
    textAlign: 'center',
    color: 'white'
  }))
  
  const [firstLetter, setFirstLetter] = useState('');
  const [secondLetter, setSecondLetter] = useState('');
  const [thirdLetter, setThirdLetter] = useState('');
  const [fourthLetter, setFourthLetter] = useState('');
  const [fifthLetter, setFifthLetter] = useState('');

  const handleLetter = (event) => {
    var letter = event.target.innerHTML;
    if(letter === 'DELETE')
    {
      deleteLetter(letter);
    }
    
    else if(letter === 'ENTER')
    {
      setNumGuesses(numGuesses+1);
      changeColors();
      var guesses = prevGuesses;
      guesses[row] = [firstLetter, secondLetter, thirdLetter, fourthLetter, fifthLetter];
      setPrevGuesses(guesses);
      setFirstLetter('');
      setSecondLetter('');
      setThirdLetter('');
      setFourthLetter('');
      setFifthLetter('');
      setRow(row+1);

    }

    else 
    {
      if(firstLetter === '')
        setFirstLetter(letter);
      else if(secondLetter === '')
        setSecondLetter(letter);
      else if(thirdLetter === '')
        setThirdLetter(letter);
      else if(fourthLetter === '')
        setFourthLetter(letter);
      else
        setFifthLetter(letter);
    }
  }

  const deleteLetter = (letter) => {
    if(fifthLetter === '')
      {
        if(fourthLetter === '')
        {
          if(thirdLetter === '')
          {
            if(secondLetter === '')
            {
              setFirstLetter('');
            }

            else
            {
              setSecondLetter('');
            }
          }

          else
          {
            setThirdLetter('');
          }
        }

        else
        {
          setFourthLetter('');
        }

      }

    else
    {
      setFifthLetter('');
    }
  }

  function changeColors() {
    var colors = keyboardLetterColors;
    var boardColors = boardLetterColors;
    var numBulls = 0;
    const wordValues = Object.values(word);

    if(word.firstLetter === firstLetter.toLowerCase())
    {
      colors[firstLetter] = '#67a561';
      boardColors[row][firstLetter] = '#67a561';
      numBulls++;
    }

    else if(wordValues.includes(firstLetter.toLowerCase()))
    {
      colors[firstLetter] = colors[firstLetter] === '#67a561'? colors[firstLetter]:'#cbaa36';
      boardColors[row][firstLetter] = '#cbaa36';
    }

    else
    {
      colors[firstLetter] = '#191919';
      boardColors[row][firstLetter] = '#4c4c4c';
    }

    if(word.secondLetter === secondLetter.toLowerCase())
    {
      colors[secondLetter] = '#67a561';
      boardColors[row][secondLetter] = '#67a561';
      numBulls++;
    }

    else if(wordValues.includes(secondLetter.toLowerCase()))
    {
      colors[secondLetter] = colors[secondLetter] === '#67a561'? colors[secondLetter]:'#cbaa36';
      boardColors[row][secondLetter] = '#cbaa36';
    }

    else
    {
      colors[secondLetter] ='#191919';
      boardColors[row][secondLetter] = '#4c4c4c';
    }

    if(word.thirdLetter === thirdLetter.toLowerCase())
    {
      colors[thirdLetter] = '#67a561';
      boardColors[row][thirdLetter] = '#67a561';
      numBulls++;
    }

    else if(wordValues.includes(thirdLetter.toLowerCase()))
    {
      colors[thirdLetter] = colors[thirdLetter] === '#67a561'? colors[thirdLetter]:'#cbaa36';
      boardColors[row][thirdLetter] = '#cbaa36';
    }

    else
    {
      colors[thirdLetter] = '#191919';
      boardColors[row][thirdLetter] = '#4c4c4c';
    }

    if(word.fourthLetter === fourthLetter.toLowerCase())
    {
      colors[fourthLetter] = '#67a561';
      boardColors[row][fourthLetter] = '#67a561';
      numBulls++;
    }

    else if(wordValues.includes(fourthLetter.toLowerCase()))
    {
      colors[fourthLetter] = colors[fourthLetter] === '#67a561'? colors[fourthLetter]:'#cbaa36';
      boardColors[row][fourthLetter] = '#cbaa36';
    }

    else
    {
      colors[fourthLetter] = '#191919';
      boardColors[row][fourthLetter] = '#4c4c4c';
    }

    if(word.fifthLetter === fifthLetter.toLowerCase())
    {
      colors[fifthLetter] = '#67a561';
      boardColors[row][fifthLetter] = '#67a561';
      numBulls++;
    }

    else if(wordValues.includes(fifthLetter.toLowerCase()))
    {
      colors[fifthLetter] = colors[fifthLetter] === '#67a561'? colors[fifthLetter]:'#cbaa36';
      boardColors[row][fifthLetter] = '#cbaa36';
    }

    else
    {
      colors[fifthLetter] = '#191919';
      boardColors[row][fifthLetter] = '#4c4c4c';
    }

    if(numBulls === 5 || word.firstLetter === firstLetter.toLowerCase() && word.secondLetter === secondLetter.toLowerCase() && word.thirdLetter === thirdLetter.toLowerCase() && word.fourthLetter === fourthLetter.toLowerCase() && word.fifthLetter === fifthLetter.toLowerCase())
    {
      console.log("congrats! you guessed the word");
      setWordGuessed(true);
      setPlayAgain(true);
    }

    else if(numGuesses === 5)
    {
      setFailAlert(true);
      setPlayAgain(true);
    }

    setKeyboardLetterColors(colors);
    setBoardLetterColors(boardColors);
  }

  function FinishAlert({isFinished, failed}) {
    if(isFinished) return <p  sx = {{marginTop: 3}}>You guessed the word. Play again?</p>;
    if(failed) return <p sx = {{marginTop: 3}}>You did not guess the word. The word was {word.firstLetter + word.secondLetter + word.thirdLetter + word.fourthLetter + word.fifthLetter}. Play again?</p>;
  }

  function PlayAgainButton({optionToPlayAgain})
  {
    if(optionToPlayAgain) return <Button onClick = {resetBoard} sx = {{color: 'white', backgroundColor: '#3a3a3a', marginTop: 1}}>Play Again</Button>;
  }

  /**
   * This is how you make a GET request to the server in a function.
   * 
   * This function is called whenever the "play again" button is clicked.
   */
  const getWord = async() =>{
    try {
      await fetch('http://localhost:3001/hello')
        .then(response => {
          response.json()
          .then(data => {
            console.log(data.value);
            setWord(data.value);
          })
        })
    }

    catch(error) {
      console.error(error);
    }
  }

  function resetBoard()
  {
    getWord();
    setWordGuessed(false);
    setPlayAgain(false);
    setFailAlert(false);
    setBoardLetterColors({0:{'Q': '#121213', 'W': '#121213', 'E':'#121213', 'R': '#121213', 'T': '#121213', 'Y': '#121213', 'U':'#121213','I':'#121213','O':'#121213','P':'#121213','A':'#121213','S':'#121213','D':'#121213','F':'#121213','G':'#121213','H':'#121213','J':'#121213','K':'#121213','L':'#121213','Z':'#121213','X':'#121213','C':'#121213','V':'#121213','B':'#121213','N':'#121213','M':'#121213', 'ENTER':'#121213','DELETE':'#121213'},
      1:{'Q': '#121213', 'W': '#121213', 'E':'#121213', 'R': '#121213', 'T': '#121213', 'Y': '#121213', 'U':'#121213','I':'#121213','O':'#121213','P':'#121213','A':'#121213','S':'#121213','D':'#121213','F':'#121213','G':'#121213','H':'#121213','J':'#121213','K':'#121213','L':'#121213','Z':'#121213','X':'#121213','C':'#121213','V':'#121213','B':'#121213','N':'#121213','M':'#121213', 'ENTER':'#121213','DELETE':'#121213'},
      2:{'Q': '#121213', 'W': '#121213', 'E':'#121213', 'R': '#121213', 'T': '#121213', 'Y': '#121213', 'U':'#121213','I':'#121213','O':'#121213','P':'#121213','A':'#121213','S':'#121213','D':'#121213','F':'#121213','G':'#121213','H':'#121213','J':'#121213','K':'#121213','L':'#121213','Z':'#121213','X':'#121213','C':'#121213','V':'#121213','B':'#121213','N':'#121213','M':'#121213', 'ENTER':'#121213','DELETE':'#121213'},
      3:{'Q': '#121213', 'W': '#121213', 'E':'#121213', 'R': '#121213', 'T': '#121213', 'Y': '#121213', 'U':'#121213','I':'#121213','O':'#121213','P':'#121213','A':'#121213','S':'#121213','D':'#121213','F':'#121213','G':'#121213','H':'#121213','J':'#121213','K':'#121213','L':'#121213','Z':'#121213','X':'#121213','C':'#121213','V':'#121213','B':'#121213','N':'#121213','M':'#121213', 'ENTER':'#121213','DELETE':'#121213'},
      4:{'Q': '#121213', 'W': '#121213', 'E':'#121213', 'R': '#121213', 'T': '#121213', 'Y': '#121213', 'U':'#121213','I':'#121213','O':'#121213','P':'#121213','A':'#121213','S':'#121213','D':'#121213','F':'#121213','G':'#121213','H':'#121213','J':'#121213','K':'#121213','L':'#121213','Z':'#121213','X':'#121213','C':'#121213','V':'#121213','B':'#121213','N':'#121213','M':'#121213', 'ENTER':'#121213','DELETE':'#121213'},
      5:{'Q': '#121213', 'W': '#121213', 'E':'#121213', 'R': '#121213', 'T': '#121213', 'Y': '#121213', 'U':'#121213','I':'#121213','O':'#121213','P':'#121213','A':'#121213','S':'#121213','D':'#121213','F':'#121213','G':'#121213','H':'#121213','J':'#121213','K':'#121213','L':'#121213','Z':'#121213','X':'#121213','C':'#121213','V':'#121213','B':'#121213','N':'#121213','M':'#121213', 'ENTER':'#121213','DELETE':'#121213'}});
    setKeyboardLetterColors({'Q': '#696969', 'W': '#696969', 'E':'#696969', 'R': '#696969', 'T': '#696969', 'Y': '#696969', 'U':'#696969','I':'#696969','O':'#696969','P':'#696969','A':'#696969','S':'#696969','D':'#696969','F':'#696969','G':'#696969','H':'#696969','J':'#696969','K':'#696969','L':'#696969','Z':'#696969','X':'#696969','C':'#696969','V':'#696969','B':'#696969','N':'#696969','M':'#696969', 'ENTER':'#696969','DELETE':'#696969'});
    setRow(0);
    setNumGuesses(0);
    setPrevGuesses({0: ['','','','',''], 1:['','','','',''],2: ['','','','',''],3: ['','','','',''],4: ['','','','',''],5: ['','','','','']});
    setFirstLetter('');
    setSecondLetter('');
    setThirdLetter('');
    setFourthLetter('');
    setFifthLetter('');
  }
  
  
  function KeyboardItem({letter}) {
    return(
      <KeyItem spacing = {3}  className = "KeyboardItem" style = {{backgroundColor: keyboardLetterColors[letter]}}
        onClick = {handleLetter}>{letter}</KeyItem>
    )
  }
  
  function Keyboard() {
    return (
      <div className = "Keyboard">
        <div className = "KeyboardRow">
          <KeyboardItem letter = {'Q'}/>
          <KeyboardItem letter = {'W'}/>
          <KeyboardItem letter = {'E'}/>
          <KeyboardItem letter = {'R'}/>
          <KeyboardItem letter = {'T'}/>
          <KeyboardItem letter = {'Y'}/>
          <KeyboardItem letter = {'U'}/>
          <KeyboardItem letter = {'I'}/>
          <KeyboardItem letter = {'O'}/>
          <KeyboardItem letter = {'P'}/>
        </div>
        <div className = "KeyboardRow">
          <KeyboardItem letter = {'A'}/>
          <KeyboardItem letter = {'S'}/>
          <KeyboardItem letter = {'D'}/>
          <KeyboardItem letter = {'F'}/>
          <KeyboardItem letter = {'G'}/>
          <KeyboardItem letter = {'H'}/>
          <KeyboardItem letter = {'J'}/>
          <KeyboardItem letter = {'K'}/>
          <KeyboardItem letter = {'L'}/>
        </div>
        <div className = "KeyboardRow">
          <KeyboardItem letter = {'ENTER'}/>
          <KeyboardItem letter = {'Z'}/>
          <KeyboardItem letter = {'X'}/>
          <KeyboardItem letter = {'C'}/>
          <KeyboardItem letter = {'V'}/>
          <KeyboardItem letter = {'B'}/>
          <KeyboardItem letter = {'N'}/>
          <KeyboardItem letter = {'M'}/>
          <KeyboardItem letter = {'DELETE'}/>
        </div>
      </div>
    )
  }

//   /**
//    * useState and useEffect are React Native hooks.
//    * 
//    * useState initializes a state variable called data, that stores
//    * data retrieved from an API endpoint. in our case, the state
//    * variable stores the word sent from the server.
//    * 
//    * useEffect requests data from an API endpoint once the React
//    * component initially renders. in our case, useEffect sends
//    * an HTTP GET request to the server in order to store the 
//    * retrieved data into the state variable. 
//    */
  

//    // must use useEffect with useState to avoid uncontrollable looping

//  /**
//   * The below is an example of an HTTP POST request using fetch().
//   * 
//   * The body is what is sent to the server. In our case, the string "NITHYA".
//   * 
//   * fetch('http://localhost:3001/', {
//       method: 'POST',
//       headers:{'Content-Type':'application/json'},
//       body: JSON.stringify({name:"NITHYA"})
//     })
//   */

//     /**
//      * The textbox contains either nothing, the current letter guessed (if the current row is the row the user should be guessing on), or the previous guess
//      * 
//      * Create an array of all guesses. Each row stores the guesses made when enter is pressed. When enter is pressed, the current row in the array gets populated.
//      * Then, it moves onto the next row. 
//      * 
//      */
    function FormRow({currentRow}) {
      return (
        <React.Fragment>
          <Grid item xs={20} sm = {20} md = {20} >
            <Item  spacing = {4}  sx = {{width: 2, height: 2, border: 2, borderColor: '#3a3a3c', borderRadius: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: boardLetterColors[currentRow][currentRow === row ? firstLetter: prevGuesses[currentRow][0]]}}>{currentRow === row ? firstLetter: prevGuesses[currentRow][0]}</Item>
          </Grid>
          <Grid item xs={20} sm = {20} md = {20}>
            <Item spacing = {4}  sx = {{width: 2, height: 2, border: 2, borderColor: '#3a3a3c', borderRadius: 0, display: 'flex', justifyContent: 'center', alignItems: 'center',backgroundColor: boardLetterColors[currentRow][currentRow === row ? secondLetter: prevGuesses[currentRow][1]]}}>{currentRow === row ? secondLetter: prevGuesses[currentRow][1]}</Item>
          </Grid>
          <Grid item xs={20} sm = {20} md = {20}>
            <Item spacing = {4}  sx = {{width: 2, height: 2, border: 2, borderColor: '#3a3a3c', borderRadius: 0, display: 'flex', justifyContent: 'center', alignItems: 'center',backgroundColor: boardLetterColors[currentRow][currentRow === row ? thirdLetter: prevGuesses[currentRow][2]]}}>{currentRow === row ? thirdLetter: prevGuesses[currentRow][2]}</Item>
          </Grid>
          <Grid item xs={20} sm = {20} md = {20}>
            <Item spacing = {4} sx = {{width: 2, height: 2, border: 2, borderColor: '#3a3a3c', borderRadius: 0,display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: boardLetterColors[currentRow][currentRow === row ? fourthLetter: prevGuesses[currentRow][3]]}}>{currentRow === row ? fourthLetter: prevGuesses[currentRow][3]}</Item>
          </Grid>
          <Grid item xs={20} sm = {20} md = {20}>
            <Item spacing = {4}  sx = {{width: 2, height: 2, border: 2, borderColor: '#3a3a3c', borderRadius: 0, display: 'flex', justifyContent: 'center', alignItems: 'center',backgroundColor: boardLetterColors[currentRow][currentRow === row ? fifthLetter: prevGuesses[currentRow][4]] }}>{currentRow === row ? fifthLetter: prevGuesses[currentRow][4]}</Item>
          </Grid>
        </React.Fragment>
      )
    }
  
 
  return (
    <div className="App-header">
      <Modal  open = {wordGuessed || failAlert} onClose = {handleClose}>
        <ModalContent>
          <FinishAlert isFinished = {wordGuessed} failed = {failAlert}/>
          <PlayAgainButton optionToPlayAgain={playAgain}/>
        </ModalContent>
      </Modal>
      <div className = "App-body" >
        
        <Box sx = {{flexGrow: 1}} maxWidth = {400}>
          <Grid container spacing={1} direction = "column" justifyContent={"center"} alignItems={"center"}  >
            <Grid container item spacing = {1} columns = {100}>
              <FormRow currentRow = {0}/>
            </Grid>
            <Grid container item spacing = {1} columns = {100}>
              <FormRow currentRow = {1}/>
            </Grid>
            <Grid container item spacing = {1} columns = {100}>
              <FormRow currentRow = {2}/>
            </Grid>
            <Grid container item spacing = {1} columns = {100}>
              <FormRow currentRow = {3}/>
            </Grid>
            <Grid container item spacing = {1} columns = {100}>
              <FormRow currentRow = {4}/>
            </Grid>
            <Grid container item spacing = {1} columns = {100}>
              <FormRow currentRow = {5}/>
            </Grid>
          </Grid>
        </Box>
        
        <Box sx = {{margin: 1}}>
          <Keyboard />
        </Box> 
      </div>
    </div>

    
  );
}


export default App;
