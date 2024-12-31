document.addEventListener("DOMContentLoaded", function () {
    const billInput = document.getElementById("bill");
    const tipButtons = document.querySelectorAll(".tip-button");
    const customTipInput = document.getElementById("custom-tip");
    const peopleInput = document.getElementById("people");
    const tipAmountOutput = document.getElementById("tip-amount");
    const totalOutput = document.getElementById("total");
    const resetButton = document.getElementById("reset");

    let billValue = 0;
    let tipValue = 0;
    let peopleValue = 1;

    function calculateTip() {
        if (peopleValue === 0) {
            tipAmountOutput.textContent = "$0.00";
            totalOutput.textContent = "$0.00";
            return;
        }

        const tipAmount = (billValue * tipValue) / peopleValue;
        const total = (billValue + billValue * tipValue) / peopleValue;

        tipAmountOutput.textContent = `$${tipAmount.toFixed(2)}`;
        totalOutput.textContent = `$${total.toFixed(2)}`;
    }

    billInput.addEventListener("input", function () {
        billValue = parseFloat(billInput.value) || 0;
        calculateTip();
    });

    tipButtons.forEach((button) => {
        button.addEventListener("click", function () {
            tipButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
            tipValue = parseFloat(button.dataset.tip) / 100;
            customTipInput.value = "";
            calculateTip();
        });
    });

    customTipInput.addEventListener("input", function () {
        tipValue = parseFloat(customTipInput.value) / 100 || 0;
        tipButtons.forEach((btn) => btn.classList.remove("active"));
        calculateTip();
    });

    peopleInput.addEventListener("input", function () {
        peopleValue = parseInt(peopleInput.value) || 0;

        if (peopleValue < 1) {
            peopleInput.classList.add("error");
        } else {
            peopleInput.classList.remove("error");
        }

        calculateTip();
    });
    resetButton.addEventListener("click", function () {
        billInput.value = "";
        customTipInput.value = "";
        peopleInput.value = "1";
        tipButtons.forEach((btn) => btn.classList.remove("active"));
        tipAmountOutput.textContent = "$0.00";
        totalOutput.textContent = "$0.00";
        billValue = 0;
        tipValue = 0;
        peopleValue = 1;
    });

});