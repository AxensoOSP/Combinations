/****************************************
*****************************************
*****************************************
********** INSERIRE QUI I DATI **********
*****************************************
*****************************************
*****************************************/

var data = {
  "123": "casa mamma",
  "124": "1-2-4",
  "125": "1-2-5",
  "126": "1-2-6",
  "127": "1-2-7",
  "128": "1-2-8",
  "129": "1-2-9",
  "134": "1-3-4",
  "135": "1-3-5",
  "136": "1-3-6",
  "137": "1-3-7",
  "138": "1-3-8",
  "139": "1-3-9",
  "145": "1-4-5",
  "146": "1-4-6",
  "147": "1-4-7",
  "148": "1-4-8",
  "149": "1-4-9",
  "156": "1-5-6",
  "157": "1-5-7",
  "158": "1-5-8",
  "159": "1-5-9",
  "167": "1-6-7",
  "168": "1-6-8",
  "169": "1-6-9",
  "178": "1-7-8",
  "179": "1-7-9",
  "189": "1-8-9",
  "234": "2-3-4",
  "235": "2-3-5",
  "236": "2-3-6",
  "237": "2-3-7",
  "238": "2-3-8",
  "239": "2-3-9",
  "245": "2-4-5",
  "246": "2-4-6",
  "247": "2-4-7",
  "248": "2-4-8",
  "249": "2-4-9",
  "256": "2-5-6",
  "257": "2-5-7",
  "258": "2-5-8",
  "259": "2-5-9",
  "267": "2-6-7",
  "268": "2-6-8",
  "269": "2-6-9",
  "278": "2-7-8",
  "279": "2-7-9",
  "289": "2-8-9",
  "345": "3-4-5",
  "346": "3-4-6",
  "347": "3-4-7",
  "348": "3-4-8",
  "349": "3-4-9",
  "356": "3-5-6",
  "357": "3-5-7",
  "358": "3-5-8",
  "359": "3-5-9",
  "367": "3-6-7",
  "368": "3-6-8",
  "369": "3-6-9",
  "378": "3-7-8",
  "379": "3-7-9",
  "389": "3-8-9",
  "456": "4-5-6",
  "457": "4-5-7",
  "458": "4-5-8",
  "459": "4-5-9",
  "467": "4-6-7",
  "468": "4-6-8",
  "469": "4-6-9",
  "478": "4-7-8",
  "479": "4-7-9",
  "489": "4-8-9",
  "567": "5-6-7",
  "568": "5-6-8",
  "569": "5-6-9",
  "578": "5-7-8",
  "579": "5-7-9",
  "589": "5-8-9",
  "678": "6-7-8",
  "679": "6-7-9",
  "689": "6-8-9",
  "789": "7-8-9"
}

var checks = document.querySelectorAll("input[type='checkbox']"),
  inputs = document.querySelector(".inputs"),
  selected = [];
/*
  Stampo tutte le possibili triplette
  Si tratta delle triplette senza ripetizioni in cui l'ordine non è importante,
  il numero è uguale a k! / ((n - k)!3!) [binomiale] in cui k è la dimensione della tripletta e n è il numero di elementi che considero, quindi 9! / ((9 - 3)!3!) = 84
 */

var totale_comb = [];
var n = 9,
  k = 3,
  c = 1;
var comb = [];

for (var i = 0; i < k; ++i) {
  comb[i] = i;
}

totale_comb.push(
  comb.map(function(x) {
    return x + 1;
  })
);

while (next_comb(comb, n, k) != 0) {
  totale_comb.push(
    comb.map(function(x) {
      return x + 1;
    })
  );
  c++;
}

function next_comb(comb, n, k) {
  var i = k - 1;
  ++comb[i];

  while (i >= 0 && comb[i] >= n - k + i + 1) {
    --i;
    ++comb[i];
  }

  if (comb[0] > n - k) return 0;

  for (i = i + 1; i < k; ++i) {
    comb[i] = comb[i - 1] + 1;
  }

  return comb;
}

console.log(totale_comb);

for (var i = 0; i < totale_comb.length; i++) {
  try {
    var t = totale_comb[i].sort().join("")
    inputs.innerHTML += `
      <div class="i${totale_comb[i].sort().join("")}">
        <span>${totale_comb[i]}</span>
        <input type="text" value="${data[t]}">
      </div>`
  } catch(e) {
    inputs.innerHTML += `
      <div class="i${totale_comb[i].sort().join("")}">
        <span>${totale_comb[i]}</span>
        <input type="text" value="${totale_comb[i].sort().join("-")}">
      </div>`
  }
}

/*
  Ordino i valori prima di creare la classe per fissare uno standard e ignorare i doppioni, indipendentemente dalla scelta dell'utente

  Applico un evento su tutti i checkbox, quando uno viene premuto controllo se sto "acceddendo" un checkbox o lo sto "spegnendo".

  Nel primo caso aggiungo l'id alla lista dei selezionati e controllo se sono arrivato a tre, in quel caso attivo la funzione "trio" che distingue i casi.

  Nel secondo caso elimino l'id dalla lista dei selezionati
*/

var s, dest,
    link = document.querySelector("#selection a");

checks.forEach(function(c) {
  c.addEventListener("change", function(e) {
    if (c.checked) {
      if (selected.length < 3) {
        selected.push(c.id);
      } else {
        c.checked = false;
      }
    } else {
      selected.splice(selected.indexOf(c.id), 1);
      link.href = link.innerHTML = "";
    }

    if (selected.length == 3) {
      s = ".i" + selected.sort().join("");
      if(c.checked) {
        dest = document.querySelector(s);
        link.href = link.innerHTML = dest.querySelector("input").value;
        dest.classList.add("primary");
      } else {
        document.querySelector(s).classList.remove("primary");
      }
    }
  });
});

