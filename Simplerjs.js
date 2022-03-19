// Sample class is required
// import Sample from "Sample.js"; but import  does not work in js files

// we need array to track the data
/*
it contains an array of objs that holds every data of that input (simplejs) with it 
ids class onchange events (copy of elements).
tracker contains an objarray which holds every single detail about that elements 
simplejsId(input) , class , input , datalist , url , inputcontainer_id , datalistcontainer_id , 
*/
var simplejs_tracker = [];

// used for ids purposes or class to track and create separate elements
var simplejs_counter = 0;
// used for naming purpsoes perhaps class or even ids combined with above var to create unique
var simplejs_name = "simplejs_";
// container for input element for updating purposes combined with counter
var simplejs_input = "simplejs_input_";
// container for datalist element for updating purposes combined with counter
var simplejs_datalist = "simplejs_datalist_";
// to fetch the data
var simplejs_xhttp = new XMLHttpRequest();
// to trak list data  name for each input combined with above counter to make it unique
var simplejs_mlist = "simplejs_keywords_";
var simplejs_maincontainer = "simplejs_main_";

//  on clicking on shown option ater searching for specific keywords
function optionClicked(element, obj, formatCaller) {
  selectedtext = element.data;
  selectedtextvalue = element.id;
  document.getElementById(obj.simplerjs_id).value = element.data; //
  //  update the main select elemeent
  let option = document.createElement("option");
  option.value = element.id;
  option.selected = true;
  option.innerHTML = formatCaller(element);
  document.getElementById(obj.id).appendChild(option);
}

