const swap_btn = document.querySelector('.swap-btn');
const rate = document.querySelector('.rate');
const currency1 = document.querySelector('.currency-one');
const currency2 = document.querySelector('.currency-two');
const amount1 = document.getElementById('amount-one');
const amount2 = document.getElementById('amount-two'); 

function getCurrency(){
    const currency_one = currency1.value;
    const currency_two = currency2.value;
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
        const currentRate = data.rates[currency_two];
        rate.innerText = `1 ${currency_one} = ${currentRate} ${currency_two}`;
        amount2.value = (amount1.value * currentRate).toFixed(2);

        amount1.addEventListener('change', function(){
            rate.innerText = `${amount1.value} ${currency_one} = ${amount2.value} ${currency_two}`;
        })
    })
}

currency1.addEventListener("change", getCurrency);
amount1.addEventListener("input", getCurrency);
currency2.addEventListener("change", getCurrency);
amount2.addEventListener("input", getCurrency);

swap_btn.addEventListener('click', function(){
    let value = currency1.value;
    currency1.value = currency2.value;
    currency2.value = value;
    getCurrency();
})

getCurrency();
