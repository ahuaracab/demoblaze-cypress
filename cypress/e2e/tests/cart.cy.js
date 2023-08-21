/// <reference types="cypress" />

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
it("Verify that the cart updates when adding an item", () => {
  cy.visit("/cart.html");

  cy.get(cartPage.cartItems).should("not.exist");
  cy.get(cartPage.totalPrice).should("not.be.visible");

  cy.contains(navBarPage.homeButton).click();

  cy.get(homePage.cardTitles)
    .eq(0)
    .invoke("text")
    .then((title) => {
      const selectedTitle = title;

      cy.get(homePage.cardBlocks)
        .eq(0)
        .invoke("text")
        .then((priceText) => {
          const selectedPrice = priceText.replace("$", "");

          cy.get(homePage.cardImages).eq(0).as("img");
          cy.get("@img").click();

          cy.contains(productPage.addToCartButton).click();
          cy.wait(1000);

          cy.get(navBarPage.cartButton).click();
          cy.wait(3000);

          cy.get(cartPage.cartItems).should("have.length", 1);
          cy.get(cartPage.cartItemTitles).should("contain", selectedTitle);
          cy.get(cartPage.cartItemPrices).should("contain", selectedPrice);

          cy.get(cartPage.totalPrice).should("contain", `${selectedPrice}`);
        });

      cy.cleanCart();
    });
});

it("Verify that the cart updates when deleting an item", () => {
  cy.get(homePage.cardImages).eq(0).as("img");
  cy.get("@img").click();
  cy.contains(productPage.addToCartButton).click();
  cy.wait(1000);

  cy.get(navBarPage.cartButton).click();
  cy.wait(1000);

  cy.get(cartPage.cartItems).should("have.length", 1);

  cy.get(cartPage.deleteButtons).as("delete");
  cy.get("@delete").click();

  cy.get(cartPage.cartItems).should("not.exist");
  cy.get(cartPage.totalPrice).should("not.be.visible");
});
