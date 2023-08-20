var SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/1t7dzSOBkw4zTQwjlRzH5mOggLJSz8McP7e4a7e2UsGE/edit#gid=1945237652&single=true&output=csv";

$(document).ready(function () {

  Papa.parse(SPREADSHEET_URL, {
    download: true,
    header: true,
    complete: function (results) {

      console.log(results);
      
      // i'm going to make a copy of the data and shuffle it, so it's random each time
      
      (results.data).shift();
      var shuffledData = shuffle(results.data);

      (shuffledData).forEach(function (row, index) {

        console.log(row);
        

        let div = $(`<div class='p'>
              <h2 class="name">` + row.Name + ` <span class='animal'>` + row.Animal + ` </span></h2>
              <span class="loc">` + row.Location + `</p>
              </div>`).appendTo("#people");


        if (row.Image && row.Image.length > 3) {
          $(`<div class='img'><img src="` + row.Image + `"></div>`).appendTo(div);
        }


        if (row.Intro && row.Intro.length) {
          $(`<p class="intro">` + row.Intro + `</p>`).appendTo(div);
        }


        if (row.Color && row.Color.length > 3) {
          $(div).css("color", row.Color);
          if ($(div).find(".img").length) {
            $(div).find(".img").css("background-color", row.Color);

          }
        }

        if (row.Magic && row.Magic.length > 3) {
          $(div).addClass(row.Magic);
        }

        if (row.Recommendation && row.Recommendation.length > 3) {
          let rec = $(`
          <details>
            <summary>My recommendation</summary>
            <p class="recommendation">` + row.Recommendation + `</p></details>`).appendTo(div)

          // convert any text to links using this function I googled
          $(rec).html(linkify($(rec).html()));
        }

        if (row.Instagram && row.Instagram.length > 3) {
          $(`<a class="link"  href="https://instagram.com/` + row.Instagram + `">@` + row.Instagram + `</a>`).appendTo(div)
        }
        
        if (row["My Spreadsheet"] && row["My Spreadsheet"].length > 3) {
          $(`<a class="link" href="` + row["My Spreadsheet"] + `" target="_blank">My sheet</a>`).appendTo(div)
        }

        if (row["My Website"] && row["My Website"].length > 3) {
          $(`<a class="link" href="` + row["My Website"] + `" target="_blank">My website</a>`).appendTo(div)
        }


      });
    }
  });
});



// helpers
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function linkify(inputText) {
  var replacedText, replacePattern1, replacePattern2, replacePattern3;

  //URLs starting with http://, https://, or ftp://
  replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

  //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

  //Change email addresses to mailto:: links.
  replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
  replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

  return replacedText;
}


