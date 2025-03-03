import { useState } from "react";
import "../styles/Calculator.css";

const Calculator = () => {
  const [currentInput, setCurrentInput] = useState("0");
  const [operation, setOperation] = useState("");
  const [previousInput, setPreviousInput] = useState("");
  const [shouldResetInput, setShouldResetInput] = useState(false);
  const [expression, setExpression] = useState("");

  const handleNumber = (num: string) => {
    if (shouldResetInput) {
      setCurrentInput(num);
      setShouldResetInput(false);
      setExpression(expression + " " + num);
    } else {
      const newInput = currentInput === "0" ? num : currentInput + num;
      setCurrentInput(newInput);
      if (expression === "") {
        setExpression(newInput);
      } else if (shouldResetInput) {
        setExpression(expression + " " + newInput);
      } else {
        // If we're in the middle of entering a number, just append to the expression
        setExpression(expression.slice(0, -currentInput.length) + newInput);
      }
    }
  };

  const handleOperator = (op: string) => {
    if (expression === "") {
      setExpression(currentInput + " " + op);
    } else if (!shouldResetInput) {
      setExpression(expression + " " + op);
    }
    
    if (previousInput === "") {
      setPreviousInput(currentInput);
    } else if (!shouldResetInput) {
      calculate();
    }
    setOperation(op);
    setShouldResetInput(true);
  };

  const calculate = () => {
    if (previousInput && operation && currentInput) {
      const prev = parseFloat(previousInput);
      const curr = parseFloat(currentInput);
      let result;

      switch (operation) {
        case "+":
          result = prev + curr;
          break;
        case "-":
          result = prev - curr;
          break;
        case "*":
          result = prev * curr;
          break;
        case "/":
          result = prev / curr;
          break;
        default:
          return;
      }

      setCurrentInput(result.toString());
      setPreviousInput(result.toString());
    }
  };

  const handleEqual = () => {
    if (previousInput && operation && currentInput) {
      const fullExpression = expression + " =";
      calculate();
      setExpression(fullExpression);
      setOperation("");
      setPreviousInput("");
      setShouldResetInput(true);
    }
  };

  const handleClear = () => {
    setCurrentInput("0");
    setOperation("");
    setPreviousInput("");
    setShouldResetInput(false);
    setExpression("");
  };

  const handleDecimal = () => {
    if (!currentInput.includes(".")) {
      const newInput = currentInput + ".";
      setCurrentInput(newInput);
      if (expression === "") {
        setExpression(newInput);
      } else if (shouldResetInput) {
        setExpression(expression + " " + newInput);
      } else {
        // If we're in the middle of entering a number, just append to the expression
        setExpression(expression.slice(0, -currentInput.length) + newInput);
      }
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="screen">
          <div className="equation">{expression}</div>
          <div className="display">{currentInput}</div>
        </div>
        <div className="buttons-grid">
          <button className="clear function" onClick={handleClear}>AC</button>
          <button className="operator" onClick={() => handleOperator("/")}>÷</button>
          <button className="operator" onClick={() => handleOperator("*")}>×</button>
          <button className="number" onClick={() => handleNumber("7")}>7</button>
          <button className="number" onClick={() => handleNumber("8")}>8</button>
          <button className="number" onClick={() => handleNumber("9")}>9</button>
          <button className="operator" onClick={() => handleOperator("-")}>−</button>
          <button className="number" onClick={() => handleNumber("4")}>4</button>
          <button className="number" onClick={() => handleNumber("5")}>5</button>
          <button className="number" onClick={() => handleNumber("6")}>6</button>
          <button className="operator" onClick={() => handleOperator("+")}>+</button>
          <button className="number" onClick={() => handleNumber("1")}>1</button>
          <button className="number" onClick={() => handleNumber("2")}>2</button>
          <button className="number" onClick={() => handleNumber("3")}>3</button>
          <button className="equals operator" onClick={handleEqual}>=</button>
          <button className="zero number" onClick={() => handleNumber("0")}>0</button>
          <button className="number" onClick={handleDecimal}>.</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
