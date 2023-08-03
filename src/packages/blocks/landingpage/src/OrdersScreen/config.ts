const endpoints = {
  httpGetMethod: "GET",
  httpPostMethod: "POST",
  httpDeleteMethod: "DELETE",
  httpPutMethod: "PUT",
  ordersApiContentType: "application/json",
  getIncomingOrders: "/bx_block_shopping_cart/orders/get_all_orders",
  getPreviousOrders: "/bx_block_shopping_cart/orders/previous_orders",
  accptDeclineOrder: "/bx_block_shopping_cart/orders/order_status",
};

export default endpoints;
