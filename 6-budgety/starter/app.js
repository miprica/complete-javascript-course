// Budget controller
var budgetController = (function () {
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals:{
            inc: 0,
            exp: 0
        }
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
        expenseContainer: '.expenses__list'
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
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
            newHtml = newHtml.replace('%value%', obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);    
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
    }

    var ctrlAddItem = function () {
        var input, newItem;

        // Get data from UI
        input = UICtrl.getInput();
        
        // Add input to budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // Display item in the UI
        UICtrl.addListItem(input.type, newItem);

        // Clear the fields
        UICtrl.clearFields();
    }

    return {
        init: function() {
            console.log('Application has started');
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();