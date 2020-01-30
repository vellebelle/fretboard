const fretboard = document.querySelector('.fretboard');
// testing
// WAIT WITH THESE VARIABLES UNTIL BEING USED. OTHERWISE CONFUSING..
// Setup consts and variables
const numberOfFrets = 12;
const numberOfStrings = 6;


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
const singleFretMarkPositions = [3, 5, 7, 9];

const app = {
    init() {
        this.setupFretboard();
    },
    setupFretboard() {
        // add strings to fretboard
        for (let i = 0; i < numberOfStrings; i++) {

            let string = tools.createElement('div');
            string.classList.add('string');
            fretboard.appendChild(string);

            // Loop inside loop to make frets inside each string
            for (let fret = 0; fret <= numberOfFrets; fret++) {
                // >= operator because we have 1+ fret because of 0ith fret
                let noteFret = tools.createElement('div');
                noteFret.classList.add('note-fret');
                // Add single fretmarks to specific frets, but only on the first string (i === 0)
                // AND Check to see if we are in a fret, where a single fretmark should be added
                if (i === 0 && singleFretMarkPositions.indexOf(fret) !== -1) {
                    noteFret.classList.add('single-fretmark');
                }
                
                string.appendChild(noteFret);
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