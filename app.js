const root = document.documentElement;
const fretboard = document.querySelector('.fretboard');
const selectedInstrumentSelector = document.querySelector('#instrument-selector');
const accidentalSelector = document.querySelector('.accidental-selector');
const numberOfFretsSelector = document.querySelector('#number-of-frets');
const showAllNotesSelector = document.querySelector('#show-all-notes');

let numberOfFrets = 20;
// NEW VAR TO CONTAIN WHETHER OR NOT TO SHOW ALL NOTES
let showAllNotes = false;

// Where the single fretmarks should be positioned on the fretboard
const singleFretMarkPositions = [3, 5, 7, 9, 15, 17, 19, 21];
const doubleFretMarkPositions = [12, 24];
// Arrays with one octave of notenames / flats and sharps
const notesFlat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const notesSharp = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const instrumentTuningPresets = {
  'Guitar': [4, 11, 7, 2, 9, 4], // E B G D A E
  'Bass (4 strings)': [7, 2, 9, 4], // G D A E
  'Bass (5 strings)': [7, 2, 9, 4, 11], // G D A E B
  'Ukulele': [9, 4, 0, 7] // A E C G
};

let selectedInstrument = 'Guitar'; // Defaults is guitar 
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
    // Clear everything in fretboard div
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
  setupSelectedInstrumentSelector() {
    // Loop over instruments in object
    for (instrument in instrumentTuningPresets) {
      // Create option element
      let instrumentOption = tools.createElement('option', instrument);
      selectedInstrumentSelector.appendChild(instrumentOption);
    }  
  },
  showNoteDot(event) {
    if (event.target.classList.contains('note-fret')) {
      event.target.style.setProperty('--noteDotOpacity', 1);
    } else {
        return;
    }
  },
  hideNoteDot(event) {
    event.target.style.setProperty('--noteDotOpacity', 0);
  },
  setupEventListeners() {
    fretboard.addEventListener('mouseover', this.showNoteDot);
    fretboard.addEventListener('mouseout', this.hideNoteDot);

    // Instrument selector
    selectedInstrumentSelector.addEventListener('change', (event) => {
      // Set currently selected instrument
      selectedInstrument = event.target.value;
      // Set number of strings based on length of selected instrument
      numberOfStrings = instrumentTuningPresets[selectedInstrument].length;
      // Render the fretboard with the new settings
      this.setupFretboard();
    });

    accidentalSelector.addEventListener('click', (event) => {
      if (event.target.classList.contains('acc-select')) {
        accidentals = event.target.value;
        this.setupFretboard();
      } else {
        return;
      }
    });

    numberOfFretsSelector.addEventListener('change', () => {
      numberOfFrets = numberOfFretsSelector.value;
      this.setupFretboard();
    });

    showAllNotesSelector.addEventListener('change', () => {
      // SEE IF ITS CHECKED OR NOT
      console.log(showAllNotesSelector.checked);

      if (showAllNotesSelector.checked) {
        // MAKE THE GLOBAL OPACITY VISIBLE WITH 1
        root.style.setProperty('--noteDotOpacity', 1);
        // REMOVE EVENTLISTENER FROM FRETBOARD
        fretboard.removeEventListener('mouseover', this.showNoteDot);
        fretboard.removeEventListener('mouseout', this.hideNoteDot);
        // SETUP THE FRETBOARD
        this.setupFretboard();
      } else {
        // SET OPACITY ON DOTS TO 0 AGAIN
        root.style.setProperty('--noteDotOpacity', 0);
        // RE ADD THE EVENTLISTENERS AND SETUP THE FRETBOARD AGAIN
        fretboard.addEventListener('mouseover', this.showNoteDot);
        fretboard.addEventListener('mouseout', this.hideNoteDot);
        this.setupFretboard();
      }
    });
  },
  // THE NAME OF THE NOTE TO SHOW AND 1 or 0 - the opacity
  toggleMultipleNotes(noteName, opacity) {
    // GET ALL NOTES IN A NODELIST
    let allNotes = document.querySelectorAll('.note-fret');
    console.log(allNotes);
    for (let i = 0; i < allNotes.length; i++) {
      console.log(allNotes[i]);
      // NOTE NAME IS EQUAL TO THE ONE WERE PASSING IN, SET ITS OPACITY TO 1 or 0 (whatever is passed in as the second argument)
      if (allNotes[i].dataset.note === noteName) {
        allNotes[i].style.setProperty('--noteDotOpacity', opacity);
      }
    }
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