function exportToJSON() {
  var res = new Object();
  totale_comb.forEach(function(t_c) {
    t_c = t_c.sort().join("");
    console.log(".i" + t_c + " input");
    res[t_c] = inputs.querySelector(".i" + t_c + " input").value;
  });
  document.querySelector("pre code").innerHTML = "var data = " + JSON.stringify(res, undefined, 2);
}

// function syntaxHighlight(json) {
//   json = json
//     .replace(/&/g, "&amp")
//     .replace(/</g, "&lt")
//     .replace(/>/g, "&gt");
//   return json.replace(
//     /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
//     function(match) {
//       var cls = "number";
//
//       if (/^"/.test(match)) {
//         if (/:$/.test(match)) {
//           cls = "key";
//         } else {
//           cls = "string";
//         }
//       } else if (/true|false/.test(match)) {
//         cls = "boolean";
//       } else if (/null/.test(match)) {
//         cls = "null";
//       }
//
//       return '<span class="' + cls + '">' + match + "</span>";
//     }
//   );
// }


// var checks = document.querySelectorAll("input[type='checkbox']"),
//     inputs = document.querySelector(".inputs"),
//     selected = []
//
// /*
//   Stampo tutte le possibili triplette
//   Si tratta delle triplette senza ripetizioni in cui l'ordine non è importante,
//   il numero è uguale a k! / ((n - k)!3!) [binomiale] in cui k è la dimensione della tripletta e n è il numero di elementi che considero, quindi 9! / ((9 - 3)!3!) = 84
//  */
//
// var totale_comb = []
//
// var n = 9, k = 3, c = 1
// var comb = []
//
// for (var i = 0; i < k; ++i)
//     comb[i] = i
//
// totale_comb.push(comb.map(x => x + 1))
//
// while(next_comb(comb, n, k) != 0) {
//   totale_comb.push(comb.map(x => x + 1))
//   c++
// }
//
// function next_comb(comb, n, k) {
//   var i = k - 1
//   ++comb[i]
//
//   while((i >= 0) && comb[i] >= n - k + i + 1) {
//     --i
//     ++comb[i]
//   }
//
//   if (comb[0] > n - k)
//     return 0
//
//   for (i = i + 1; i < k; ++i)
//     comb[i] = comb[i - 1] + 1
//
//   return comb
// }
//
// console.log(totale_comb)
//
// for (var i = 0; i < totale_comb.length; i++) {
//   try {
//     var t = totale_comb[i].sort().join("")
//     inputs.innerHTML += `
//       <div>
//         <span>${totale_comb[i]}</span>
//         <input type="text" class="i${totale_comb[i].sort().join("")}" value="${data[t]}">
//       </div>`
//   } catch(e) {
//     inputs.innerHTML += `
//       <div class="i${totale_comb[i].sort().join("")}">
//         <span>${totale_comb[i]}</span>
//         <input type="text" value="${totale_comb[i].sort().join("-")}">
//       </div>`
//   }
// }
//
// /*
//   Ordino i valori prima di creare la classe per fissare uno standard e ignorare i doppioni, indipendentemente dalla scelta dell'utente
// */
//
//
// /*
//   Applico un evento su tutti i checkbox, quando uno viene premuto controllo se sto "acceddendo" un checkbox o lo sto "spegnendo".
//
//   Nel primo caso aggiungo l'id alla lista dei selezionati e controllo se sono arrivato a tre, in quel caso attivo la funzione "trio" che distingue i casi.
//
//   Nel secondo caso elimino l'id dalla lista dei selezionati
// */
//
// var s
//
// checks.forEach(c => {
//   c.addEventListener('change', e => {
//     if(c.checked) {
//       if(selected.length < 3) {
//         selected.push(c.id)
//         if(selected.length == 3) {
//           s = ".i" + selected.sort().join('')
//           document.getElementById("selection").innerHTML = "Url: " + document.querySelector(s + " input").value
//           document.querySelector(s).classList.add("primary")
//         }
//       } else {
//         c.checked = false
//       }
//     } else {
//       s = ".i" + selected.sort().join('')
//       document.querySelector(s).classList.remove("primary")
//       selected.splice(selected.indexOf(c.id), 1)
//       document.getElementById("selection").innerHTML = ""
//     }
//   })
// })
//
// exportToJSON()
//
// function exportToJSON() {
//   var res = new Object()
//   totale_comb.forEach(t => {
//     var inp = inputs.querySelector(".i" + t.sort().join(""))
//     res[t.sort().join("")] = inp.querySelector("input").value
//   })
//   document.querySelector("code").innerHTML = syntaxHighlight(JSON.stringify(res, undefined, 2))
//   console.log(res)
// }
//
// function syntaxHighlight(json) {
//     json = json.replace(/&/g, '&amp').replace(/</g, '&lt').replace(/>/g, '&gt')
//     return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
//         var cls = 'number'
//         if (/^"/.test(match)) {
//             if (/:$/.test(match)) {
//                 cls = 'key'
//             } else {
//                 cls = 'string'
//             }
//         } else if (/true|false/.test(match)) {
//             cls = 'boolean'
//         } else if (/null/.test(match)) {
//             cls = 'null'
//         }
//         return '<span class="' + cls + '">' + match + '</span>'
//     })
// }
//
