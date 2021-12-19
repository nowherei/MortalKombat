const $arenas = document.querySelector('.arenas');
const $reloadWrap = createReloadButton();
const $formFight = document.querySelector('.control');

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
  player: 1,
  name: 'SCORPION',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['Kunai'],
  attack,
  changeHP,
  elHp,
  renderHP,
  currentAttack: {},
};

const player2 = {
  player: 2,
  name: 'KITANA',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  weapon: ['Bladed Fans'],
  attack,
  changeHP,
  elHp,
  renderHP,
  currentAttack: {},
};

function attack(enemy) {
  console.log(`${this.name} Fight...`);
  const {hit, value} = this.currentAttack;
  if (hit !== enemy.currentAttack.defence) {
    enemy.changeHP(value);
    enemy.renderHP();
  }
}

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

function changeHP(number) {
  this.hp -= number;

  if (this.hp < 0) {
    this.hp = 0;
  }
}

function elHp() {
  return document.querySelector(`.player${this.player} .life`);
}

function renderHP() {
  this.elHp().style.width = this.hp + '%';
}

function showMessage(name) {
  const $loseTitle = createElement('div', 'loseTitle');
  
  if (name) {
    $loseTitle.innerText = `${name} wins`;
  } else {
    $loseTitle.innerText = 'draw';
  }

  return $loseTitle;
}

function getRandom(number = 20) {
  return Math.floor(Math.random() * number + 1);
}

function createReloadButton() {
  const $reloadWrap = createElement('div', 'reloadWrap');
  const $button = createElement('button', 'button');

  $button.innerText = 'Restart';
  $button.addEventListener('click', function() {
    window.location.reload();
  });
  $reloadWrap.appendChild($button);
  return $reloadWrap;
}

function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];
  
  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  }
}

function playerAttack() {
  const attack = {};

  for (let item of $formFight) {
    if (item.checked && item.name === 'hit') {
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }

    if (item.checked && item.name === 'defence') {
      attack.defence = item.value;
    }

    item.checked = false;
  }

  return attack;
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

$formFight.addEventListener('submit', function(e) {
  e.preventDefault();
  player2.currentAttack = enemyAttack();
  player1.currentAttack = playerAttack();

  player1.attack(player2);
  player2.attack(player1);

  if (player1.hp === 0 || player2.hp === 0) {
    $arenas.appendChild($reloadWrap);
    $formFight.style.display = 'none';
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(showMessage(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(showMessage(player1.name));
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(showMessage());
  }

});