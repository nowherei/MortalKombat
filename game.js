import { HIT, ATTACK } from './constants.js';
import Player from './player.js';
import ApiService from './api-service.js';
import { $arenas, $formFight } from './elements.js';
import { getRandom, createElement, generateLogs } from './utils.js';

const apiService = new ApiService();
let player1, player2;
export default class Game {
  start = async () => {
    const p2 = await apiService.getRandomPlayer();
    player1 = new Player({
      ...JSON.parse(localStorage.getItem('player1')),
      player: 1,
    });
    player2 = new Player({
      ...p2,
      player: 2,
    });
    player1.createPlayer();
    player2.createPlayer();

    generateLogs('start', player1, player2);

    $formFight.addEventListener('submit', async (e) => {
      e.preventDefault();
      const playerFight = await apiService.getPlayerFight(this.playerAttack());
      console.log(playerFight);
      player1.currentAttack = playerFight.player1;
      player2.currentAttack = playerFight.player2;

      player1.attack(player2);
      player2.attack(player1);

      this.showResult();
    });
  };

  /**
   * Функция выводит результат игры
   */
  showResult = () => {
    if (player1.hp === 0 || player2.hp === 0) {
      const $reloadWrap = this.createReloadButton();
      $arenas.appendChild($reloadWrap);
      $formFight.style.display = 'none';
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
      $arenas.appendChild(this.showMessage(player2.name));
      generateLogs('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
      $arenas.appendChild(this.showMessage(player1.name));
      generateLogs('end', player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
      $arenas.appendChild(this.showMessage());
      generateLogs('draw', player1, player2);
    }
  };

  /**
   * Функция создает html-элемент кнопки Restart
   * @returns {HTMLElement}
   */
  createReloadButton = () => {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button');

    $button.innerText = 'Restart';
    $button.addEventListener('click', function () {
      window.location.pathname = '';
    });
    $reloadWrap.appendChild($button);
    return $reloadWrap;
  };

  /**
   * Функция создает html-элемент с результатом игры
   * @param {string} name
   * @returns {HTMLElement}
   */
  showMessage = (name) => {
    const $loseTitle = createElement('div', 'loseTitle');

    if (name) {
      $loseTitle.innerText = `${name} wins`;
    } else {
      $loseTitle.innerText = 'draw';
    }

    return $loseTitle;
  };

  /**
   * Функция генерирует параметры атаки игрока 1
   * @returns {{hit: (string), defence: (string), value: number}}
   */
  playerAttack = () => {
    const attack = {};

    for (let item of $formFight) {
      const { checked, name, value } = item;
      if (checked && name === 'hit') {
        attack.value = getRandom(HIT[value]);
        attack.hit = value;
      }

      if (checked && name === 'defence') {
        attack.defence = value;
      }

      item.checked = false;
    }

    return attack;
  };

  /**
   * Функция генерирует параметры атаки игрока 2
   * @returns {{hit: (string), defence: (string), value: number}}
   */
  enemyAttack = () => {
    const length = ATTACK.length;
    const hit = ATTACK[getRandom(length) - 1];
    const defence = ATTACK[getRandom(length) - 1];

    return {
      value: getRandom(HIT[hit]),
      hit,
      defence,
    };
  };
}
