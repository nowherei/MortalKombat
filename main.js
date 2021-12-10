const $arenas = document.querySelector('.arenas');

const player1 = {
  name: 'SCORPION',
  hp: 50,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['Kunai'],
  attack: function () {
    console.log(`${this.name} Fight`);
  },
};

const player2 = {
  name: 'KITANA',
  hp: 80,
  img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  weapon: ['Bladed Fans'],
  attack: function () {
    console.log(`${this.name} Fight`);
  },
};

function createDiv(className) {
  const $div = document.createElement('div');
  $div.classList.add(className);
  return $div;
}

function createPlayer(className, {name, hp, img}) {
  const $player = createDiv(className);

  const $progressBar = createDiv('progressbar');
  const $life = createDiv('life');
  $life.style.width = `${hp}%`;
  const $name = createDiv('name');
  $name.innerText = name;
  $progressBar.appendChild($life);
  $progressBar.appendChild($name);

  const $character = createDiv('character');
  const $img = document.createElement('img');
  $img.src = img;
  $character.appendChild($img);

  $player.appendChild($progressBar);
  $player.appendChild($character);

  $arenas.appendChild($player);
}

createPlayer('player1', player1);
createPlayer('player2', player2);
