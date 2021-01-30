(function() {
  "use strict";
    console.log("run go doc tooltip");

    //get location
    var isGoDoc = false;
    if (window.location.hostname === "godoc.org" || window.location.hostname === "pkg.go.dev") {
        isGoDoc = true;
    }
    console.log("isGoDoc: " + isGoDoc);

    //create a layer for tooltip
    var tooltip = document.createElement("div");
    tooltip.style.width = "50%";
    tooltip.style.position = "fixed";
    tooltip.style["z-index"] = 20;
    // tooltip.style.top = "100px";
    tooltip.style.background = "white";
    tooltip.style.border = "1px solid #9E9E9E";
    tooltip.style.padding = "6px";
    tooltip.style["text-align"] = "left";
    //hide
    tooltip.style.display = "none";


    //add tooltip to body
    document.body.appendChild(tooltip);
    


    /**
     * main
     */
    function main() {

      //find all urls with hash (#)
      var urls = document.getElementsByTagName("a");
      if (!urls) return;


      // current anchor tag
      for (var i = 0; i < urls.length; i++) { 
        //get hash
        if (!urls[i].hash) {continue;}

        //bind event
        urls[i].addEventListener("mousemove", showTooltip, false);
        urls[i].addEventListener("mouseout", hideTooltip, false);

      }


    }


    //show tooltip
    var showTooltip = function(e){
        // console.log("showTooltip");
        // e.target is the element mouse move on
        //the element id we need: id = e.target.hash.substr(1)
        //function description follows as a pre and a p tag
        //to get these pre and p tags, we need do a query selector
        //refer: http://www.w3schools.com/cssref/css_selectors.asp
        //for ids with dot in it, we need a complex way to get it
        //refer: http://stackoverflow.com/questions/605630/how-to-select-html-nodes-by-id-with-jquery-when-the-id-contains-a-dot
        
        var id =e.target.hash.substr(1);
        if (id.indexOf(".")>=0) {
          id = id.replace(/\./g, "\\.");
        }
        // console.log("id is: " + id);

        var pre = null;
        if (isGoDoc) {
            pre = document.querySelector("#"+id+" ~ div");
        }
        else {
            pre = document.querySelector("#"+id+" ~ pre");
        }
        
        var doc = document.querySelector("#"+id+" ~ p");

        if (!doc || !pre) {return;}
        // console.log("find doc");

        if (isGoDoc) {
            tooltip.innerHTML = "<div>"+pre.innerHTML +"</div><p>"+ doc.innerHTML +"</p>";
        }
        else {
            tooltip.innerHTML = "<pre>"+pre.innerHTML +"</pre><p>"+ doc.innerHTML +"</p>";
        }

        //get mouse position
        tooltip.style.left = (e.clientX+50)+"px";
        tooltip.style.top = (e.clientY-50)+"px";

        //show
        tooltip.style.display = "block";

    };


    // hide  tool tip
    var hideTooltip = function(e){
        tooltip.style.display = "none";
    };


    main();

})();