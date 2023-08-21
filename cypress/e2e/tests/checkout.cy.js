/// <reference types="cypress" />

import { userData } from "./../../support/faker";

import { CartPage } from "../pages/CartPage";
import { HomePage } from "../pages/HomePage";
import { NavBarPage } from "../pages/NavBarPage";
import { ProductPage } from "../pages/ProductPage";

const cartPage = new CartPage();
const homePage = new HomePage();
const navBarPage = new NavBarPage();
const productPage = new ProductPage();

beforeEach(() => {
  cy.login();
});

it("Verify that the checkout process can be successfully completed.", () => {
  cy.get(homePage.cardImages).eq(0).as("img");
  cy.get("@img").click();
  cy.contains(productPage.addToCartButton).click();
  cy.wait(1000);

  cy.get(navBarPage.cartButton).click();
  cy.wait(1000);

  cy.get(cartPage.cartItems).should("have.length", 1);

  cy.get(cartPage.totalPrice)
    .invoke("text")
    .then((totalPrice) => {
      cy.contains(cartPage.placeOrderButton).click();

      cy.get(cartPage.placeOrderForm).should("be.visible");

      const data = userData();

      cy.get(cartPage.formName).type(data.name);
      cy.get(cartPage.formCountry).type(data.country);
      cy.get(cartPage.formCity).type(data.city);
      cy.get(cartPage.formCreditCard).type(data.creditCard);
      cy.get(cartPage.formMonth).type(data.month);
      cy.get(cartPage.formYear).type(data.year);

      cy.contains(cartPage.purcharseButton).click();

      cy.get(cartPage.confirmModal).should("be.visible");
      cy.wait(1000);

      cy.get(cartPage.confirmModal)
        .invoke("text")
        .then((text) => {
          const amountText = `Amount: ${totalPrice} USD`;
          const cardNumberText = `Card Number: ${data.creditCard}`;

          cy.wrap(text).should("include", amountText);
          cy.wrap(text).should("include", cardNumberText);
        });

      cy.contains(cartPage.okButton).click();
      cy.wait(1000);
      cy.location("pathname").should("eq", "/index.html");
    });
});
