export default class ApiService {
  _apiBase = 'https://reactmarathon-api.herokuapp.com/api/mk/';

  getResourse = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
    }
    return await res.json();
  };

  getPlayers = async () => {
    return await this.getResourse('players');
  };

  getRandomPlayer = async () => {
    return await this.getResourse('player/choose');
  };

  getPlayerFight = async ({ hit, defence }) => {
    return fetch(`${this._apiBase}player/fight`, {
      method: 'POST',
      body: JSON.stringify({
        hit,
        defence,
      }),
    }).then((res) => res.json());
  };
}
