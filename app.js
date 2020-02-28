const root = document.documentElement;
const fretboard = document.querySelector('.fretboard');
const instrumentSelector = document.querySelector('#instrument-selector');
const accidentalSelector = document.querySelector('.accidental-selector');
const numberOfFretsSelector = document.querySelector('#number-of-frets');
const showAllNotesSelector = document.querySelector('#show-all-notes');
const showMultipleNotesSelector = document.querySelector('#show-multiple-notes');
// NEW NEW NEW ADDED!
const noteNameSection = document.querySelector('.note-name-section');

// SET HERE SO WE DONT HAVE TO DO IT EVERY TIME WE HOVER OVER FRETBOARD
let allNotes;
let numberOfFrets = 20;
let showAllNotes = false;
let showMultipleNotes = false;

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
    this.setupinstrumentSelector();
    this.setupNoteNameSection();
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
    allNotes = document.querySelectorAll('.note-fret');
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
  setupinstrumentSelector() {
    // Loop over instruments in object
    for (instrument in instrumentTuningPresets) {
      // Create option element
      let instrumentOption = tools.createElement('option', instrument);
      instrumentSelector.appendChild(instrumentOption);
    }  
  },
  setupNoteNameSection() {
    // CLEAR ALL IN DIV
    noteNameSection.innerHTML = '';
    let noteNames;
    if (accidentals === 'flats') {
      noteNames = notesFlat;
    } else {
      noteNames = notesSharp;
    }
    noteNames.forEach((noteName) => {
      let noteNameElement = tools.createElement('span', noteName);
      noteNameSection.appendChild(noteNameElement);
    });
  },
  showNoteDot(event) {
    // Check to see if show all notes selector is on
    if (showAllNotes) {
      return;
    }
    if (event.target.classList.contains('note-fret')) {
      if (showMultipleNotes) {
        app.toggleMultipleNotes(event.target.dataset.note, 1);
      } else {
        event.target.style.setProperty('--noteDotOpacity', 1);
      }
    } 
  },
  hideNoteDot(event) {
    // Check to see if show all notes selector is on
    if (showAllNotes) {
      return;
    }
    if (showMultipleNotes) {
      app.toggleMultipleNotes(event.target.dataset.note, 0);
    } else {
      event.target.style.setProperty('--noteDotOpacity', 0);
    }
  },
  setSelectedInstrument(event) {
    // Set currently selected instrument
    selectedInstrument = event.target.value;
    // Set number of strings based on length of selected instrument
    numberOfStrings = instrumentTuningPresets[selectedInstrument].length;
    app.setupFretboard();
  },
  setAccidentals(event) {
    if (event.target.classList.contains('acc-select')) {
      accidentals = event.target.value;
      app.setupFretboard();
      // Update note names on the bottom
      app.setupNoteNameSection();
    } else {
      return;
    }
  },
  setNumberOfFrets() {
      numberOfFrets = numberOfFretsSelector.value;
      app.setupFretboard();
  },
  setShowAllNotes() {
    // REMOVED remove event listener lines..
    showAllNotes = showAllNotesSelector.checked;
      if (showAllNotes) {
        root.style.setProperty('--noteDotOpacity', 1);
        app.setupFretboard();
      } else {
        root.style.setProperty('--noteDotOpacity', 0);
        app.setupFretboard();
      }
  },
  setShowMultipleNotes() {
    showMultipleNotes = !showMultipleNotes;
  },
  setNotesToShow(event) {
    let noteToShow = event.target.innerText;
    app.toggleMultipleNotes(noteToShow, 1);
  },
  setNotesToHide(event) {
    if (!showAllNotes) {
      let noteToHide = event.target.innerText;
      app.toggleMultipleNotes(noteToHide, 0);
    } else {
      return;
    }
  },
  setupEventListeners() {
    fretboard.addEventListener('mouseover', this.showNoteDot);
    fretboard.addEventListener('mouseout', this.hideNoteDot);
    instrumentSelector.addEventListener('change', this.setSelectedInstrument);
    accidentalSelector.addEventListener('click', this.setAccidentals);
    numberOfFretsSelector.addEventListener('change', this.setNumberOfFrets);
    showAllNotesSelector.addEventListener('change', this.setShowAllNotes);
    showMultipleNotesSelector.addEventListener('change', this.setShowMultipleNotes);
    noteNameSection.addEventListener('mouseover', this.setNotesToShow);
    noteNameSection.addEventListener('mouseout', this.setNotesToHide);
  },
  toggleMultipleNotes(noteName, opacity) {
    for (let i = 0; i < allNotes.length; i++) {
      console.log(allNotes[i]);
      // NOTE NAME IS EQUAL TO THE ONE WERE PASSING IN, SET ITS OPACITY TO 1 or 0 (whatever is passed in as the second argument)
      if (allNotes[i].dataset.note === noteName) {
        allNotes[i].style.setProperty('--noteDotOpacity', opacity);
      }
    }
  }
}

const handlers = {
  

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
