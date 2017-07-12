/**
* LOGIC
*/

var score = 0;
var playerChoice;

var readable = {
  '0': 'Taş',
  '1': 'Kağıt',
  '2': 'Makas'
};

var cpuChoice = {
  init: function() {
    this.store = Math.floor(Math.random() * 3);
    this.text = readable[this.store];
  },
  store: '',
  text: ''
};

var order = [0, 1, 2, 0];

var chooseWinner = function(player, cpu) {
  if(order[player] === order[cpu]) {
    return 'Oyun berabere. Tekrar Dene ??';
  }
  if(order[player] === order[cpu + 1]) {
    score++;
    return "Kazandın !";
  } else {
    score--;
    return 'Kaybettin :(';
  }
}

/**
* UI
*/

var paragraph = document.querySelector('p');

var assignClick = function(tag, pos) {
  // assign a click listener
  tag.addEventListener('click', function() {
    // set the players choice
    playerChoice = pos;
    // give feedback to the cpu cpuChoice
    cpuChoice.init();
    paragraph.innerText = 'Bilgisayarın seçimi: ' + cpuChoice.text;
    // determine a winner
    // display the winner and the current score
    paragraph.innerText += '\n' + chooseWinner(playerChoice, cpuChoice.store);
    paragraph.innerText += '\n' + 'SKORUN: ' + score;
  });
}

var images = {
  tags: document.getElementsByTagName('img'),
  init: function() {
    for(var step = 0; step < this.tags.length; step++) {
      assignClick(this.tags[step], step);
    }
  }
}

images.init();
