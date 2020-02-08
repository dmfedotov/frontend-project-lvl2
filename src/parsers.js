import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

export default (extension) => {
  const map = {
    json: (path) => JSON.parse(fs.readFileSync(path, 'utf-8')),
    yml: (path) => yaml.safeLoad(fs.readFileSync(path, 'utf-8')),
    ini: (path) => ini.parse(fs.readFileSync(path, 'utf-8')),
  };

  return map[extension];
};
