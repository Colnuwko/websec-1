const num1Input = document.getElementById("num1");
const num2Input = document.getElementById("num2");
const resultBox = document.getElementById("result");
const lastResultBox = document.getElementById("last-result");

let count = 0;
let lastResult = '';

function validateNumber(inputElement, errorElement) {
    const value = inputElement.value;
    if (value === "") {
        errorElement.textContent = "Пожалуйста, введите число.";
        inputElement.classList.add("invalid");
        return false;
    }

    if (isNaN(value)) {
        errorElement.textContent = "Введите корректное числовое значение.";
        inputElement.classList.add("invalid");
        return false;
    }

    inputElement.classList.remove("invalid");
    errorElement.textContent = "";
    return true;
}

function calculate() {
    console.log(123)
    const num1Valid = validateNumber(num1Input, resultBox);
    const num2Valid = validateNumber(num2Input, resultBox);

    if (!num1Valid || !num2Valid) {
        return;
    }

    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const operation = document.getElementById("operation").value;

    let result;

    try {
        switch (operation) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                if (num2 === 0) {
                    throw new Error("Деление на ноль!");
                }
                result = num1 / num2;
                break;
            default:
                throw new Error("Недопустимая операция.");
        }

        const resultString = `${num1} ${operation} ${num2} = ${result}`;
                // Ограничиваем количество предыдущих результатов
        if (count > 0){
            lastResultBox.innerHTML = lastResult;
        }


        resultBox.innerHTML = resultString;
        lastResult = resultString;
        count = 1;


    } catch (error) {
        resultBox.innerHTML = `<span class="error">${error.message}</span>`;
    }
}



// Добавляем обработчики событий для проверки при потере фокуса
num1Input.addEventListener("blur", () => validateNumber(num1Input, resultBox));
num2Input.addEventListener("blur", () => validateNumber(num2Input, resultBox));