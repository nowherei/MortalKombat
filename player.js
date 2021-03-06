import generateLogs from './functions/generate-log.js';

export const player1 = {
  player: 1,
  name: 'SCORPION',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['Kunai'],
  currentAttack: {},
  attack,
  changeHP,
  elHp,
  renderHP,
};

export const player2 = {
  player: 2,
  name: 'KITANA',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  weapon: ['Bladed Fans'],
  currentAttack: {},
  attack,
  changeHP,
  elHp,
  renderHP,
};

/**
 * Фукнция атаки соперника
 * @param {Object} enemy
 */
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

/**
 * Функция изменяет hp
 * @param {number} number
 */
function changeHP(number) {
  this.hp -= number;

  if (this.hp < 0) {
    this.hp = 0;
  }
}

/**
 * Функция возвращает элемент с кол-вом жизни
 * @returns {Element}
 */
function elHp() {
  return document.querySelector(`.player${this.player} .life`);
}

/**
 * Рендер hp
 */
function renderHP() {
  this.elHp().style.width = `${this.hp}%`;
}
