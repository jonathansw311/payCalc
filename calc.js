
let docFee=999.00;
let thirdrdParty=244.00;
let plateFee;
let newPlate=450.00;
let transPlate=200.00;
let reconFee;
let amtFin=0;
let taxes=0;
let rate;
let tradePrice;
let months;

submit = document.querySelector('button')


submit.addEventListener('click', function(e){
    e.preventDefault();
    
    display()
})

start = document.querySelector('body')
start.addEventListener('focusout', function(e){
    e.preventDefault();
    
    display()
    
}
)

function display(){
    
    let newUsed= getRadioSelector();
    if (newUsed==='new'){
        reconFee=0
    }
    else{
        reconFee=1499.00
    }

    plateFee= getPlateFee();
    
    
    tradePrice=document.getElementById('tradePrice').value
    tradePayoff=document.getElementById('tradePayoff').value
    sellPrice=document.getElementById('sellPrice').value
    cashDown=document.getElementById('cashDown').value
    months=document.getElementById('months').value
    let iRate=document.getElementById('rate').value
    rate= iRate *.01
   
    let payment=getPayment(sellPrice, tradePrice, cashDown, months, rate, tradePayoff)
   
    sendPayment(payment)
}

function getRadioSelector(){
if (document.getElementById('new').checked){
    let selected = 'new';                      
    return selected;
    }
    else{
        selected = 'used'
        return selected
    }
}

function getPlateFee(){
    if(document.getElementById('newPlates').checked){
        
        return newPlate}
        else{
            return transPlate
        }
    
}

function getPayment(sellPrice, tradePrice, cashDown, months, rate, tradePayoff){
tradePayoffN=Number(tradePayoff)
let taxableAmt = (sellPrice-tradePrice+docFee+reconFee)

taxes = getTaxes(taxableAmt)
amtFin=taxableAmt+taxes+plateFee+thirdrdParty+tradePayoffN-cashDown;
let yearRate=rate/12
let top=amtFin*yearRate
let oneYearRate=yearRate+1;
let oneYearmonthsPow=1-(oneYearRate ** (months*-1))
let payment = top/oneYearmonthsPow;
return payment
}

function getTaxes(t){
    let tax = t * .06
    if (tax >=0){
        return tax
    }
    else return 0;
}

function sendPayment(payment){
    let result=document.querySelector('.result')
    
    result.replaceChildren()
    let formatPayment = parseFloat(payment).toFixed(2)
    let results = document.createElement("p")
    results.innerHTML=`The monthly payment is $${formatPayment} for ${months} months`
    let results1= document.createElement("p")
    let results2= document.createElement('p')
    let results3= document.createElement('p')
    let results4= document.createElement('p')
    let results5= document.createElement('p')
    results2.innerHTML=`Taxes are $${taxes}`
    results1.innerHTML=`Amount Financed is: $${amtFin}`
    results3.innerHTML=`Your ESTIMATED plate fees are $${plateFee}`
    results4.innerHTML=`Reconditioning Fees are $${reconFee}`
    result.append(results, results1, results3)
    if (reconFee > 0){
        result.append(results4)
    }    
    result.append(results2)

    if (tradePrice > 0){
        results5.innerHTML=`Your trade saved you $${tradePrice *.06} in Taxes, without a trade you would owe $${(tradePrice *.06)+taxes} in Tax!!`
        result.append(results5)
    }
}
