var usdata = [];
var tbhtml = "";
var a = [];
var j;
$.get( "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D"
  ,
      function (res) {
  usdata = res;

  res.map((res, i) => {
    tbhtml += `
    
    <tr id="${res.id}" class="data-row ${i == 2 ? `active` : ""}"
    onclick="clicked(${res.id})">
        <td class="column1">${res.id}</td>
        <td class="column2">${res.firstName}</td>
        <td class="column3">${res.lastName}</td>
        <td class="column4">${res.email}</td>
        <td class="column5">${res.phone}</td>
    </tr>
 `;
    if (i == 2) {
      document.getElementById(
        "info-content"
      ).innerHTML = ` <div><b>User selected:</b>${res.firstName}  ${res.lastName}</div>
                <div>
                    <b>Description: </b>
                    <textarea cols="50" rows="5" readonly>
                        ${res.description}
                    </textarea>
                </div>
                <div><b>Address:</b> ${res.address.streetAddress}</div>
                <div><b>City:</b> ${res.address.city}</div>
                <div><b>State:</b>${res.address.state}</div>
                <div><b>Zip:</b> ${res.address.zip}</div>`;
    }
  });
  document.getElementById("tblbdy").innerHTML = tbhtml;
});

const clicked = (userid) => {
  var oldactiverw = document.getElementsByClassName("active")[0];
  oldactiverw.classList.remove("active");
  var activerw = document.getElementById(userid);
  activerw.classList.add("active");
  a = usdata.find((user, i) => {
    if (user.id == userid) {
      return true;
    }
  });
  j = a.id;
  var content = document.getElementsByClassName("info-content")[0];
  content.innerHTML = ` <div class="thisone" id="${a.id}"><b>User selected:</b>${a.firstName}  ${a.lastName}</div>
                <div>
                    <b>Description: </b>
                    <textarea cols="50" rows="5" readonly>
                        ${a.description}
                    </textarea>
                </div>
                <div><b>Address:</b> ${a.address.streetAddress}</div>
                <div><b>City:</b> ${a.address.city}</div>
                <div><b>State:</b>${a.address.state}</div>
                <div><b>Zip:</b> ${a.address.zip}</div>`;
};

var change = () => {
  var p = document.getElementById("search-box").value;
  var t = usdata.filter((user, i) => {
    if (
      user.firstName.toLowerCase().includes(p.toLowerCase()) ||
      user.email.toLowerCase().includes(p.toLowerCase())
    ) {
      return true;
    }
  });

  document.getElementById("tblbdy").innerHTML = "";

  t.map((res, i) => {
    document.getElementById("tblbdy").innerHTML += `
    
    <tr id="${res.id}" class="data-row" onclick="clicked(${res.id})">
        <td class="column1">${res.id}</td>
        <td class="column2">${res.firstName}</td>
        <td class="column3">${res.lastName}</td>
        <td class="column4">${res.email}</td>
        <td class="column5">${res.phone}</td>
    </tr>
 `;
  });
  var changeactive = document.getElementById(j);
  changeactive.classList.add("active");
};
