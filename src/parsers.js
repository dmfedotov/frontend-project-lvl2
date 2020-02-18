import yaml from 'js-yaml';
import ini from 'ini';

export default (extension, file) => {
  const extensionToParser = {
    json: (data) => JSON.parse(data),
    yml: (data) => yaml.safeLoad(data),
    ini: (data) => ini.parse(data),
  };

  return extensionToParser[extension](file);
};
