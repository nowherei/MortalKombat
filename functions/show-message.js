import { createElement } from "../utils.js";

/**
 * Функция создает html-элемент с результатом игры
 * @param {string} name
 * @returns {HTMLElement}
 */
const showMessage = (name) => {
  const $loseTitle = createElement('div', 'loseTitle');

  if (name) {
    $loseTitle.innerText = `${name} wins`;
  } else {
    $loseTitle.innerText = 'draw';
  }

  return $loseTitle;
};

export default showMessage;
