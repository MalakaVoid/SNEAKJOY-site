async function getAllOrders() {

    let response = await fetch('/api/order');
    let orders = await response.json();
    return orders.orders;

}