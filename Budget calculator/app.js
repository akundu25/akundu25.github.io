var budgetController = (function(){
    
    // for calculating the data part of the application
    var Expenses = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }
    
    
    Expenses.prototype.calcPercentage = function(totalIncome){
        
        if(totalIncome > 0){
            this.percentage = Math.round((this.value/totalIncome)*100);
        }else{
            this.percentage = -1;
        }
    }
    
    Expenses.prototype.getPerc = function(){
        return this.percentage;
    }
    
    var Income = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    
    
    var data = {
        inputData: {
            exp: [],
            inc: []
        },
        
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1,
    };
    
    var calculateTotals = function(type){
        var sum = 0;
        
        data.inputData[type].forEach(function(current){
            
            sum += current.value;
        });
        
        data.totals[type] = sum;
        
    }
    
    return {
        addItem: function(type,des,val,mon){
            var newItem,ID;
            
            //id will be equal to last id + 1
            if (data.inputData[type].length > 0){
                ID = data.inputData[type][data.inputData[type].length-1].id + 1; 
            }else{
                ID = 0;
            }
            
            
            // object is created of the new item
            if (type === 'inc'){
                newItem = new Income(ID,des,val);
            }else if (type === 'exp'){
                newItem = new Expenses(ID,des,val);
            }
            
            //the new object is added to the correct array
            data.inputData[type].push(newItem);
            
            //the new object is returned
            return newItem;
        },
        
        calculateBudget: function(){
            //1.calculate the total income and expenses
            calculateTotals('exp');
            calculateTotals('inc');
            
            //2.calculate the budget
            data.budget = data.totals.inc - data.totals.exp;
            
            //3.calculate the percentage of total income spent.
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
        },
        
        
        calculatePercentages: function(){
            
            data.inputData.exp.forEach(function(current){
                current.calcPercentage(data.totals.inc);
            });
            
        },
        
        getPercentages: function(){
            var percentages = data.inputData.exp.map(function(cur){
                return cur.getPerc();
            });
            
            return percentages;
        },
        
        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },
        
        
        deleteItem: function(type, id){
            var ids, index;
            
            ids = data.inputData[type].map(function(current){    /*difference between map and forEach is map returns a*/         return current.id;                             /*array and forEach does not */      
            });
            
            index = ids.indexOf(id);
            
            if (index !== -1){
                data.inputData[type].splice(index, 1);     /*splice method deletes elements from an array:                                                              splice(startindex, no. of elements to be deleted)*/
            }  
        },
        
        updateData: function(){
            data.inputData.exp = [];
            data.inputData.inc = [];
            data.totals.exp = 0;
            data.totals.inc = 0;
            data.budget = 0;
            data.percentage = -1;
        },
        
        budgetTesting: function(){
            return data;
        }
        
    };
    
})();



