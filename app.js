const fretboard = document.querySelector('.fretboard');
const root = document.documentElement;
// testing
// WAIT WITH THESE VARIABLES UNTIL BEING USED. OTHERWISE CONFUSING..
// Setup consts and variables
const numberOfFrets = 24;
const numberOfStrings = 7;


//WAIT WITH TUNING
// const tuning = ['E', 'B', 'G', 'D', 'A', 'E']; // reverse order from top of screen

//WAIT WITH THIS.. CONFUSING IF TOO EARLY
// sharps the noteletter without the accidental. ie: C, C#, D, D#, E, F, F#, G, G#, A, A#, B
// const notesSharp = ["C", "C", "D", "D", "E", "F", "F", "G", "G", "A", "A", "B"];
// Same concept for the flats
// const notesFlat = ["C", "D", "D", "E", "E", "F", "G", "G", "A", "A", "B", "B"];

// determines whether the note dots should use flats or sharps
// let accidentals = 'flats';

// Where the single fretmarks should be positioned on the fretboard
const singleFretMarkPositions = [3, 5, 7, 9, 15, 17, 19, 21];
const doubleFretMarkPositions = [12, 24];
const app = {
    init() {
        this.setupFretboard();
    },
    setupFretboard() {
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
