const desiredRepo = "seachel.github.io";
const dateTagClass = ".date";

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function()
{
if (this.readyState == 4 && this.status == 200)
{
    let repos = JSON.parse(this.responseText);

    repos.forEach((repo)=>{
    if (repo.name == desiredRepo)
    {
        var lastUpdated = new Date(repo.updated_at);
        var day = lastUpdated.getUTCDate();
        var month = lastUpdated.getUTCMonth();
        var year = lastUpdated.getUTCFullYear();
        $(dateTagClass).text(`Last updated: ${year}-${month}-${day}`);
    }
    });
}
};
xhttp.open("GET", "https://api.github.com/users/seachel/repos", true);
xhttp.send();