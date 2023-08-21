/// <reference types="cypress" />

export class CartPage {
  cartItemTitles = "#tbodyid tr.success td:nth-child(2)";
  cartItemPrices = "#tbodyid tr.success td:nth-child(3)";
  cartItems = "#tbodyid tr.success";
  totalPrice = "#totalp";
  deleteButtons = "#tbodyid tr.success td:nth-child(4) a";
  formName = "#name";
  formCountry = "#country";
  formCity = "#city";
  formCreditCard = "#card";
  formMonth = "#month";
  formYear = "#year";
  placeOrderForm = "#orderModal";
  placeOrderButton = "Place Order";
  confirmModal = ".lead";
  purcharseButton = "Purchase";
  okButton = "OK";
}
