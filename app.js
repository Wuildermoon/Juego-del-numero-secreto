let secretNumber = 0;
let attempts = 0;
let raffledNumberList = [];
let maxAttempts = 10;

document.getElementById("user__value").onkeyup = function (event) {
  if (event.key === "Enter") {
    checkAttempts();
  }
};

function assignTextElement(element, text) {
  let elementHTML = document.querySelector(element);
  elementHTML.innerHTML = text;
  return;
}

function checkAttempts() {
  let userNumber = parseInt(document.getElementById("user__value").value);

  if (userNumber === secretNumber) {
    assignTextElement(
      "p",
      `¡Genial, acertaste en ${attempts} ${
        attempts === 1 ? "intento" : "intentos"
      }. El numéro secreto era ${secretNumber}!`
    );
    assignTextElement(".text__attempts", `Intentos: ${attempts}`);
    document.getElementById("reset__button").removeAttribute("disabled");
    document.querySelector("#try__button").setAttribute("disabled", true);
  } else {
    if (userNumber > secretNumber) {
      assignTextElement("p", "El número secreto es menor");
    } else {
      assignTextElement("p", "El número secreto es mayor");
    }
    assignTextElement(".text__attempts", `Intentos: ${attempts}`);
    attempts++;
    clearValue();
  }
  return;
}

function clearValue() {
  document.querySelector("#user__value").value = "";
}

function generateSecretNumber() {
  let randomNumber = Math.floor(Math.random() * maxAttempts) + 1;

  if (raffledNumberList.length == maxAttempts) {
    assignTextElement("p", "Ya se sortearon todos los números posibles");
  } else {
    if (raffledNumberList.includes(randomNumber)) {
      return generateSecretNumber();
    } else {
      raffledNumberList.push(randomNumber);
      return randomNumber;
    }
  }
}

function initialState() {
  assignTextElement("h1", "Juego del número secreto");
  assignTextElement("p", `Indica un número del 1 al ${maxAttempts}`);
  assignTextElement(".text__attempts", "Intentos: 0");
  secretNumber = generateSecretNumber();
  attempts = 1;
}

function resetGame() {
  clearValue();
  initialState();
  document.querySelector("#reset__button").setAttribute("disabled", true);
  document.getElementById("try__button").removeAttribute("disabled");
}

initialState();
