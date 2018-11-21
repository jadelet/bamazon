var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  buy();
});

function buy() {

  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
           
            for (var i = 0; i < results.length; i++) {
              var cost = JSON.stringify(results[i].price);
              var product = JSON.stringify(results[i].product_name);
              var department = JSON.stringify(results[i].department_name);
              var salesEntry = (product + "|" + department + "|" + cost);
          
             
            choiceArray.push(salesEntry)
          
          }
          return choiceArray
        },
          message: "Which Product would you like to purchase?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many of this Product would you like to purchase?"
        }
      ])

      .then(function(answer) {
        
        var chosenProduct;
        for (var i = 0; i < results.length; i++) {
          console.log(answer)
          if (answer.choice.quantity >=  ) {

            chosenProduct = results[i];
          }
        }

        if ( parseInt(chosenProduct.stock_quantity) < parseInt(quantity)) {
  
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stockquantity: parseInt(stock_quantity)-parseInt(quantity)
              },
              {
                id: chosenProduct.id
              }
            ],
         
            function(error) {
              if (error) throw err;
              var totalCost= parseint(chosenProduct.quantity)*parseInt(chosenProduct.price)
              var totalCostNJ= totalCost*1.07
              console.log(`You have purchased ${quantity} ${chosenProduct.name}(s). Your total is ${totalCostNJ} including sales tax, assuming you come from NJ. Otherwise your total cost is ${totalCost}`);
              start();
           
            });
        }
        else {
        
          console.log("I'm afraid we don't have sufficient stock to fulfill your request, please select another Product or smaller quantity.");
          start();
        }
      });
    })
  }