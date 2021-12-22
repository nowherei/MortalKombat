import { createElement } from '../utils.js';

/**
 * Функция создает html-элемент кнопки Restart
 * @returns {HTMLElement}
 */
const createReloadButton = () => {
  const $reloadWrap = createElement('div', 'reloadWrap');
  const $button = createElement('button', 'button');

  $button.innerText = 'Restart';
  $button.addEventListener('click', function () {
    window.location.reload();
  });
  $reloadWrap.appendChild($button);
  return $reloadWrap;
};

export default createReloadButton;
