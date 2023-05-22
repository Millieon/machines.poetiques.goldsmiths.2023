// --------------------------------------------------------------------------------
// Wordmaking & combinatorics
//
// Jérémie Wenger, 2023
// With Iris Colomb, in the context of *Machines poétiques*: exploring textual
// systems through experimental French poetry, Goldsmiths College
// --------------------------------------------------------------------------------

// sources
// -------
// Latin prefixes: https://pressbooks.bccampus.ca/greeklatinroots/chapter/%C2%A759-a-summary-of-latin-prefixes
// Greek prefixes: https://pressbooks.bccampus.ca/greeklatinroots2/chapter/%c2%a7132-a-summary-of-greek-prefixes/
// English prefixes: https://en.wikipedia.org/wiki/English_prefix

// Verb-producing suffixes: https://en.wiktionary.org/wiki/Category:English_verb-forming_suffixes
// Noun-producing suffixes: https://en.wiktionary.org/wiki/Category:English_noun-forming_suffixes
// Adverb-producing suffixes: https://en.wiktionary.org/wiki/Category:English_adverb-forming_suffixes
// Adjective-producing suffixes: https://en.wiktionary.org/wiki/Category:English_adjective-forming_suffixes

let roots;
let prefixes;
let suffixes;

let typeWriterFont;

function preload() {

  roots = ['tens', 'react'];

  prefixes = {
    'latin': loadStrings('data/latin-prefixes.txt', removeEmptyStrings),
    'greek': loadStrings('data/greek-prefixes.txt', removeEmptyStrings),
    'english': loadStrings('data/english-prefixes.txt', removeEmptyStrings),
  }

  suffixes = {
    'verbs': loadStrings('data/verb-producing-suffixes.txt', removeEmptyStrings),
    'nouns': loadStrings('data/noun-producing-suffixes.txt', removeEmptyStrings),
    'adverbs': loadStrings('data/adverb-producing-suffixes.txt', removeEmptyStrings),
    'adjectives': loadStrings('data/adjective-producing-suffixes.txt', removeEmptyStrings),
  }

  // // print prefixes
  // for (k in prefixes) {
  //   console.log('----------------------------------------');
  //   console.log(k);
  //   console.log(prefixes[k]);
  // }

  // // print suffixes
  // for (k in suffixes) {
  //   console.log('----------------------------------------');
  //   console.log(k);
  //   console.log(suffixes[k]);
  // }

  // https://www.fontspace.com/truetypewriter-polyglott-font-f14955
  // Weirdly, the font downloaded from the above link throws errors I don't
  // want to get into... This link works:
  // https://www.dafontfree.net/truetypewriter-polyglott-regular/f102970.htm
  typeWriterFont = loadFont('fonts/TTWPGOTT.ttf');

}


function setup() {

  createCanvas(800, 400);

  textFont(typeWriterFont);
  fill(0);

  createUI();

  createWords();

  background(0);

  pickRandomWord('latin', 'verbs');

}

function draw() {

}

function keyPressed() {
  switch (key) {
    case '¬':
      toggleUI();
      return;
    case ' ':
      pickRandomWord('latin', 'verbs');
  }
}

function createWords() {
  const combinationsDiv = document.getElementById('combinations-container');
  for (const pref of prefixes['latin']) {
    for (const suff of suffixes['verbs']) {
      const el = document.createElement('div');
      const newWord = document.createTextNode(`${pref} ${roots[0]} ${suff}`);
      el.appendChild(newWord);
      combinationsDiv.appendChild(el);
    }
  }
}

function pickRandomWord(prefixType, suffixType) {
  push();

  const randomPrefixIndex = Math.floor(Math.random() * prefixes[prefixType].length);
  const randomPrefix = prefixes[prefixType][randomPrefixIndex];
  const randomRootIndex = Math.floor(Math.random() * roots.length);
  const randomRoot = roots[randomRootIndex];
  const randomSuffixIndex = Math.floor(Math.random() * suffixes[suffixType].length);
  const randomSuffix = suffixes[suffixType][randomSuffixIndex];

  background(0);

  textAlign(CENTER, CENTER);
  textSize(60);
  fill(255);

  text(`${randomPrefix}${randomRoot}${randomSuffix}`, width/2, height/2);
  pop();
}

// --------------------------------------------------------------------------------
// UI with text boxes, buttons, etc.
// partial inspiration from here: https://www.geeksforgeeks.org/how-to-create-a-form-dynamically-with-the-javascript/

function createUI() {

  const UI = document.createElement('div');
  UI.setAttribute('id', 'ui');

  const title = document.createElement('h1');
  title.innerHTML = 'Combinations';

  // base prompt ---------------------------------------
  const combinationsDiv = document.createElement('div');
  combinationsDiv.setAttribute('id', 'combinations-container');

  // build ui -----------------------------------

  // append the form to the body
  UI.appendChild(title);
  UI.appendChild(combinationsDiv);

  // append to the body
  document.body.appendChild(UI);
}

function toggleUI() {
  const ui = document.getElementById('ui');
  if (ui.style.display === 'none') {
    ui.style.display = 'block';
  } else {
    ui.style.display = 'none';
  }
}

// --------------------------------------------------------------------------------
// utils

// prevent the space bar from scrolling!
// https://stackoverflow.com/questions/22559830/html-prevent-space-bar-from-scrolling-page
window.addEventListener('keydown', function(e) {
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});

function removeEmptyStrings(arr) {
  return arr.filter(s => s.length > 0);
}

