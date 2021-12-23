import { HIT, ATTACK } from './constants.js';
import { player1, player2 } from './player.js';
import { $arenas, $formFight } from './elements.js';
import { getRandom, createElement, generateLogs } from './utils.js';

export default class Game {
  start = () => {
    $arenas.appendChild(this.createPlayer(player1));
    $arenas.appendChild(this.createPlayer(player2));

    generateLogs('start', player1, player2);

    $formFight.addEventListener('submit', (e) => {
      e.preventDefault();
      player1.currentAttack = this.playerAttack();
      player2.currentAttack = this.enemyAttack();

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
      window.location.reload();
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
   * Функция создает игрока
   * @param {Object} param0
   * @returns
   */
  createPlayer = ({ player, name, hp, img }) => {
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
