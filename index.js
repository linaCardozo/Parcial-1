const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

const data = "data.json";

// Open initially the Burguers page

// tabcontent = document.getElementsByClassName("tab-content");
// for (i = 0; i < tabcontent.length; i++) {
//   tabcontent[i].style.display = "none";
// }

//let cont = parseInt(document.getElementById("items").textContent[0]);
let it = document.getElementById("items");

document.body.onload = openPage("Burguers", this);
document.body.onload = it.textContent = cont.textContent + " items";

//document.getElementById("Burguers").style.display = "block";

function openPage(pageName, elmnt) {
  let i, tabcontent;
  tabcontent = document.getElementsByClassName("tab-content");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  document.getElementById(pageName).style.display = "block";

  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      let item = res.find((item) => item.name === pageName);
      let idItem = document.getElementById(pageName);

      // Card group
      let group = document.createElement("div");
      let g1 = document.createAttribute("class");
      g1.value = "card-group";
      group.setAttributeNode(g1);

      for (let i = 0; i < item.products.length; i++) {
        if (i % 4 == 0 && i > 0) {
          let cnt = document.createElement("div");
          let g2 = document.createAttribute("class");
          g2.value = "w-100 d-block";
          cnt.setAttributeNode(g2);

          group.appendChild(cnt);
        }

        // Creating div
        let div = document.createElement("div");
        let att1 = document.createAttribute("class");
        att1.value = "card m-2";
        div.setAttributeNode(att1);

        // Image
        let img = document.createElement("img");
        let att2 = document.createAttribute("src");
        att2.value = item.products[i].image;
        let att3 = document.createAttribute("class");
        att3.value = "card-img-top";
        let att4 = document.createAttribute("alt");
        att4.value = "Item " + i;
        img.setAttributeNode(att2);
        img.setAttributeNode(att3);
        img.setAttributeNode(att4);

        // Body of the card
        let div2 = document.createElement("div");
        let bd1 = document.createAttribute("class");
        bd1.value = "card-body";
        div2.setAttributeNode(bd1);

        // Title
        let h5 = document.createElement("h5");
        let bd2 = document.createAttribute("class");
        bd2.value = "card-title";
        h5.textContent = item.products[i].name;
        h5.setAttributeNode(bd2);

        // Description
        let p = document.createElement("p");
        let bd3 = document.createAttribute("class");
        bd3.value = "card-text";
        p.textContent = item.products[i].description;
        p.setAttributeNode(bd3);

        // Price
        let p2 = document.createElement("p");
        let bd4 = document.createAttribute("class");
        bd4.value = "card-text price";
        p2.textContent = "$" + item.products[i].price;
        p2.setAttributeNode(bd4);

        // Add to car
        let a = document.createElement("button");
        let bd5 = document.createAttribute("class");
        bd5.value = "btn btn-car bg-dark";
        let bd6 = document.createAttribute("onclick");
        bd6.value = "addItem('" + item.name + "', " + i + ")";
        a.textContent = "Add to car";
        a.setAttributeNode(bd5);
        a.setAttributeNode(bd6);

        div2.appendChild(h5);
        div2.appendChild(p);
        div2.appendChild(p2);
        div2.appendChild(a);

        div.appendChild(img);
        div.appendChild(div2);

        group.appendChild(div);
      }

      idItem.appendChild(group);
    });
}

let n = 0;

function addItem(item, i) {
  let tb = document.getElementById("tb");
  let cont = document.getElementById("cont");

  if (cont.textContent === "") {
    cont.textContent = 1;
  } else {
    cont.textContent = parseInt(cont.textContent) + 1;
  }

  let label = document.getElementById("items");
  label.textContent = cont.textContent + " items";

  //let orders = document.getElementById("Order");
  let tr = document.getElementById(item + i);
  let td = document.getElementsByClassName("tdBody");
  let tot = document.getElementById("total");

  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      let prod = res.find((some) => some.name === item);

      if (tr === null || td === null) {
        let tr = document.createElement("tr");
        let at = document.createAttribute("id");
        at.value = item + i;
        tr.setAttributeNode(at);

        let td1 = document.createElement("td");
        td1.textContent = cont.textContent;

        let td2 = document.createElement("td");
        let att = document.createAttribute("class");
        att.value = "tdBody";
        td2.setAttributeNode(att);
        td2.textContent = 1;

        let td3 = document.createElement("td");
        td3.textContent = prod.products[i].name;

        let td4 = document.createElement("td");
        td4.textContent = prod.products[i].price;

        let td5 = document.createElement("td");
        td5.textContent =
          parseFloat(td2.textContent) * parseFloat(td4.textContent);

        let td6 = document.createElement("td");

        let btnPlus = document.createElement("button");
        let attp1 = document.createAttribute("onclick");
        attp1.value = "modify(" + tr + ", 1)";
        let attp2 = document.createAttribute("class");
        attp2.value = "sign";
        btnPlus.setAttributeNode(attp1);
        btnPlus.setAttributeNode(attp2);
        btnPlus.textContent = "+";

        let btnMinus = document.createElement("button");
        let attm1 = document.createAttribute("onclick");
        attm1.value = "modify(" + tr + ", 2)";
        let attm2 = document.createAttribute("class");
        attm2.value = "sign";
        btnMinus.setAttributeNode(attm1);
        btnMinus.setAttributeNode(attm2);
        btnMinus.textContent = "-";

        td6.appendChild(btnPlus);
        td6.appendChild(btnMinus);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tb.appendChild(tr);

        n += parseFloat(td5.textContent);
      } else {
        //console.log(tr);
        let td1 = tr.getElementById("tdBody");
        td1.textContent = parseInt(td1.textContent) + 1;
      }
      tot.textContent = "Total: $" + n;
    });
}

function getOrder() {
  let h2 = document.createElement("h2");
  h2.textContent = "Order detail";

  let tabcontent;
  tabcontent = document.getElementsByClassName("tab-content");

  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  document.getElementById("Order").style.display = "block";
}
