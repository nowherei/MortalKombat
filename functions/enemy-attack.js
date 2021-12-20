import { HIT, ATTACK } from "../constants.js";
import { getRandom } from "../utils.js";

/**
 * Функция генерирует параметры атаки игрока 2
 * @returns {{hit: (string), defence: (string), value: number}}
 */
const enemyAttack = () => {
  const length = ATTACK.length;
  const hit = ATTACK[getRandom(length) - 1];
  const defence = ATTACK[getRandom(length) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
};

export default enemyAttack;