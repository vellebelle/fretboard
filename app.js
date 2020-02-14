const fretboard = document.querySelector('.fretboard');
const selectedInstrumentSelector = document.querySelector('#instrument-selector');
const root = document.documentElement;

// Setup consts and variables
const numberOfFrets = 24;

// Where the single fretmarks should be positioned on the fretboard
const singleFretMarkPositions = [3, 5, 7, 9, 15, 17, 19, 21];
const doubleFretMarkPositions = [12, 24];
// Arrays with one octave of notenames / flats and sharps
const notesFlat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const notesSharp = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// SET UP OBJECT WITH INSTRUMENT TUNING PRESETS
const instrumentTuningPresets = {
  'Guitar': [4, 11, 7, 2, 9, 4], // E B G D A E
  'Bass (4 strings)': [7, 2, 9, 4], // G D A E
  'Bass (5 strings)': [7, 2, 9, 4, 11], // G D A E B
  'Ukulele': [9, 4, 0, 7] // A E C G
};
// NEW VARIABLE TO CONTAIN THE CURRENTLY SELECTED INSTRUMENT PRESET
let selectedInstrument = 'Guitar'; // Defaults is guitar 

// CHANGE TO let because we want to be able to change it.. Also change to the length of the selected instrument preset
let numberOfStrings = instrumentTuningPresets[selectedInstrument].length;

// determines whether the note dots should use flats or sharps
let accidentals = 'flats';

const app = {
  init() {
    this.setupFretboard();
    this.setupSelectedInstrumentSelector();
    this.setupEventListeners();
  },
  setupFretboard() {
    // CLEAR EVERYTHING IN FRETBOARD DIV
    fretboard.innerHTML = '';
    // Set css var / number of strings
    root.style.setProperty('--number-of-strings', numberOfStrings);

    // add strings to fretboard
    for (let i = 0; i < numberOfStrings; i++) {
  
      let string = tools.createElement('div');
      string.classList.add('string');
      fretboard.appendChild(string);
      for (let fret = 0; fret <= numberOfFrets; fret++) { 
                
        let noteFret = tools.createElement('div');
        noteFret.classList.add('note-fret');
        
        // Takes the currrent string start index note and adds fret number to get the correct note
        let noteName = this.generateNoteNames((fret + instrumentTuningPresets[selectedInstrument][i]), accidentals); // CHANGED TO USE PINSTRUMENT TUNING PRESET OBJECT 
        // Add data attribute to every note fret containing the correct name
        noteFret.setAttribute('data-note', noteName);


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
  },
  // NEW METHOD TO SETUP SELECTOR
  setupSelectedInstrumentSelector() {
    // LOOP OVER INSTRUMENTS IN OBJECT
    for (instrument in instrumentTuningPresets) {
      // CREATE OPTION ELEMENT
      let instrumentOption = tools.createElement('option', instrument);
      selectedInstrumentSelector.appendChild(instrumentOption);
    }  
  },
  setupEventListeners() {
    fretboard.addEventListener('mouseover', (event) => {
      if (event.target.classList.contains('note-fret')) {
        event.target.style.setProperty('--noteDotOpacity', 1);
        // Show what happens if this is not done
      } else {
          return;
        }
      fretboard.addEventListener('mouseout', (event) => {
        event.target.style.setProperty('--noteDotOpacity', 0);
      });
    });

    // SETUP EVENT LISTENER FOR INSTRUMENT SELECTOR
    selectedInstrumentSelector.addEventListener('change', (event) => {
      // Set currently selected instrument
      selectedInstrument = event.target.value;
      // SET NUMBER OF STRING BASED ON LENGTH OF PRESET
      numberOfStrings = instrumentTuningPresets[selectedInstrument].length;
      // SETUP THE FRETBOARD AGAIN
      this.setupFretboard();
    });
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
