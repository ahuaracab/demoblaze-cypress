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

it("Verify process of adding an item from each category to the shopping cart", () => {
  const selectedTitles = [];
  const selectedPrices = [];

  cy.get(homePage.categories)
    .each(($category, index) => {
      cy.get(homePage.categoriesTitle).should("be.visible");

      cy.get(homePage.categories).eq(index).as("category");
      cy.get("@category").click();
      cy.wait(2000);

      cy.get(homePage.cardImages)
        .its("length")
        .then((itemCount) => {
          const itemIndex = Math.floor(Math.random() * itemCount);

          cy.get(homePage.cardTitles)
            .eq(itemIndex)
            .invoke("text")
            .then((title) => {
              selectedTitles.push(title);
            });

          cy.get(homePage.cardBlocks)
            .eq(itemIndex)
            .invoke("text")
            .then((priceText) => {
              const price = priceText.replace("$", "");
              selectedPrices.push(price);
            });

          cy.get(homePage.cardImages).eq(itemIndex).as("img");
          cy.get("@img").click();

          cy.contains(productPage.addToCartButton).click();
          cy.wait(1000);

          cy.contains(navBarPage.homeButton).click();
        });
    })
    .then(() => {
      cy.get(navBarPage.cartButton).click();
      cy.wait(3000);

      cy.get(cartPage.cartItemTitles).should(
        "have.length",
        selectedTitles.length
      );

      selectedTitles.forEach((selectedTitle, index) => {
        cy.get(cartPage.cartItemTitles).should("contain", selectedTitle);

        cy.get(cartPage.cartItemTitles).each(($td, cartIndex) => {
          if ($td.text() === selectedTitle) {
            cy.get(cartPage.cartItemPrices)
              .eq(cartIndex)
              .should("contain", selectedPrices[index]);
          }
        });
      });

      cy.cleanCart();
    });
});
