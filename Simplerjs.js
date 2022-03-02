// Sample class is required
import Sample from "Sample.js";

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
    function optionClicked(
      
      element,formatCaller) {
      selectedtext = data;
      selectedtextvalue = id;
      document.getElementById("mselect_simplejs").value = data;
      //  update the main select elemeent
      let option = document.createElement("option");
      option.value = id;
      option.selected = true;
      option.innerHTML = data;
      document.getElementById("mselect").appendChild(option);
    }

  
// from here a thousand step begin
//  obj == an obj from  Sample class
    function simplerjs(obj) {
      // using ids

      if (obj.id != "") {
        let elm = document.getElementById(obj.id);
        // hide the elem no space taken by it
        elm.style.visibility = "hidden";
        elm.style.width = "0px";
        elm.style.height = "0px";
        let container = document.createElement("div");
        let simplejs_maincontainer_id =
          simplejs_maincontainer + simplejs_counter;
        let current_simplejs_id = simplejs_name + simplejs_counter;
        let current_simplejs_list = simplejs_mlist + simplejs_counter;
        let input_simplejscontainer = simplejs_input + simplejs_counter;
        let datalist_simplejscontainer = simplejs_datalist + simplejs_counter;
        let input = `<input type="search" onfocus="activateSearchplugin(${current_simplejs_list})"  
id="${current_simplejs_id}" placeholder="${obj.placeholder} "
onkeyup="searchforkeywords({
              'selectid':${obj.id},
              'datalistid':${current_simplejs_list},
              'formatCaller':${obj.formatCaller},
              'async':${obj.async}
              });"
/>`;
        let datalist = `<div id="${current_simplejs_list}" style="display:none;color:white; ;background-color:black;width:200px;height:200px;"></div>`;
        // to init the simplejs
        let markup = `
<label>
<div id='${input_simplejscontainer}'>
${input}
</div>
<br>
<div id='${datalist_simplejscontainer}'>
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
          inputOnkeyup: obj.inputOnkeyup(current_simplejs_list), // available in the Sample Class
          inputOnfocus: `activateSearchplugin(${current_simplejs_id})`, // on focusing on the input show the datalist
          counter: simplejs_counter,
        });
      } else {
        // using class
        // we need to loop through all lements with same class name

        // apply for each a new design and then push that detail to our array data within for loop please
        // store this element for later use
      //   for each element we will have new ids
      //  we must bring the id for each select elment
      // and put it in obj below
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
          inputOnkeyup: obj.inputOnkeyup(current_simplejs_list), // available in the Sample Class
          inputOnfocus: `activateSearchplugin(${current_simplejs_id})`,
          counter: simplejs_counter,
        });
      }

      //  for options we need to update datalist while user typing it .
      // so we have puted in another event
      simplejs_counter++;
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
    function searchforkeywords(obj = {selectid:"", datalistid:"",method:"" , formatCaller:(res)=>{return res;} ,async:false }  ) {
      let datalist = document.getElementById("keywords");
      // on response happen
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let responsedata = JSON.parse(this.responseText);
          let fmarkup = "";
          responsedata.forEach((element) => {
            fmarkup += ` <span onclick="optionClicked(${element});" >${obj.formatCaller(element)}  </span>`;
          });
          datalist.innerHTML = fmarkup;
        }
      };
      xhttp.open(obj.method, obj.url, obj.async);
      xhttp.send();
    }

   // show dropdown list on focusing on input search 
   function activateSearchplugin(id) {
    document.getElementById(id).style.display = "block";
  }
   