var UIcontroller = (function(){
    
    // for getting the job done on the user interface
    DOMstrings = {
        type: '.add__type',
        description: '.add__description',
        value: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        incomeValue: '.budget__income--value',
        expensesValue: '.budget__expenses--value',
        percentageValue: '.budget__expenses--percentage',
        budgetValue: '.budget__value',
        container: '.container',
        expensePercentage: '.item__percentage',
        dateLabel: '.budget__title--month'
    };
    
    
    var formatNumber = function(num, type){
        var int, dec, numSplit;
        
        num = Math.abs(num);
        num = num.toFixed(2);  //this method is used to set two decimal digits and it returns a string
        
        numSplit = num.split('.');
        
        int = numSplit[0];
        dec = numSplit[1];
        
        if (int.length > 3){
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }
        
        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    }
    
    
    return {
        // function to get the values given by the user
        getInput: function(){
            return {
                inputType: document.querySelector(DOMstrings.type).value,  //it will be either inc or exp
                inputDescription: document.querySelector(DOMstrings.description).value,
                inputValue: parseFloat(document.querySelector(DOMstrings.value).value),
            };
        },
        
        //function to add the new item to the UI
        
        addNewList: function(obj, type){
            var html, newHtml, element;
            //create the HTML string with placeholders
            if (type === 'inc'){
                element = DOMstrings.incomeContainer;
                
                html = ' <div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                
            }else if (type === 'exp'){
                element = DOMstrings.expensesContainer;
                
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                
            }
            
            //replace the placeholders with some actual data
            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%',formatNumber(obj.value, type));
            
            //insert the HTML string to the UI using insertAdjacentHTML method
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
            
        },
        
        deleteListItem: function(selectorId){
            
            var element = document.getElementById(selectorId);
            
            element.parentNode.removeChild(element);
        },
        
        deleteList: function(){
            var elements;
            
            elements = document.querySelectorAll(DOMstrings.incomeContainer + ',' + DOMstrings.expensesContainer);
            
            for (var i=0; i<elements.length; i++){
                
                elements[i].innerHTML = "";
            }
            
        },
        //for clearing the input fields after each entry
        clearFields: function(){
            var fields, fieldsArray;
            
            fields = document.querySelectorAll(DOMstrings.description +' , '+ DOMstrings.value); //it returns a list
            
            fieldsArray = Array.prototype.slice.call(fields);  //converting the list into an array and Array is the                                                            function constructor for all arrays.
            fieldsArray.forEach(function(current, index, array){
                current.value = "";
            });
            
            
            fieldsArray[0].focus();
        },
        
        displayBudget: function(bud){
            var type;
            
            if (bud.budget < 0){
                type = 'exp';
            }else{
                type = 'inc';
            }
            
            document.querySelector(DOMstrings.budgetValue).textContent = formatNumber(bud.budget,type);
            document.querySelector(DOMstrings.incomeValue).textContent = formatNumber(bud.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesValue).textContent = formatNumber(bud.totalExp,'exp');
            
            if (bud.percentage > 0){
                document.querySelector(DOMstrings.percentageValue).textContent = bud.percentage + '%';
            }else{
                document.querySelector(DOMstrings.percentageValue).textContent = '---';               
            }
            
        },
        
        displayPercentages: function(percentages){
            var fields;
            
            fields = document.querySelectorAll(DOMstrings.expensePercentage);
            
            for (var i=0; i<fields.length; i++){
                if (percentages[i] > 0){
                    
                    fields[i].textContent = percentages[i] + '%';
                }else{
                    fields[i].textContent = '---';
                }
            }  
        },
        
        changeType: function(){
            var fields;
            
            fields = document.querySelectorAll(DOMstrings.type + ',' + DOMstrings.description + ',' + DOMstrings.value);
            
            for (var i = 0; i<fields.length; i++){
                fields[i].classList.toggle('red-focus');
            }
            
            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        },
        
        //function to return the dom strings which is private
        getDOM: function(){
            return DOMstrings;
        }
    };
})();

//for connecting the two modules for interaction

var controller = (function(budgetCtrl,UICtrl){
    
    
    var changeMonth = function(){
        //1. update the data structure
        budgetCtrl.updateData();
        
        //2.update the UI
        UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
        
        UICtrl.deleteList();
    } 
    
    
    var setupEventListener = function(){
        DOM = UICtrl.getDOM();
        
        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
    
    
        document.addEventListener('keypress',function(event){
        
            if (event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        
        });
        
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
        document.querySelector(DOM.type).addEventListener('change', UICtrl.changeType);
    
    }
    
    var updateBudget = function(){
        
        //1.calculate the budget
        budgetCtrl.calculateBudget();
        
        //2.return the budget
        var budget = budgetCtrl.getBudget();
        
        //3.display the budget on the UI
        UICtrl.displayBudget(budget);
    }
    
    var updatePercentages = function(){
        var percentages;
        
        //1. calculate the percentages
        budgetCtrl.calculatePercentages();
        //2. read the percentages
        percentages = budgetCtrl.getPercentages();
        //3. display the percentages
        UICtrl.displayPercentages(percentages);
    }
    
    var ctrlAddItem = function(){
        var input,newItem;
        //1.get input data from the UI
        
        input = UICtrl.getInput();
        
        if (input.inputDescription!=="" && !isNaN(input.inputValue) && input.inputValue>0){
            //2.add the input data into the data structure
        
            newItem = budgetCtrl.addItem(input.inputType,input.inputDescription,input.inputValue,input.inputMonth);

            //3.add the new item to the UI

            UICtrl.addNewList(newItem,input.inputType);

            //4.clearing the fields

            UICtrl.clearFields();

            //5.calculate and update the budget

            updateBudget();
            
            //6.update the percentages

            updatePercentages();
        }
    
    }
    
    
    var ctrlDeleteItem = function(event){
        var itemID, type, ID, breakId;
        
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        breakId = itemID.split('-');
        type = breakId[0];
        ID = parseInt(breakId[1]);
        
        
        //1.delete item from the data structure
        budgetCtrl.deleteItem(type, ID);
        
        //2.delete item from the UI
        UICtrl.deleteListItem(itemID);
        
        //3.recalculate the budget and update it in the UI
        updateBudget();
        
        //4. update the percentages
        updatePercentages();
    }
    
    return {
        init: function(){
            //UICtrl.displayDate();
            setupEventListener();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            console.log('Application has started.');
        }
    };
    
})(budgetController,UIcontroller);


controller.init();
