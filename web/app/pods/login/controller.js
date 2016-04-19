import Ember from 'ember';
import fetch from 'ember-network/fetch';
import { task } from 'ember-concurrency';

function createCookie(name, value, days) {
  let expires = '';

  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toGMTString()}`;
  }

  document.cookie = `${name}=${value}${expires}; path=/`;
}

export default Ember.Controller.extend({
  login: task(function* login(email, password) {
    const promise = yield fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const response = yield promise.json();

    if (promise.status === 200) {
      createCookie('login-user', response['login-user'], 365);
      createCookie('login-token', response['login-token'], 365);
      this.transitionToRoute('game');
    }
  }).drop()
});
