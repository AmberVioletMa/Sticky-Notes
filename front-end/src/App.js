import React, { useRef } from 'react';
import './App.css';
import StickyNotesCanvas from './components/StickyNotesCanvas';
import StatusMessages from './components/StatusMessages';
import Plus from './assets/Icons/Plus';

function App() {
  const StickyNotesCanvasRef = useRef();
  const StatusMessagesRef = useRef();

  const onError = err => {
    StatusMessagesRef?.current.appendNewMessage({ text: err, type: 'ERROR' });
  }

  const onSuccess = message => {
    StatusMessagesRef?.current.appendNewMessage({ text: message, type: 'SUCCESS' });
  }

  return (
    <div className="App">
      <div className='navbar'>
        <StatusMessages ref={StatusMessagesRef} />
        <button className='addIcon' onClick={() => StickyNotesCanvasRef?.current.createNewNote()}>
          <Plus></Plus>
        </button>
      </div>
      <StickyNotesCanvas ref={StickyNotesCanvasRef} onError={err => onError(err)} onSuccess={message => onSuccess(message)} />
    </div>
  );
}

export default App;
