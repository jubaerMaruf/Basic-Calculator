class Calculator {
  constructor(previousOperantText, currentOperantText) {
    this.previousOperantText = previousOperantText;
    this.currentOperantText = currentOperantText;
    this.clear();
  }

  clear() {
    this.currentOperant = "";
    this.previousOperant = "";
    this.opretion = undefined;
  }

  delet() {
    this.currentOperant = this.currentOperant.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperant.includes(".")) return;
    this.currentOperant = this.currentOperant.toString() + number.toString();
  }

  choosOperation(operation) {
    if (this.currentOperant === "") return;
    if (this.previousOperant !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperant = this.currentOperant;
    this.currentOperant = "";
  }

  compute() {
    let computetion;
    const prev = parseFloat(this.previousOperant);
    const current = parseFloat(this.currentOperant);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computetion = prev + current;
        break;

      case "-":
        computetion = prev - current;
        break;

      case "*":
        computetion = prev * current;
        break;

      case "÷":
        computetion = prev / current;
        break;

      default:
        return;
    }

    this.currentOperant = computetion;
    this.operation = undefined;
    this.previousOperant = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDesit = parseFloat(stringNumber.split(".")[0]);
    const desimalDesit = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(integerDesit)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDesit.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (desimalDesit != null) {
      return `${integerDisplay}.${desimalDesit}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperantText.innerText = this.getDisplayNumber(
      this.currentOperant
    );
    if (this.operation != null) {
      this.previousOperantText.innerText = `${this.getDisplayNumber(
        this.previousOperant
      )} ${this.operation}`;
    } else {
      this.previousOperantText.innerText = "";
    }
  }
}

const numberButton = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operant]");
const previousOperantText = document.querySelector("[data-p-operant]");
const currentOperantText = document.querySelector("[data-c-operant]");
const equalsButton = document.querySelector("[data-equals]");
const deletButton = document.querySelector("[data-delet]");
const allClearButton = document.querySelector("[data-all-clear]");

const calculator = new Calculator(previousOperantText, currentOperantText);

numberButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.choosOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deletButton.addEventListener("click", (button) => {
  calculator.delet();
  calculator.updateDisplay();
});
