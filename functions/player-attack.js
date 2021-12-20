import { HIT } from "../constants.js";
import { $formFight } from "../elements.js";
import { getRandom } from "../utils.js";

/**
 * Функция генерирует параметры атаки игрока 1
 * @returns {{hit: (string), defence: (string), value: number}}
 */
const playerAttack = () => {
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

export default playerAttack;
