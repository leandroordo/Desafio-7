//2. A través de un callback asociado al evento DOMContentLoaded de document,
//escribir en la consola el texto "Contenido del DOM cargado".
document.addEventListener("DOMContentLoaded", () => {
  console.log("Contenido del DOM cargado");

  const textArea = document.getElementById("origen");
  const divDestino = document.getElementById("destino");
  const lis = document.getElementsByTagName("li");

  //Setear valor al textarea
  setTextArea(textArea);

  //Setear evento input del textarea
  textArea.addEventListener("input", onTextAreaInput, true);

  //Funcionalidad de los 5 botones superiores
  setTopButtons(textArea, divDestino);

  //Funcionalidad de los 3 botones inferiores
  setBottomButtons(divDestino);

  //Confirmar
  setOkText(lis);
});

function setTextArea(textArea) {
  //3. Cargar desde JS el value del textarea
  textArea.value =
    "<p>Este contenido <strong>está listo</strong><br>para ser editado y pasarlo abajo.</p>";
}

function onTextAreaInput() {
  //4. Cuando se dispare el evento input del textarea, obtener un HTMLCollection
  //con todos los <input> de la página y cambiar a false su propiedad disabled
  //para que los mismos dejen de estar deshabilitados.
  enabled = this.value.length > 0;

  inputs = document.getElementsByTagName("input");
  for (const input of inputs) {
    input.disabled = !enabled;
  }

  //Hacer lo mismo con el botón que falta.
  document.getElementsByTagName("button")[0].disabled = !enabled;
}

function setTopButtons(origen, destino) {
  //5. Programar los 5 botones superiores para que cumplan estas funciones
  const buttons = document.getElementsByTagName("input");

  for (const button of buttons) {
    switch (button.value.toLocaleLowerCase()) {
      case "reemplazar":
        button.addEventListener(
          "click",
          () => onReemplazarClick(origen, destino),
          true
        );
        break;
      case "agregar":
        button.addEventListener(
          "click",
          () => onAgregarClick(origen, destino, 1),
          true
        );
        break;
      case "agregar 5 veces":
        button.addEventListener(
          "click",
          () => onAgregarClick(origen, destino, 5),
          true
        );
        break;
      case "agregar 10 veces":
        button.addEventListener(
          "click",
          () => onAgregarClick(origen, destino, 10),
          true
        );
        break;
      case "agregar n veces":
        button.addEventListener(
          "click",
          () => onAgregarClick(origen, destino, 0),
          true
        );
        break;
      default:
        break;
    }
  }
}

function setBottomButtons(destino) {
  //3. Programar los 3 botones inferiores para que cumplan estas funciones:
  const buttons = document.getElementsByTagName("input");

  for (const button of buttons) {
    switch (button.value.toLocaleLowerCase()) {
      case "vaciar":
        button.addEventListener("click", () => onVaciarClick(destino), true);
        break;
      case "convertir a mayúsculas":
        button.addEventListener(
          "click",
          () => onConvertirTextoClick(destino, true),
          true
        );
        break;
      default:
        break;
    }
  }

  document
    .getElementsByTagName("button")[0]
    .addEventListener(
      "click",
      () => onConvertirTextoClick(destino, false),
      true
    );
}

function onReemplazarClick(origen, destino) {
  //5.a. Botón "Reemplazar": reemplaza el contenido del div destino por el contenido del textarea origen.
  destino.innerHTML = origen.value + "<br>";
}

function onAgregarClick(origen, destino, cantidad) {
  //5.b. Botón "Agregar": agrega el contenido del textarea origen al contenido del div destino.

  if (cantidad === 0) {
    //5.e. Agrega la cantidad de veces que indique el usuario (a partir de un prompt)
    //el contenido del textarea origen al contenido del div destino.
    cantidad = promptNumber(1, 10);
  }
  for (let index = 0; index < cantidad; index++) {
    destino.innerHTML += origen.value + "<br>";
  }
}

function promptNumber(min, max) {
  let num;

  do {
    num = window.prompt(
      "¿Cuántas veces deseas agregar el texto? Escribe un número entre 1 y 10. (Si escribes 0 no haré nada)"
    );
  } while (num && (isNaN(num) || num < 0 || num > 10));

  return parseInt(num ?? 0);
}

function onVaciarClick(destino) {
  destino.innerHTML = "";
}

function onConvertirTextoClick(destino, mayusculas) {
  if (mayusculas) {
    destino.innerText = destino.innerText.toUpperCase();
  } else {
    destino.innerText = destino.innerText.toLowerCase();
  }
}

function setOkText(lis) {
  debugger;
  for (const item of lis) {
    item.innerHTML = "[Ok] " + item.innerHTML;
  }
}
