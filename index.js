import _ from 'lodash';

const parseLine = (line) => {
  const chars = (line + ',').split('');
  const parsedLine =  chars.reduce((acc, char, index, arr) => {
      if (char === '"') {
        acc.inQuote = !acc.inQuote;
        if(acc.inQuote && index > 1 && arr[index - 1] === '"') {
          acc.buff.push(char);
        }
      } else if (char === ',' && !acc.inQuote) {
        acc.data.push(acc.buff.join(''));
        acc.buff = [];
      } else {
        acc.buff.push(char);
      }
      return acc;
    }, {inQuote: false, data: [], buff: []})
    .data;
  return {
    survived: parsedLine[1],
    name: parsedLine[3], 
    sex: parsedLine[4],
    embarked: parsedLine[11],
  };
}

const parseData = (content) => {
    return content.trim('\r\n').split('\r\n').slice(20, 30).map((l) => parseLine(l));
};

export default function solution(content){
  // BEGIN
  const data = parseData(content);
  console.log(data);
  // выведите число сколько всего пассажиров в этой таблице
  const count = data.length;
  console.log(`Count: ${count}`);
  // выведите все именования портов посадки (колонка Embarked)
  const embarked = _.uniq(data.map((d) => d.embarked));
  console.log(`Embarked: ${embarked.join(', ')}`);
  // выведите соотношение пассажиров мужчин и женщин
  const maleCount = data.filter((d) => d.sex === 'male').length;
  console.log(`Male: ${maleCount}, female: ${count - maleCount}`);
  // выведите процент выживших пассажиров
  const sirvivedCount = data.filter((d) => d.survived === '1').length;
  console.log(`Survived percent: ${(sirvivedCount / count * 100).toPrecision(4)}%`);
  // выведите имена всех пассажиров, начинающиеся на букву А
  const aNameCount = data.filter((d) => d.name.toLowerCase().startsWith('a')).length;
  console.log(`A count: ${aNameCount}`);
  // END
}
