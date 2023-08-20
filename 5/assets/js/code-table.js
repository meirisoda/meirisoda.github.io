var SPREADSHEET_ID_AND_TAB = "1t7dzSOBkw4zTQwjlRzH5mOggLJSz8McP7e4a7e2UsGE/sharing";


let song_ratings = 0;


$(document).ready(function () {
  
  // this is a jquery function that parses JSON
  
  $.getJSON("https://opensheet.elk.sh/" + SPREADSHEET_ID_AND_TAB, function (data) {
    
    // This shows me everything
    console.log(data);
    

    // This function goes through the array of data, accessing each row/item in the array one by one and applying the code within for each. We also can use the index, if desired.
    data.forEach(function (row, index) {
      
    
      console.log(row);
      
    /* Your first row's headers designate the KEYs for your data.
    */  
      
      $(`<tr type="` + row.Type +`">
          <td info="Name">` + row.Artist + row.Name +`</td>
          <td info="Type">` + row.Type + `</td>
          <td><a href="` + row.Link +`" target="_blank">-></a></td>
        </tr>`)
        .appendTo("#music");
      
      song_ratings = song_ratings + parseInt(row.Rating);
      
    })
    
    
  // once we're done iterating, average it out
  $("span[average]").text( (song_ratings / data.length) );
    
  });
  
});  


  new Tablesort(document.getElementById('music'));