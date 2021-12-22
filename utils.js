/**
 * Функция генерирует целое число от 1 до number
 * @param {number} number
 * @returns {number}
 */
export function getRandom(number = 20) {
  return Math.floor(Math.random() * number + 1);
}

/**
 * Функция форамитирует время
 * @param {number} time
 * @returns {string}
 */
const generateTimeString = (time) => {
  return ('0' + time).slice(-2);
};

/**
 * Функция генерирует текущее время
 * @returns {string}
 */
export const getTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  return `${generateTimeString(hours)}:${generateTimeString(
    minutes
  )}:${generateTimeString(seconds)}`;
};

/**
 * Функция создает html-элемент
 * @param {string} tag
 * @param {string} [className]
 * @returns {HTMLElement}
 */
export const createElement = (tag, className) => {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
};
