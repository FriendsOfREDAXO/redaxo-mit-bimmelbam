// import ES6 modules
import {dave} from './dave';
import nate from './nate';
import * as pat from './pat';

// require CommonJS/Node modules
const taylor = require('./taylor');
const chris = require('./chris');
const rami = require('./rami');

// build foo fighters
const fooFighters = [
    dave,
    nate,
    pat.name,
    taylor,
    chris(),
    rami.name
];

// export foo fighters
export default fooFighters;
