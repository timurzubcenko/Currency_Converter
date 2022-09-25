// 6. Реализуйте калькулятор валют. Есть два селекта - 
// селект с исходной валюты, селект с той валютой, в которую мы хотим перевести деньги, инпут, 
// в который вводится сумма для обмена. Курсы валют храните в массиве.
// Сделайте так, чтобы в селектах нельзя было выбрать две одинаковых валюты.

const input1 = document.querySelector('#input-1')
const input2 = document.querySelector('#input-2')
const select1 = document.querySelector('#select-1')
const select2 = document.querySelector('#select-2')
const currency = document.querySelector('.main_currency')

//Btn
const btnRepeat = document.querySelector('.btn_repeat')

getCurrency()

async function getCurrency() {
    const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    const data = await response.json()
    const result = await data
    console.log(result)

    input1.oninput = select1Value
    input1.addEventListener('keydown', input1KeyDown)
    input2.oninput = select2Value
    input2.addEventListener('keydown', input2KeyDown)
    select1.oninput = select1Value
    select2.oninput = select1Value

    function select1Value() {
        if (select1.value == 100 && select2.value == 100) {
            input1.value = ""
            input2.value = ""
            currency.classList.add('no')
        } else {
            currency.classList.remove('no')
        }

        if (select2.value == 100) {
            const firstСurrency = (parseFloat(input1.value) * result[select1.value].rate).toFixed(2)
            input2.value = firstСurrency
        }
        else if (select1.value == 100) {
            const firstСurrency = (parseFloat(input1.value) / result[select2.value].rate).toFixed(2)
            input2.value = firstСurrency
        }
        else {
            const firstСurrency = (parseFloat(input1.value) * result[select1.value].rate / result[select2.value].rate).toFixed(2)
            input2.value = firstСurrency
        }


        if (select1.value === select2.value) {
            input1.value = ""
            input2.value = ""
            currency.classList.add('no')
        } else {
            currency.classList.remove('no')
        }
    }

    function select2Value() {
        if (select1.value == 100) {
            const firstСurrency = (parseFloat(input2.value) * result[select2.value].rate).toFixed(2)
            input1.value = firstСurrency
        }
        else {
            const firstСurrency = (parseFloat(input2.value) / result[select1.value].rate * result[select2.value].rate).toFixed(2)
            input1.value = firstСurrency
        }
    }

    function input1KeyDown(e) {
        if (e.keyCode === 13) {
            select1Value()
        }
    }

    function input2KeyDown(e) {
        if (e.keyCode === 13) {
            select2Value()
        }
    }

}

btnRepeat.addEventListener('click', () => {
    const repeat = document.querySelector('#repeat')
    currency.classList.toggle('repeat')
    repeat.classList.toggle('repeat')
})





// const input1 = document.querySelector('#input-1')
// const input2 = document.querySelector('#input-2')
// const select1 = document.querySelector('#select-1')
// const select2 = document.querySelector('#select-2')

// input1.addEventListener('keydown', input1Value)
// input2.addEventListener('keydown', input2Value)

// let ExchangeRates = ['36.95', '0.027']

// function input1Value(e) {

//     const uah = ExchangeRates[1] * input1.value

//     if (e.keyCode === 13) {
//         input2.value = uah
//     }
// }

// function input2Value(e) {

//     const usd = ExchangeRates[0] * input2.value
//     if (e.keyCode === 13) {
//         input1.value = usd
//     }

// }