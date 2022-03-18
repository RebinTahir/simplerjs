//  here we define main obj for our simplerjs  function

class Sample {
  id = ""; // user element id 
  class = ""; // user element class featured
  url = ""; // user resource for online
  method = "GET"; // ajax method
  datalistid = ""; // datalist id  
  datalistContainer = ""; // datalist container element   
  simplerjs_id = ""; // id of current tracked element which is created by simplerjs  
  async = false;
  placeholder = ()=> {
    return 'search for ';
  };



}
