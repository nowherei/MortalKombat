const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
  player: 1,
  name: 'SCORPION',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['Kunai'],
  attack: function () {
    console.log(`${this.name} Fight`);
  },
};

const player2 = {
  player: 2,
  name: 'KITANA',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  weapon: ['Bladed Fans'],
  attack: function () {
    console.log(`${this.name} Fight`);
  },
};

function createElement(tag, className) {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
}

function createPlayer({ player, name, hp, img }) {
  const $player = createElement('div', `player${player}`);
  const $progressBar = createElement('div', 'progressbar');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $character = createElement('div', 'character');
  const $img = createElement('img');

  $life.style.width = `${hp}%`;
  $name.innerText = name;
  $img.src = img;

  $progressBar.appendChild($life);
  $progressBar.appendChild($name);
  $character.appendChild($img);

  $player.appendChild($progressBar);
  $player.appendChild($character);

  return $player;
}

function gameOver(id) {
  const $loseTitle = document.querySelector('.loseTitle');

  if ($loseTitle) {
    $loseTitle.innerText = 'Draw!';
    return;
  }

  let winsPlayer = player1;
  if (id === 1) {
    winsPlayer = player2;
  }

  $arenas.appendChild(showMessage(`${winsPlayer.name} wins`));
  $randomButton.disabled = true;
}

function changeHP(player) {
  const $playerLife = document.querySelector(`.player${player.player} .life`);
  player.hp -= numberRandom();

  if (player.hp <= 0) {
    player.hp = 0;
    gameOver(player.player);
  }

  $playerLife.style.width = player.hp + '%';
}

function showMessage(text) {
  const $loseTitle = createElement('div', 'loseTitle');
  $loseTitle.innerText = text;

  return $loseTitle;
}

function numberRandom() {
  return Math.floor(Math.random() * 20 + 1);
}

$randomButton.addEventListener('click', function() {
  console.log('###: Click Random Button');
  changeHP(player1);
  changeHP(player2);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
