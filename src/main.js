import Person from './person';

import './modules/moduleA';

import './assets'; // it will get index.js in assets folder

const attendant = new Person();
console.log(attendant.greets());
