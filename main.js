import { player1, player2 } from './player.js';
import { $arenas, $formFight } from './elements.js';
import generateLogs from './functions/generate-log.js';
import showResult from './functions/show-result.js';
import createPlayer from './functions/create-player.js';
import playerAttack from './functions/player-attack.js';
import enemyAttack from './functions/enemy-attack.js';

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
