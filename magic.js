var checks = document.querySelectorAll("input[type='checkbox']"),
    inputs = document.querySelector(".inputs"),
    selected = [];

/*
  Stampo tutte le possibili triplette
  Si tratta delle triplette senza ripetizioni in cui l'ordine non è importante,
  il numero è uguale a k! / ((n - k)!3!) [binomiale] in cui k è la dimensione della tripletta e n è il numero di elementi che considero, quindi 9! / ((9 - 3)!3!) = 84
 */

var totale_comb = [];

var n = 9, k = 3, c = 1;
var comb = [];

for (var i = 0; i < k; ++i)
    comb[i] = i;

totale_comb.push(comb.map(x => x + 1));

while(next_comb(comb, n, k) != 0) {
  totale_comb.push(comb.map(x => x + 1));
  c++;
}

function next_comb(comb, n, k) {
  var i = k - 1;
  ++comb[i];

  while((i >= 0) && comb[i] >= n - k + i + 1) {
    --i;
    ++comb[i];
  }

  if (comb[0] > n - k)
    return 0;

  for (i = i + 1; i < k; ++i)
    comb[i] = comb[i - 1] + 1;

  return comb;
}

console.log(totale_comb);

for (var i = 0; i < totale_comb.length; i++) {
  try {
    var t = totale_comb[i].sort().join("");
    inputs.innerHTML += `
      <div>
        <span>${totale_comb[i]}</span>
        <input type="text" class="i${totale_comb[i].sort().join("")}" value="${data[t]}">
      </div>`
  } catch(e) {
    inputs.innerHTML += `
      <div>
        <span>${totale_comb[i]}</span>
        <input type="text" class="i${totale_comb[i].sort().join("")}" value="${totale_comb[i].sort().join("-")}">
      </div>`
  }
}

/*
  Ordino i valori prima di creare la classe per fissare uno standard e ignorare i doppioni, indipendentemente dalla scelta dell'utente
*/


/*
  Applico un evento su tutti i checkbox, quando uno viene premuto controllo se sto "acceddendo" un checkbox o lo sto "spegnendo".

  Nel primo caso aggiungo l'id alla lista dei selezionati e controllo se sono arrivato a tre, in quel caso attivo la funzione "trio" che distingue i casi.

  Nel secondo caso elimino l'id dalla lista dei selezionati
*/

checks.forEach(c => {
  c.addEventListener('change', e => {
    if(c.checked) {
      if(selected.length < 3) {
        selected.push(c.id)
        if(selected.length == 3) {
          var s = ".i" + selected.sort().join('');
          s = document.querySelector(s).value;

          document.getElementById("selection").innerHTML = "Url: " + s;
        }
      } else {
        c.checked = false;
      }
    } else {
      selected.splice(selected.indexOf(c.id), 1)
      document.getElementById("selection").innerHTML = "";
    }
  })
})

exportToJSON()

function exportToJSON() {
  var res = new Object();
  totale_comb.forEach(t => {
    var inp = inputs.querySelector(".i" + t.sort().join(""));
    res[t.sort().join("")] = inp.value;
  })
  document.querySelector("pre").innerHTML = syntaxHighlight(JSON.stringify(res, undefined, 2));
}

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
