const processNames = (rawData) => {
  const years = Object.keys(rawData);
  let final = new Object();
  final.years = years;
  let names = new Object();
  let values = Object.values(rawData);
  rank = 0;
  let yearIndex = 0;
  for(index = 0; index < values.length; index++){
    let yearInfo = values[index];
    for(i = 0; i < yearInfo.length; i++){
      let person = yearInfo[i];
      let name = person[0];
      if(!(names.hasOwnProperty(name))){
        let info = new Array(10).fill(null);
        names[name] = info;
      }
      let count = person[1];
      let arrpersonData = names[name];
      let forThisYear = new Object();
      forThisYear.rank = rank;
      forThisYear.count = count;
      arrpersonData[yearIndex] = forThisYear;
      rank++;
    }
    delete rank;
    rank = 0;
    yearIndex++;
  }
  final.names = names;
  return final;
};