function defaultOptionClicked(option, obj) {
  console.log(option);
  console.log(obj);
}
// from here a thousand step begin
//  obj == an obj from  Sample class
function simplerjs(
  obj,
  formatCaller = (res) => {
    return res;
  }
) {
  // using ids

  if (obj.id != "") {
    let elm = document.getElementById(obj.id);
    let optarr = [];
    let html = "";
    for (opt of elm.options) {
      optarr.push(opt);
      // we need to pass an option to the html function so that we can copy it later to the main user element
      // html += `<span onClick="defaultOptionClicked('<option value='${opt.value}'>dsvjdhb</option> ' , ${JSON.stringify(obj)})' >${opt.innerHTML} </span>`;
    }
   
    // hide the elem no space taken by it
    elm.style.visibility = "hidden";
    elm.style.width = "0px";
    elm.style.height = "0px";
    let container = document.createElement("div");
    let simplejs_maincontainer_id = simplejs_maincontainer + simplejs_counter;
    let current_simplejs_id = simplejs_name + simplejs_counter;
    let current_simplejs_list = simplejs_mlist + simplejs_counter;
    let input_simplejscontainer = simplejs_input + simplejs_counter;
    let datalist_simplejscontainer = simplejs_datalist + simplejs_counter;

    obj.datalistid = current_simplejs_list;
    obj.datalistContainer = datalist_simplejscontainer;
    // assign id of current tracked element
    obj.simplerjs_id = current_simplejs_id;
    let searchevent =
      "searchforkeywords(" + JSON.stringify(obj) + "," + formatCaller + ")";
    let focusevent = "activateSearchplugin(" + JSON.stringify(obj) + ")";

    let input = `<input type='search' 
        onfocus='${focusevent}'  
        id='${current_simplejs_id}' 
        placeholder="${obj.placeholder()}" 
        onkeyup='${searchevent}' />`;

    let datalist = `<div id="${current_simplejs_list}" style="display:none;width:200px;height:200px;"></div>`;
    // to init the simplejs
    let markup = `
<label>
<div id='${input_simplejscontainer}'>
${input}
</div>
<br>
<div id='${datalist_simplejscontainer}' class='simplerjs_datalist'>
${html}
  ${datalist}
</div>
</label>`;

    // convert simple js to html
    container.innerHTML = markup;
    // apply new design to element before selected element
    elm.before(container);

    // apply for each a new design and then push that detail to our array data
    // store this element for later use
    simplejs_tracker.push({
      selectid: obj.id,
      simplejsid: current_simplejs_id,
      input: input,
      datalist: datalist,
      inputContainer: input_simplejscontainer,
      datalistContainer: datalist_simplejscontainer,
      mainContainer: simplejs_maincontainer_id,
      datalistid: current_simplejs_list,
      url: obj.url,
      method: obj.method,
      placeholder: obj.placeholder,
      markup: markup,
      inputOnkeyup: searchevent, // available in the Sample Class
      inputOnfocus: focusevent, // on focusing on the input show the datalist
      counter: simplejs_counter,
      options: optarr,
    });

    //  for options we need to update datalist while user typing it .
    // so we have puted in another event
    simplejs_counter++;
  } else {
    // using class
    // we need to loop through all lements with same class name

    // apply for each a new design and then push that detail to our array data within for loop please
    // store this element for later use
    //   for each element we will have new ids
    //  we must bring the id for each select elment
    // and put it in obj below

    let elements = document.getElementsByClassName(obj.class);
    // loop through each element

    for (elm of elements) {
      // hide the elem no space taken by it
      elm.style.visibility = "hidden";
      elm.style.width = "0px";
      elm.style.height = "0px";
      // create definers for our simplerjs element
      let container = document.createElement("div");
      let simplejs_maincontainer_id = simplejs_maincontainer + simplejs_counter;
      let current_simplejs_id = simplejs_name + simplejs_counter;
      let current_simplejs_list = simplejs_mlist + simplejs_counter;
      let input_simplejscontainer = simplejs_input + simplejs_counter;
      let datalist_simplejscontainer = simplejs_datalist + simplejs_counter;

      let optarr = [];

      for (opt of elm.options) {
        optarr.push(opt);
      }

      // record the data sets
      obj.datalistid = current_simplejs_list;
      obj.datalistContainer = datalist_simplejscontainer;
      // assign id of current tracked element
      obj.simplerjs_id = current_simplejs_id;
      // since we use class we neeed to define a new id for this obj at the same time set new id for user select element
      // combines from both the name of the container and the new id for the input that simplerjs will created
      obj.id = simplejs_maincontainer_id + "_" + current_simplejs_id;
      obj.simplerjs_id = current_simplejs_id;
      elm.id = obj.id;

      let searchevent =
        "searchforkeywords(" + JSON.stringify(obj) + "," + formatCaller + ")";
      let focusevent = "activateSearchplugin(" + JSON.stringify(obj) + ")";

      let input = `<input type='search' 
      onfocus='${focusevent}'  
      id='${current_simplejs_id}' 
      placeholder="${obj.placeholder()}" 
      onkeyup='${searchevent}' />`;

      let datalist = `<div id="${current_simplejs_list}" style="display:none;width:200px;height:200px;"></div>`;
      // to init the simplejs
      let markup = `
<label>
<div id='${input_simplejscontainer}'>
${input}
</div>
<br>
<div id='${datalist_simplejscontainer}' class='simplerjs_datalist'>

${datalist}


</div>
</label>`;

      // convert simple js to html
      container.innerHTML = markup;
      // apply new design to element before selected element
      elm.before(container);
      simplejs_tracker.push({
        selectid: obj.id, // need to bechanged to the id we get using dom parsing
        simplejsid: current_simplejs_id,
        input: input,
        datalist: datalist,
        inputContainer: input_simplejscontainer,
        datalistContainer: datalist_simplejscontainer,
        mainContainer: simplejs_maincontainer_id,
        datalistid: current_simplejs_list,
        url: obj.url,
        method: obj.method,
        placeholder: obj.placeholder,
        markup: markup,
        inputOnkeyup: searchevent, // available in the Sample Class
        inputOnfocus: focusevent,
        counter: simplejs_counter,
        options: optarr,
      });
      simplejs_counter++;
    }
  }
}

//  search for data while user types on keyboard
/*
require datalist id
formatCaller  for formatting data display 
select_id  for updating selected value in user select element
method   [GET,POST]
url   [link]
async   call the method aync or not 
*/
function searchforkeywords(obj, formatCaller) {
  let datalist = document.getElementById(obj.datalistid);

  // on response happen
  simplejs_xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let responsedata = JSON.parse(this.responseText);
      let fmarkup = "";
      responsedata.forEach((element) => {
        let optclick =
          "optionClicked(" +
          JSON.stringify(element) +
          "," +
          JSON.stringify(obj) +
          "," +
          formatCaller +
          ")";
        fmarkup += ` <span onclick='${optclick}' >${formatCaller(
          element
        )}</span>`;
      });
      datalist.innerHTML = fmarkup;
      datalist.style.display = "block";
    }
  };
  simplejs_xhttp.open(obj.method, obj.url, obj.async);
  simplejs_xhttp.send();
}

// show dropdown list on focusing on input search
function activateSearchplugin(obj) {
  document.getElementById(obj.id).style.display = "block";
}
