import complex from './complex';
import plain from './plain';
import json from './json';

const renderers = { complex, plain, json };
export default (format, diff) => renderers[format](diff);
