function getrepo(name) {
  axios.get(`https://api.github.com/users/${name}/repos`).then((res) => {
    getInfo(res.data);
  });
}

function getInfo(data) {
  const len = data.length;
  console.log("len:", len);

  $(".info").append(
    `<h3> Repositories <span class="badge bg-secondary">${len}</span></h3>`
  );
  let str = "";
  data.forEach((Element) => {
    str = `
    <div class="col-sm-6 col-sx-6 col-md-3 col-lg-4 col-xl-3 mt-2 mr-2 mb-4">
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${Element.name}</h5>
            <a href="#" class="btn btn-dark getMoreInfo" id="${Element.full_name}&&${Element.default_branch}">Get More</a>
          </div>
        </div>
      </div>
    `;
    $(".info").append(str);
  });
}

getrepo("avinashboy");

document.getElementById("subName").addEventListener("click", function (event) {
  event.preventDefault();
  $(".info").empty();
  const name = document.getElementById("nameSearch").value;
  console.log("name:", name);
  getrepo(name);
  document.getElementById("nameSearch").value = "";
});

$(document).on("click", ".getMoreInfo", function () {
  console.log(this.id);
  let [id, branch] = this.id.split("&&");
  let uppend = $(".infoNotes")[0];
  $(".RemoveMe").remove();
  $(uppend).append(
    `<li class="breadcrumb-item active RemoveMe" aria-current="page">${id}</li>`
  );
  let url = `https://api.github.com/repos/${id}/git/trees/${branch}?recursive=1`;
  console.log("url:", url);
  axios.get(url).then((res) => {
    getFileList(res.data.tree);
  });
});

function getFileList(data) {
  console.log("data:", data);
  $(".info").empty();
  $(".info").append(
    `<div class="listFile"><span role="button" class="btn btn-dark" onclick="homePage()">Back</span> <h3> List of the file <span class="badge bg-secondary">${data.length}</span></h3></div>`
  );
  const ul = document.createElement("ul");
  ul.setAttribute("class", "list-group");
  data.forEach((Element) => {
    const li = document.createElement("li");
    li.setAttribute("class", "list-group-item");
    li.innerText = Element.path;
    ul.append(li);
  });
  $(".info").append(ul);
}

function homePage() {
  $(".info").empty();
  $(".RemoveMe").remove();
  getrepo("avinashboy");
}
