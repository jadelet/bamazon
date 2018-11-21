var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require('console.table');
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
start()
});

function start() {
  inquirer
    .prompt({
      name: "start",
      type: "rawlist",
      message: "Would you like to [SHOP] for an item or [QUIT] bamazon?",
      choices: ["SHOP", "QUIT"]
    })
  
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.start.toUpperCase() === "SHOP") {
        buy();
      }
      else {
        quit();
      }
    });
function buy() {

  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    console.table(results);
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: function() {
            var choiceArray = [];
           
            for (var i = 0; i < results.length; i++) {
                  
            choiceArray.push(results[i].item_id.toString())
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
          if (results[i].item_id == answer.choice) {
            chosenProduct = results[i];
          }
        }

        if ( parseInt(chosenProduct.stock_quantity) > parseInt(answer.quantity)) {
  
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: parseInt(chosenProduct.stock_quantity)-parseInt(answer.quantity)
              },
              {
                item_id: chosenProduct.item_id
              }
            ],
         
         
          );

            
          
       
              var totalCost= parseInt(answer.quantity)*parseFloat(chosenProduct.price)
              var totalCostNJ= "$"+ (totalCost*1.07).toFixed(2)
              var totalCostOther="$" + totalCost.toFixed(2)
              console.log(`You have purchased ${answer.quantity} ${chosenProduct.product_name}(s). Your total is ${totalCostNJ} including sales tax, assuming you come from NJ. Otherwise your total cost is ${totalCostOther}`);
              start();
           
            
        }
        else {
        
          console.log("I'm afraid we don't have sufficient stock to fulfill your request, please select another Product or smaller quantity.");
         start();
        }
      });
    })
  }
  function quit() {
    console.log ("Thank you for shopping, come again soon!"); 
    process.exit(0);
  }
}
