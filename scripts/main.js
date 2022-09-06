import {getOrders, addNewOrder} from './orders.js'

document.getElementById("app").innerHTML = `
<h1>Peanut's Pizza Parlor</h1>
<div>
  <h3>Please make your pizza</h3>
  <div class="pizzaForm">
    <div class="crust">
      <p>Pick your crust</p>
      <label for="thinCrust">Thin</label>
      <input id="thinCrust" name="crust" type="radio" value="thin" />
      <label for="handTossedCrust">Hand Tossed</label>
      <input id="handTossedCrust" name="crust" type="radio" value="HandTossed" />
      <label for="handTossedCrust">Stuffed</label>
      <input id="stuffed" name="crust" type="radio" value="stuffed" />
      </div>
      <div class="toppings">
        <p>Pick your Toppings (Select all that apply)</p>
        <ul>
          <li>
            <input id="pepperoni" name="toppings" type="checkbox" value="pepperoni" />
            <label for="pepperoni">Pepperoni</label>
          </li>
          <li>
            <input id="Sausage" name="toppings" type="checkbox" value="Sausage" />
            <label for="Sausage">Sausage</label>
          </li>
          <li>
            <input id="Black Olives" name="toppings" type="checkbox" value="Black Olives" />
            <label for="Black Olives">Black Olives</label>
          </li>
          <li>
            <input id="Green Peppers" name="toppings" type="checkbox" value="Green Peppers" />
            <label for="Green Peppers">Green Peppers</label>
          </li>
          <li>
            <input id="Onions" name="toppings" type="checkbox" value="Onions" />
            <label for="Onions">Onions</label>
          </li>
        </ul>
    </div>
    <div class="extras">
      <label for="specialInstructions">Notes/Special Instructions</label>
      <div>
        <textarea id="specialInstructions"></textArea>
      </div>
    </div>
    <div>
      <button id="submitOrder">Order Pizza</button>
    </div>
  </div>
  <h3>Orders</h3>
  <div id="orders"></div>
</div>
`;


const displayOrders = () => {
  const orders = getOrders()
  let HTML = '';
  for (const order of orders) {
    HTML += `
      <div class="order">
        <p>Order #${order.id}</p>
        <p>Crust: ${order.crust}</p>
        <p>Toppings: ${order.toppings}</p>
        <p>Instructions: ${order.instructions}</p>
      </div>
    `
  }
  document.getElementById('orders').innerHTML = HTML;
}
displayOrders()

const getNewOrderId = () => {
  const orders = getOrders()
  let highestOrderId = 0
    if(orders.length > 0) {
      highestOrderId = orders.sort((a, b) => b.id - a.id)[0].id
    }
    return highestOrderId + 1
}

document.addEventListener("click", (e) => {
  if (e.target.id === "submitOrder") {
    const newId = getNewOrderId()
    const newCrust = document.querySelector("input[name=crust]:checked")?.value;
    const newToppings = [];
    const selectedToppings = document.querySelectorAll("input[name=toppings]:checked");
    selectedToppings.forEach(topping => {newToppings.push(topping.value)});
    const newInstructions = document.getElementById('specialInstructions')?.value;
    const newOrder = {
      id: newId,
      crust: newCrust,
      toppings: newToppings,
      instructions: newInstructions
    };
    addNewOrder(newOrder)
  }
})

document.addEventListener("stateChanged", (e) => {
  displayOrders()
})