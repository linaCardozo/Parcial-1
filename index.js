/*const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";*/

const url = "data.json";

fetch(url)
  .then((res) => res.json())
  .then((res) => {
    let main = document.getElementById("cards");

    let title = document.createElement("h2");
    //let cards = document.createElement("tbody");

    let l = res[0].products.length;

    for (let i = 0; i < l; i++) {
        
        // Creating div
      let div = document.createElement("div");
      let att1 = document.createAttribute("class");
      att1.value = "card";
      div.setAttributeNode(att1);
      
      // Image
      let img = document.createElement("img" src="" class="card-img-top" alt="Item" />)
      let att2 = document.createAttribute("src");
      att2.value = res[0].products[i].image;
      let att3 = document.createAttribute("class");
      att3.value = "card-img-top";
      let att4 = document.createAttribute("alt");
      att4.value = "Item", i;
      div.setAttributeNode(att2);
      div.setAttributeNode(att3);
      div.setAttributeNode(att4);
      console.log(img);

      let id = document.createElement("th");
      let event = document.createElement("td");
      let squirrel = document.createElement("td");

      id.textContent = i + 1;
      event.textContent = res[i].events;
      squirrel.textContent = res[i].squirrel;

      if (squirrel.textContent === "true") {
        row.style.backgroundColor = "rgb(244, 165, 165, 0.7)";
        //row.className = "bg-danger";
      }

      row.appendChild(id);
      row.appendChild(event);
      row.appendChild(squirrel);

      tblBody1.appendChild(row);
    }

    let dict = {};

    for (let i = 0; i < l; i++) {
      for (let j = 0; j < res[i].events.length; j++) {
        let item = res[i].events[j];

        if (dict[item] === undefined) {
          dict[item] = [0, 0, 0, 0, 0];
        }

        // False negatives
        if (!res[i].squirrel) {
          dict[item][1]++;
        }
        // True positives
        else {
          dict[item][3]++;
        }
      }
    }

    let keys = Object.keys(dict);

    for (let i = 0; i < l; i++) {
      for (let j = 0; j < keys.length; j++) {
        // False positives
        if (!res[i].events.includes(keys[j]) && res[i].squirrel) {
          dict[keys[j]][2]++;
        }
        // True negatives
        else if (!res[i].events.includes(keys[j]) && !res[i].squirrel) {
          dict[keys[j]][0]++;
        }
      }
    }

    let corr = [];

    // Calculating correlations

    for (let i = 0; i < keys.length; i++) {
      let TN = dict[keys[i]][0];
      let FN = dict[keys[i]][1];
      let FP = dict[keys[i]][2];
      let TP = dict[keys[i]][3];
      dict[keys[i]][4] =
        (TP * TN - FP * FN) /
        Math.sqrt((TP + FP) * (TP + FN) * (TN + FP) * (TN + FN));
      corr[i] = dict[keys[i]][4];
    }

    // Sorting the correlations in descending order
    corr.sort((a, b) => b - a);

    // Filling the second table with the events and its correlations

    for (let i = 0; i < keys.length; i++) {
      // Table rows
      let row = document.createElement("tr");

      let id = document.createElement("th");
      let event = document.createElement("td");
      let correlation = document.createElement("td");

      let new_keys = Object.keys(dict);

      id.textContent = i + 1;

      let k = new_keys.find((element) => dict[element][4] === corr[i]);
      event.textContent = k;
      delete dict[k];

      correlation.textContent = corr[i];

      row.appendChild(id);
      row.appendChild(event);
      row.appendChild(correlation);

      tblBody2.appendChild(row);
    }

    table1.appendChild(tblBody1);
    table2.appendChild(tblBody2);
  });
