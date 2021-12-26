import { generateLogs, createElement } from './utils.js';
import { $arenas } from './elements.js';

export default class Player {
  constructor(props) {
    this.player = props.player;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
    this.weapon = props.weapon;
  }

  /**
   * Функция создает игрока
   * @param {Object} param0
   * @returns
   */
  createPlayer = () => {
    const { player, name, hp, img } = this;
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

    $arenas.appendChild($player);
  };

  /**
   * Фукнция атаки соперника
   * @param {Object} enemy
   */
  attack = (enemy) => {
    const { hit, value } = this.currentAttack;
    if (hit !== enemy.currentAttack.defence) {
      enemy.changeHP(value);
      enemy.renderHP();
      generateLogs('hit', this, enemy);
    } else {
      generateLogs('defence', this, enemy);
    }
  };

  /**
   * Функция изменяет hp
   * @param {number} number
   */
  changeHP = (number) => {
    this.hp -= number;

    if (this.hp < 0) {
      this.hp = 0;
    }
  };

  /**
   * Функция возвращает элемент с кол-вом жизни
   * @returns {Element}
   */
  elHp = () => {
    return document.querySelector(`.player${this.player} .life`);
  };

  /**
   * Рендер hp
   */
  renderHP = () => {
    this.elHp().style.width = `${this.hp}%`;
  };
}

/* export const player1 = new Player({
  player: 1,
  name: 'SCORPION',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['Kunai'],
});

export const player2 = new Player({
  player: 2,
  name: 'KITANA',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  weapon: ['Bladed Fans'],
}); */
