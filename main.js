const $arenas = document.querySelector('.arenas');
const $reloadWrap = createReloadButton();
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];

const logs = {
  start:
    'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
  end: [
    'Результат удара [playerWins]: [playerLose] - труп',
    '[playerLose] погиб от удара бойца [playerWins]',
    'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  hit: [
    '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
    '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
    '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
    '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
    '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
    '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
    '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
    '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
    '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
    '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
    '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
    '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
    '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
    '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
    '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
    '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
    '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
    '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
  ],
  defence: [
    '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
    '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
    '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
    '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
    '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
    '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
  ],
  draw: 'Ничья - это тоже победа!',
};

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
  const { hit, value } = this.currentAttack;
  if (hit !== enemy.currentAttack.defence) {
    enemy.changeHP(value);
    enemy.renderHP();
    generateLogs('hit', this, enemy);
  } else {
    generateLogs('defence', this, enemy);
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
  $button.addEventListener('click', function () {
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
  };
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

function showResult() {
  if (player1.hp === 0 || player2.hp === 0) {
    $arenas.appendChild($reloadWrap);
    $formFight.style.display = 'none';
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(showMessage(player2.name));
    generateLogs('end', player2, player1);
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(showMessage(player1.name));
    generateLogs('end', player1, player2);
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(showMessage());
    generateLogs('draw', player1, player2);
  }
}

function getTime() {
  const now = new Date();
  return `${('0' + now.getHours()).slice(-2)}:${('0' + now.getMinutes()).slice(
    -2
  )}`;
}

function generateLogs(type, player1, player2) {
  const time = getTime();
  let el, text;
  switch (type) {
    case 'start':
      text = logs[type]
        .replace('[time]', time)
        .replace('[player1]', player1.name)
        .replace('[player2]', player2.name);
      el = `<p>${text}</p>`;
      break;
    case 'end':
      text = logs[type][getRandom(logs[type].length) - 1]
        .replace('[playerWins]', player1.name)
        .replace('[playerLose]', player2.name);
      el = `<p>${text}</p>`;
      break;
    case 'hit':
      text = logs[type][getRandom(logs[type].length) - 1]
        .replace('[playerKick]', player1.name)
        .replace('[playerDefence]', player2.name);
      el = `<p>${time} - ${text} -${player1.currentAttack.value} [${player2.hp}/100]</p>`;
      break;
    case 'defence':
      text = logs[type][getRandom(logs[type].length) - 1]
        .replace('[playerKick]', player1.name)
        .replace('[playerDefence]', player2.name);
      el = `<p>${time} - ${text}</p>`;
      break;
    case 'draw':
      el = `<p>${logs.draw}</p>`;
      break;
  }
  if (el) {
    $chat.insertAdjacentHTML('afterbegin', el);
  }
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

generateLogs('start', player1, player2);

$formFight.addEventListener('submit', function (e) {
  e.preventDefault();
  player1.currentAttack = playerAttack();
  player2.currentAttack = enemyAttack();

  player1.attack(player2);
  player2.attack(player1);

  showResult();
});
