import { player1, player2 } from '../player.js';
import { $arenas, $formFight } from '../elements.js';
import createReloadButton from './create-reload-button.js';
import showMessage from './show-message.js';
import generateLogs from './generate-log.js';

/**
 * Функция выводит результат игры
 */
const showResult = () => {
  if (player1.hp === 0 || player2.hp === 0) {
    const $reloadWrap = createReloadButton();
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
};

export default showResult;
