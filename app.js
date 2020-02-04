const fretboard = document.querySelector('.fretboard');
const root = document.documentElement;

// Setup consts and variables
const numberOfFrets = 24;
const numberOfStrings = 6;
// SET UP VARS FOR TUNING AND NOTE CREATION
// const tuning = ['E', 'B', 'G', 'D', 'A', 'E']; // reverse order from top of screen

// Where the single fretmarks should be positioned on the fretboard
const singleFretMarkPositions = [3, 5, 7, 9, 15, 17, 19, 21];
const doubleFretMarkPositions = [12, 24];
// Arrays with one octave of notenames / flats and sharps
const notesFlat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const notesSharp = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const guitarTuning = [4, 11, 7, 2, 9, 4] // E B G D A E / from the bottom up

// determines whether the note dots should use flats or sharps
let accidentals = 'flats';




const app = {
  init() {
    this.setupFretboard();
  },
  setupFretboard() {
    // Set css var / number of strings
    root.style.setProperty('--number-of-strings', numberOfStrings);

    // add strings to fretboard
    for (let i = 0; i < numberOfStrings; i++) {
      //console.log(i);
      let string = tools.createElement('div');
      string.classList.add('string');
      fretboard.appendChild(string);
      console.log('string ', i);  
      for (let fret = 0; fret <= numberOfFrets; fret++) { 
                
        let noteFret = tools.createElement('div');
        noteFret.classList.add('note-fret');
        
        // Takes the currrent string start index note and adds fret number to get the correct note
        let noteName = this.generateNoteNames((fret + guitarTuning[i]), accidentals);
        // Add data attribute to every note fret containing the correct name
        noteFret.setAttribute('data-note', noteName);

       console.log(noteName);
        // Add single fretmarks
        if (i === 0 && singleFretMarkPositions.indexOf(fret) !== -1) {
          noteFret.classList.add('fretmark', 'single-fretmark');
        }
               
        string.appendChild(noteFret);
        // Add double fretmark
        if (i === 0 && doubleFretMarkPositions.indexOf(fret) !== -1) {
          let doubleFretMark = tools.createElement('div');
          doubleFretMark.classList.add('fretmark', 'double-fretmark');
          noteFret.appendChild(doubleFretMark);
        }
      }
    }
  },
  generateNoteNames(noteIndex, accidentals) {
    // Explain this.. Maybe in console // Explain and app.generateNoteNames(4, 'sharps')
    noteIndex = noteIndex % 12;
    let noteName;
    if (accidentals === 'flats') {
      noteName = notesFlat[noteIndex];
    } else if (accidentals === 'sharps') {
      noteName = notesSharp[noteIndex];
    }
    return noteName;
  }
}
const tools = {
    createElement(element, content) {
        element = document.createElement(element);
        // Only add content if content is passed to args
        if (arguments.length > 1) {
            element.innerHTML = content;
        }
        return element;
    }
}
app.init();
