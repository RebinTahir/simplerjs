//  here we define main obj for our simplerjs  function

class Sample {
  id = "";
  class = "";
  url = "";
  method = "GET";
  async = false;
  placeholder = () => {
    return 'search for ';
  };
  formatCaller = (res) => {
    return res.data;
  };

  inputOnkeyup=(current_simplejs_list)=>{return  `searchforkeywords({
    'selectid':${this.id},
    'datalistid':${current_simplejs_list},
    'formatCaller':${this.formatCaller},
    'async':${this.async},
    'method':${this.method}

    })`;}

}
