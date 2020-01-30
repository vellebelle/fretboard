const fretboard = document.querySelector('.fretboard');
// testing
// Setup consts and variables
const numberOfFrets = 12;
const numberOfStrings = 6;
const tuning = ['E', 'B', 'G', 'D', 'A', 'E']; // reverse order from top of screen

// sharps the noteletter without the accidental. ie: C, C#, D, D#, E, F, F#, G, G#, A, A#, B
const notesSharp = ["C", "C", "D", "D", "E", "F", "F", "G", "G", "A", "A", "B"];
// Same concept for the flats
const notesFlat = ["C", "D", "D", "E", "E", "F", "G", "G", "A", "A", "B", "B"];

// determines whether the note dots should use flats or sharps
let accidentals = 'flats';

const app = {
    init() {
        this.setupFretboard();
    },
    setupFretboard() {
        // add strings to fretboard
        for (let i = 0; i < numberOfStrings; i++) {
            // Test to get the string names
            console.log(`String: ${tuning[i]}`);
            // Loop inside loop to make frets inside each string
            for (let fret = 0; fret <= numberOfFrets; fret++) {
                // >= operator because we have 1+ fret because of 0ith fret
                console.log(`Fret number ${fret}`);
            }
        }
    }
}
const tools = {
    createElement(element, content) {
        element = document.createElement(element);
        element.innerHTML = content;
        return element;
    }
}
app.init();