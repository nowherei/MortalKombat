import { getTime, getRandom } from '../utils.js';
import { LOGS } from '../constants.js';
import { $chat } from '../elements.js';

/**
 * Функция генерурует лог
 * @param {string} type
 * @param {Object} player1
 * @param {Object} player2
 */
const generateLogs = (type, player1, player2) => {
  const time = getTime();
  let el, text;
  switch (type) {
    case 'start':
      text = LOGS[type]
        .replace('[time]', time)
        .replace('[player1]', player1.name)
        .replace('[player2]', player2.name);
      el = `<p>${text}</p>`;
      break;
    case 'end':
      text = LOGS[type][getRandom(LOGS[type].length) - 1]
        .replace('[playerWins]', player1.name)
        .replace('[playerLose]', player2.name);
      el = `<p>${text}</p>`;
      break;
    case 'hit':
      text = LOGS[type][getRandom(LOGS[type].length) - 1]
        .replace('[playerKick]', player1.name)
        .replace('[playerDefence]', player2.name);
      el = `<p>${time} - ${text} -${player1.currentAttack.value} [${player2.hp}/100]</p>`;
      break;
    case 'defence':
      text = LOGS[type][getRandom(LOGS[type].length) - 1]
        .replace('[playerKick]', player1.name)
        .replace('[playerDefence]', player2.name);
      el = `<p>${time} - ${text}</p>`;
      break;
    case 'draw':
      el = `<p>${LOGS.draw}</p>`;
      break;
  }
  if (el) {
    $chat.insertAdjacentHTML('afterbegin', el);
  }
};

export default generateLogs;
