let calcTotal = 0;
let buffer= "0";
let previousOperator ;
const screen = document.querySelector(".display");


function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    itsSymbol(value);
  } else {
    itsNumber(value);
  }
  rerender();
}

function itsNumber(value) {
  if (buffer=== "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}
function handleMath(value) {
  if (buffer === "0") {
    // do nothing
    return;
  }
  const intBuffer = parseInt(buffer);
  if (calcTotal === 0) {
    calcTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = value;
  
  buffer = "0";
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    calcTotal += intBuffer;
  } else if (previousOperator === "-") {
    calcTotal -= intBuffer;
  } else if (previousOperator === "×") {
    calcTotal *= intBuffer;
  } else {
    calcTotal /= intBuffer;
  }
}

function itsSymbol(value) {
  switch (value) {
    case 'C':
      buffer='0';
      calcTotal = 0;
      previousOperator = null;
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer= "" +calcTotal;
      calcTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
        } else {
          buffer= buffer.substring(0, buffer.length - 1);
        }
        break;
      case "+":
      case "-":
      case "×":
      case "÷":
          handleMath(value);
          break;
  }
}

function rerender() {
  screen.innerText = buffer;
}

function init() {
  document.querySelector(".calcbody").addEventListener("click", function(event) {
    buttonClick(event.target.innerText);
  });
}

init();

