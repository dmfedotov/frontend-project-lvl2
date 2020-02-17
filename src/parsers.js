import yaml from 'js-yaml';
import ini from 'ini';

export default (extension, file) => {
  const map = {
    json: (data) => JSON.parse(data),
    yml: (data) => yaml.safeLoad(data),
    ini: (data) => ini.parse(data),
  };

  return map[extension](file);
};
