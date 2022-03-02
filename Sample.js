//  here we define main obj for our simplerjs  function

class Sample {
  id = "";
  class = "";
  url = "";
  method = "GET";
  async = false;
  placeholder = () => {
    return "Search For...";
  };
  formatCaller = (res) => {
    return res;
  };

  inputOnkeyup=(current_simplejs_list)=>{return  `searchforkeywords({
    'selectid':${this.id},
    'datalistid':${current_simplejs_list},
    'formatCaller':${this.formatCaller},
    'async':${this.async},
    'method':${this.method}

    })`;}

}
