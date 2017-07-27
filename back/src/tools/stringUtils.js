import * as _ from 'lodash';

export class StringUtils {

  static escape(name) {
    const unacceptedChars = ['\'', '’', ' ', '-', '_'];

    for(const c of unacceptedChars) {
      name = name.replace(new RegExp(`${c}`, 'g'), '');
    }

    name = _.deburr(name)
      .toLowerCase();

    return name;
  }

}
