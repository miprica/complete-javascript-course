// Budget controller
var budgetController = (function () {
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage  = function (totalInc) {
        if (totalInc> 0) {
            this.percentage = Math.round((this.value/totalInc) * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage  = function () {
        return this.percentage;
    };
    
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotals = function (type){
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });

        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals:{
            inc: 0,
            exp: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function(type, des, val) {
            var newItem, ID, array;

            // Create ID
            array = data.allItems[type];
            if (array.length > 0) {
                ID = array[array.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create Object
            if (type === 'inc') {
                newItem = new Income(ID, des, val);
            } else if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            }

            // Add to data
            array.push(newItem);

            return newItem;

        },

        deleteItem: function(type, id) {
            var ids, index;

            ids = data.allItems[type].map(function(item) { 
                return item.id;
            });

            index = ids.indexOf(id);

            data.allItems[type].splice(index, 1);

        },

        calculateBudget: function (){
            // Calculate totals for inc and exp
            calculateTotals('inc');
            calculateTotals('exp');

            // Calculate budget
            data.budget = data.totals.inc - data.totals.exp;

            // Calculate percentage
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp/data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        calculatePercentages: function() {
            data.allItems.exp.forEach( function(cur) {
                cur.calcPercentage(data.totals.inc);
            });
        },

        getBudget: function() {
            return {
                budget : data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },
        
        getPercentages : function() {
            return data.allItems.exp.map( function(cur) {
                 return cur.getPercentage();
            });
        },
        
        testing: function() {
            console.log (data);
        }
    }
})();

// UI controller
var UIController = (function () {

    var DOMStrings = {
        inputType : '.add__type',
        inputDescription : '.add__description',
        inputValue : '.add__value',
        inputBtn : '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expPercentageLabeL: '.item__percentage',
        dateLabel: '.budget__title--month'
    }

    var formatNumber = function (num, type) {
        var numSplit, nDigits, int, dec;
        // Formats 2310.5 -> 2,310.50
        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');
        int = numSplit[0];
        nDigits = int.length;
        if (nDigits > 3) {
            int = int.substr(0, nDigits - 3) + ',' + int.substr(nDigits - 3, nDigits);
        }
        dec = numSplit[1];

        return ( type === 'inc' ? '+' : '-') + int + '.' + dec;  
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },
        addListItem: function (type, obj) {
            var html, newHtml, element;

            if (type === 'inc') {
                element  = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                element  = DOMStrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);    
        },

        deleteListItem: function(selectorID) {
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clearFields: function() {
            var fields, fieldsArr;
            
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function (current) {
                current.value = "";
            });
            fieldsArr[0].focus();
        },

        displayBudget: function(obj) {
            var type = (obj.budget >= 0) ? 'inc' : 'exp';

            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMStrings.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');

            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';
            }
        },

        displayPercentages: function(percentages) {
            var fields;

            fields = document.querySelectorAll(DOMStrings.expPercentageLabeL);

            var nodeListForEach = function (list, callback) {
                for (var i = 0; i < list.length; i++)
                    callback(list[i], i);
            };

            nodeListForEach(fields, function(current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
        },

        displayDate: function() {
            var now, mon;

            now = new Date();
            mon = now.getMonth();
            const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
          
            document.querySelector(DOMStrings.dateLabel).textContent = monthNames[mon];
        },

        getDOMStrings: function() {
            return DOMStrings;
        }
    };
})();

// Global app controller
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    }

    var updateBudget = function () {
        // Calculate budget
        budgetController.calculateBudget();

        // Get budget
        var budget = budgetController.getBudget();

        // Update the UI
        UICtrl.displayBudget(budget);
    }

    var updatePercentages = function () {
        var percentages;

        // Calculate percentages
        budgetController.calculatePercentages();

        // Get percentages
        percentages = budgetController.getPercentages();

        // Update the UI
        UICtrl.displayPercentages(percentages);
    }

    var ctrlAddItem = function () {
        var input, newItem;

        // Get data from UI
        input = UICtrl.getInput();
        
        if (input.description !== '' && !isNaN(input.value) && input.value > 0)
        {
            // Add input to budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // Display item in the UI
            UICtrl.addListItem(input.type, newItem);

            // Clear the fields
            UICtrl.clearFields();

            // Update and clear budget
            updateBudget();

            // Update percentages
            updatePercentages();
        }
    }

    var ctrlDeleteItem = function (event) {
        var itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]); 
        }

        // Delete item from data structure
        budgetController.deleteItem(type,ID);

        // Delete item from UI
        UICtrl.deleteListItem(itemID);

        // Update the budget
        updateBudget();

        // Update percentages
        updatePercentages();
    };
    

    return {
        init: function() {
            console.log('Application has started');
            setupEventListeners();
            UICtrl.displayDate();
            UICtrl.displayBudget( {
                budget : 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
        }
    }

})(budgetController, UIController);

controller.init();