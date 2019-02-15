(function(){
    // Basic variables
    var currencyList = document.getElementById('currency_list'),
        form = document.querySelector('form'),
        total = document.getElementById('total_price');
    // handler on submit
    form.addEventListener('submit',function(e){
        e.preventDefault();
        // get value from inputs
        var currency = document.getElementById('currency').value,
            quantity = document.getElementById('quantity').value,
            quantityNumb = +quantity;
        // validation
        if (currency === '') {
            alert("You must write currency!");
        } else if (isNaN(quantityNumb) || quantityNumb <= 0 ) {
            alert("You must write quantity! Only numbers!");
        }else{
            // add item to list
            currencyList.innerHTML += '<li data-quantity="'+ quantityNumb.toFixed(2) +'"><span class="currency">' + currency + '</span><span class="quantity">'+ quantityNumb.toFixed(2) + '</span> <span class="del"></span></li>';
            // reset inputs
            document.getElementById("currency").value = "";
            document.getElementById("quantity").value = "";
            // call functions
            sortList(); // sort list
            storeList(); // save to localstorage
            totalPrice(); // calc total price

        }
    },false);

    // calc total price
    function totalPrice() {
        var array = [];
        // get data-quantity from each items
        document.querySelectorAll('#currency_list li').forEach(function(item) {
            var a = item.getAttribute('data-quantity');
            array.push(a);
        });

        //calc sum
        var sum=0;
        for(var i=0;i<array.length;i++){
            sum = sum + parseFloat(array[i]);
        }
        total.innerHTML = sum.toFixed(2);
        storeTotalPrice(); // save total price to localstorage
    }

    // sort list by price
    function sortList() {
        var list, i, switching, li, shouldSwitch;
        list = document.getElementById("currency_list");
        switching = true;
        while (switching) {
            switching = false;
            li = list.getElementsByTagName("li");
            for (i = 0; i < (li.length - 1); i++) {
                shouldSwitch = false;
                // get item price from data-quantity
                if (li[i].getAttribute('data-quantity') < li[i + 1].getAttribute('data-quantity')) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                li[i].parentNode.insertBefore(li[i + 1], li[i]);
                switching = true;
            }
        }
    }
    // slide animation for content
    var getHeight = false;
    var height = 0;
    var open = true;
    function slideBox() {
        var box = document.getElementById('widget-content');
        if(!getHeight) {
            height = box.offsetHeight;
            getHeight = true;
        }
        if(open) {
            open = false;
            box.style.height = '0px';
        }
        else {
            open = true;
            box.style.height = height + 'px';
        }
    }
    // toggle Class for header
    var header = document.getElementById('widget-header');
    header.addEventListener('click',function(){
        this.classList.toggle("active");
        slideBox(); // call func with slide anmation
    },false);

    // delete item
    currencyList.addEventListener('click',function(e){
        var t = e.target;
        if(t.classList.contains('del')){
            t.parentNode.remove();
        }
        // update store and total price after deleted item
        sortList();
        storeList();
        totalPrice();
        storeTotalPrice();
    },false);

    // save list to localStorage
    function storeList() {
        window.localStorage.storeList = currencyList.innerHTML;
    }
    // save totalprice to localStorage
    function storeTotalPrice() {
        window.localStorage.totalPrice = total.innerHTML;
    }

    // getValues from localStorage
    function getValues() {
        var storedValues = window.localStorage.storeList;
        var storedTotalPrice = window.localStorage.totalPrice;
        if(storedValues) {
            currencyList.innerHTML = storedValues;
            total.innerHTML = storedTotalPrice;
        }
    }
    getValues();// call fun with stordata
})();