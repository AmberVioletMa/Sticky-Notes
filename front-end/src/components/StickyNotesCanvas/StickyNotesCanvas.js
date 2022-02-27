import React, { useState, forwardRef, useImperativeHandle, useEffect, useCallback } from 'react';
import axios from 'axios';
import './StickyNotesCanvas.css';
import Loader from '../../assets/Icons/Loader';
import Close from '../../assets/Icons/Close';
import Bullseye from '../../assets/Icons/MoveIcon';
import ReactMarkdown from "react-markdown";
import { initiateSocket, disconnectSocket, subscribeToNotesUpdates, subscribeToNotesCreate, subscribeToNotesDelete } from '../../services/socket-io';

const StickyNotesCanvas = forwardRef((props, ref) => {
  const { onError, onSuccess } = props;

  const isFirefox = typeof InstallTrigger !== 'undefined';
  const [notes, setNotes] = useState([]);
  const [defaultNotes] = useState({ text: '' });
  const [modifyNote, setModifyNote] = useState('');
  const [draggable, setDraggable] = useState('');
  const [loader, setLoader] = useState('');
  const [currentElement, setCurrentElement] = useState(null);
  const [currentNote, setCurrentNote] = useState(null);
  const [currentElementID, setCurrentElementID] = useState(null);

  useEffect(() => {
    initiateSocket('Notes');

    subscribeToNotesUpdates((err, data) => {
      if (err) return;
      if (data.value._id) {
        setNotes(oldNotes => [data.value, ...oldNotes.filter(note => note._id !== data.value._id)]);
      }
    });

    subscribeToNotesCreate((err, data) => {
      if (err) return;
      if (data?._id) {
        setNotes(oldNotes => [data, ...oldNotes]);
      }
    });

    subscribeToNotesDelete((err, data) => {
      if (err) return;
      if (data?.id) {
        setNotes(oldNotes => oldNotes.filter(note => note._id !== data.id));
      }
    });

    return () => {
      disconnectSocket();
    }
  }, []);

  useEffect(() => {
    const getInitialNotes = async () => {
      await axios
        .get(`http://localhost:3010/getNotes`
        ).then((res) => {
          if (res.data) {
            setNotes(res.data);
          }
        }).catch(() => {
          onError('There was a problem loading the notes');
        });
    }
    getInitialNotes();
  }, [onError]);

  const createNewNote = useCallback( async () => {
    const timeStamp = new Date();
    await axios
      .post(`http://localhost:3010/createNewNote`, { ...defaultNotes, timeStamp }).then((res) => {
        // if (res.data?.acknowledged) {
        //   setNotes([...notes, { _id: res.data.insertedId, ...defaultNotes, timeStamp }]);
        // } /** this is the handle in case the sockets are removed **/
      }).catch(() => {
        onError('There was a problem creating the new note');
      });
  },[onError, defaultNotes]);

  const deleteNote = useCallback( async (id) => {

    const REMOVE = window.confirm('Are you sure you want to remove this note?');
    if (REMOVE) {
      await axios
        .post(`http://localhost:3010/deleteNote`, { _id: id }).then((res) => {
          if (res.data) {
            // setNotes(notes.filter(note => note._id !== id)); /** this is the handle in case the sockets are removed **/
            onSuccess('The information was successfully deleted');
          }
        }).catch(() => {
          onError('There was a problem deleting the new note');
        });
    }
  },[onError, onSuccess]);

  const updateNote = useCallback(async (id, key, value, dontShowNotification) => {
    setLoader(`${id}`);
    await axios
      .post(`http://localhost:3010/updateNote`, { _id: id, key, value }).then((res) => {
        if (res.data) {
          setLoader('');
          !dontShowNotification && onSuccess('The information was successfully updated');
        }
      }).catch(() => {
        onError('There was a problem updating the note');
      });
  },[onError, onSuccess]);


  useEffect(() => {
    const checkBeforeExit = e => {
      if (loader !== '') {
        e.preventDefault();
        var confirmationMessage = "o/";
        e.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    }
    window.addEventListener("beforeunload", checkBeforeExit);
    return () => {
      window.removeEventListener("beforeunload", checkBeforeExit);
    };
  }, [loader]);


  useImperativeHandle(ref, () => ({
    createNewNote,
  }));

  const dragOver = event => {
    event.stopPropagation();
    event.preventDefault();
  }

  const dropNote = (event, id) => {
    if (!isFirefox) {
      if (event.pageY >= 80) {
        event.target.style.left = `${event.pageX - 20}px`;
        event.target.style.top = `${event.pageY - 85}px`;
        updateNote(id, 'pageX', `${event.pageX - 20}px`);
        updateNote(id, 'pageY', `${event.pageY - 85}px`, true);
      }
    } else {
      setCurrentElementID(id);
      setCurrentNote(event);
    }
  };

  const formateDay = (date) => {
    date = new Date(date);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return month < 10 ? `0${month}/${day}/${year}` : `${month}/${day}/${year}`;
  }

  const formateTime = (date) => {
    date = new Date(date);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
  }

  const dropNoteFireFox = (e) => {
    setCurrentElement(e);
  }

  useEffect(() => {
    if (isFirefox && currentNote && currentElement?.pageY >= 80) {
      currentNote.target.style.left = `${currentElement.pageX - 20}px`;
      currentNote.target.style.top = `${currentElement.pageY - 85}px`;
      updateNote(currentElementID, 'pageX', `${currentElement.pageX - 20}px`);
      updateNote(currentElementID, 'pageY', `${currentElement.pageY - 85}px`, true);
      setCurrentElement(null);
      setCurrentElementID(null);
      setCurrentNote(null);
    }
  }, [currentNote, currentElement, currentElementID, isFirefox, updateNote]);

  return (
    <div className="canvas" onDragOver={dragOver} onDragStart={(e) => { e.dataTransfer.setData('text', ''); }} onDrop={dropNoteFireFox}>
      {notes
        .map(note => (
          <div className="note"
            style={{ left: note.pageX ?? '300px', top: note.pageY ?? '100px' }}
            onDragEnd={e => dropNote(e, note._id)}
            draggable={draggable === note._id}
            key={note._id}>
            <div className='noteTopRow'>
              <div className='noteLeftButtons'>
                <button onFocus={() => setDraggable(note._id)} onBlur={() => setDraggable('')} className="moveIcon"><Bullseye></Bullseye></button>
                {loader === note._id && <div className="icons"><Loader></Loader></div>}
              </div>
              <div className="icons" onClick={() => deleteNote(note._id)}>
                <Close></Close>
              </div>
            </div>
            <div tabIndex={0} className='noteBody' onClick={() => setModifyNote(note._id)}>
              {modifyNote === note._id ?
                <textarea autoFocus className='noteTextArea' defaultValue={note.text} onChange={(e) => { note.text = e.target.value; }} onBlur={(e) => { setModifyNote(''); updateNote(note._id, 'text', e.target.value); }} /> :
                <ReactMarkdown children={note.text} />}
            </div>
            <div className='noteTimeStamp'>
              <span>{formateDay(note.timeStamp)}</span>
              <span>{formateTime(note.timeStamp)}</span>
            </div>
          </div>
        ))
      }
    </div>
  );
});

export default StickyNotesCanvas;