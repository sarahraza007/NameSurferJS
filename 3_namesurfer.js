const NUM_COLORS = 5;
let CURR_COLOR = 0;
let NAME_DATA;

//This function implements adding the name to the left side list when the grpah button is clicked
const nameListOnGraph = (name) => {
  //Clears input after each press of the graph button
  let form = document.querySelector("#graphForm");
  form.reset();
  colorSelector();
  //Clones template node with children and pushes it back in, ensuring list has two of same node
  let originalTemplate = document.querySelector(".template");
  let copyTemplate = originalTemplate.cloneNode(true);
  document.querySelector("#nameList").appendChild(copyTemplate);
  //Selects most recently pushed in node and makes it visibile
  let template = document.querySelector(".template");
  template.className = name;
  //Makes name visible in list with correct color
  let childNodeSpan = template.querySelector("span");
  childNodeSpan.innerHTML = name;
  childNodeSpan.className = "nameLabel labelColor" + CURR_COLOR;
  //Makes colorblock visible in list with correct color
  let childNodeColor = template.querySelector("div");
  childNodeColor.className = "colorSquare barColor" + CURR_COLOR;
  //Delete button
  let childNodeDelete = template.querySelector("button");
  childNodeDelete.addEventListener("click", onDelete);
};


//Selects which color will be used
const colorSelector = () => {
  if(CURR_COLOR < NUM_COLORS){
    CURR_COLOR++;
  } else {
    CURR_COLOR = 1;
  }
};

//This function ensures only the first letter of the name is capitalized
const capitalize = (s) => {
  return s.charAt(0).toUpperCase() + (s.slice(1)).toLowerCase();
};

//This function implements the delete button
const onDelete = (event) => {
  event.stopPropagation();
  let listItem = event.currentTarget.parentNode;
  let name = listItem.className;
  listItem.remove();
  let barstoRemove = document.querySelectorAll("#" + name);
  for(i = 0; i < barstoRemove.length; i++){
    let bar = barstoRemove[i];
    bar.remove();
  }
};

//This function writes in the years on the xaxis
const yearLabels = (years) => {
  let xaxis = document.querySelector("#xaxis");
  for(i = 0; i < years.length; i++){
    let year = document.createElement("div");
    year.innerHTML = years[i];
    xaxis.appendChild(year);
  }
}

//This function creates column divs for every year
const columndivCreator = (years) => {
  let parentNode = document.querySelector("#columns");
  for(i = 0; i < NAME_DATA.years.length; i++){
    let column = document.createElement("div");
    column.className = "column";
    column.id = "year" + years[i];
    parentNode.appendChild(column);
  }
}

//This method adds in a bar for each year of data for the name
const addBar = (name) => {
  years = NAME_DATA.years;
  for(i = 0; i < NAME_DATA.years.length; i++){;
    let parentNode = document.querySelector("#year" + years[i]);
    let bar = document.createElement("div");
    bar.className = "bar barColor" + CURR_COLOR;
    bar.id = name;
    let yearData = NAME_DATA.names[name][i];
    let rank = 0;
    let count = 0;
    if(!(yearData)){
      rank = 1000;
    } else {
      rank = yearData.rank;
      count = yearData.count;
    }
    let height = (1 - rank/1000) * 100;
    bar.style = "height:" + height + "%";
    bar.title = name + ":" + count;
    parentNode.appendChild(bar);
  }
  let node = document.querySelector("#columns");
  console.log(node);
}

//This method reads in the name from the input and calls the relevant methods based on the input
const nameGraphOnGraph = (event) => {
  //ensures page does not refresh every time
  event.preventDefault();
  //Ensures that if error message was up previously it is now hiddeen
  let error = document.querySelector("#errorMsg");
  error.className = "hidden";
  //Saves name as variable and ensures it is in correct typecase
  let input = document.querySelector("#nameInput");
  let name = input.value;
  name = capitalize(name);
  //Only displays error message if no name is entered or name is not in list
  if(!name){
    errorMssg("Please enter a name");
    return;
  }
  if(!(name in NAME_DATA.names)){
    errorMssg("No data for " + name);
    return;
  }
  nameListOnGraph(name);
  addBar(name);
}

//This method displays a customized error message and resets the input bar
const errorMssg = (message) => {
  let error = document.querySelector("#errorMsg");
  error.className = "visible";
  error.innerHTML = message;
  let form = document.querySelector("#graphForm");
  form.reset();
}

const main = () => {
  NAME_DATA = processNames(RAW_NAME_DATA);
  yearLabels(NAME_DATA.years);
  columndivCreator(NAME_DATA.years);
  let graphButton = document.querySelector("#graphButton");
  graphButton.addEventListener("click", nameGraphOnGraph);
};
main();
