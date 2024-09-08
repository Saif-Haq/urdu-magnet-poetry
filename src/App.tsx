import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import './App.css';
import { Example } from './Poetry/Example';

function App() {
  // // Example usage
  // const romanUrduText = "aap kaisay hain";
  // const urduText = convertToUrdu(romanUrduText);
  // console.log(urduText);

  return (
    <>
      <DndProvider
        backend={TouchBackend}
        options={{ enableMouseEvents: true }}
      >
        <Example />
      </DndProvider>
      <p>Credits: </p>
      <>
        <span>Fav Icon: </span>
        <a href="https://www.vecteezy.com/free-png/crow">Crow PNGs by Vecteezy</a>
        <a href="https://medium.com/@itsShanKhan/transliterate-urdu-to-roman-urdu-in-python-614953b1a4d5#.bhnrsrany">Roman urdu to urdu transliteration</a>
        <span>
          inspiration: https://goblin-heart.net/sadgrl/magnet-poetry/#
        </span>
      </>
    </>
  )
}

export default App
