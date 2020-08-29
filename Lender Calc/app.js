
// MAN CLASS
class LenderUI {

    DomUI(){
        // DOM ELEMENTS
        const title = document.querySelector('.container'),
              container =  document.querySelector('.lender-title'),
              amount = document.getElementById('loan_amount'),
              percent = document.getElementById('loan_percent'),
              years = document.getElementById('loan_years'),
              resMonthly = document.getElementById('monthly'),
              resPayment = document.getElementById('payment'),
              resInterest = document.getElementById('interest'),
              loading = document.querySelector('.loading'),
              result = document.querySelector('.result');
              
        return {title, container, amount, percent, years, resMonthly, resPayment, resInterest, loading, result};
    }


    AlertUI(msg, cls, dpl){
        const div = document.createElement('div');
        const {title, container} = this.DomUI();
        div.appendChild(document.createTextNode(msg));
        title.insertBefore(div, container);
    }



}


// 
document.querySelector('form').addEventListener('submit', function(e){
    const UI = new LenderUI;
    let {amount, percent, years, resMonthly, resPayment, resInterest, loading, result} = UI.DomUI();
    
    const principal = parseFloat(amount.value),
          calcInt = parseFloat(percent.value) / 100 / 12,
          calcPay = parseFloat(years.value) * 12;
    
    const x = Math.pow(1 + calcInt, calcPay);
    const monthly = (principal * x * calcInt) / (x - 1);
     
    if(isFinite(monthly)){
        setTimeout(function(){
            resMonthly.textContent = monthly.toFixed(2);
            resPayment.textContent = (monthly * calcPay).toFixed(2);
            resInterest.textContent = ((monthly * calcPay) - principal).toFixed(2);
            loading.style.display = "none";
        }, 2000);
        
        loading.style.display = "block";

    }else {

        result.style.display = "none"
        loading.style.display = "block";
        setTimeout(function(){
            loading.style.display = "none"; 
            result.style.display = "block";
        }, 2000);
    }

    e.preventDefault();
});




