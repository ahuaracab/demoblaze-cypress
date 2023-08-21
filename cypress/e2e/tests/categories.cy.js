/// <reference types="cypress" />

import { HomePage } from "../pages/HomePage";

const homePage = new HomePage();

beforeEach(() => {
  cy.login();
});

it("Verify the ability to add different categories of products", () => {
  cy.intercept({ method: "POST", url: "/bycat" }).as("category");

  cy.get(homePage.categoriesTitle).should("be.visible");
  cy.get(homePage.categories).should("have.length", 3);

  //Backend categories
  const categories = ["phone", "notebook", "monitor"];

  cy.get(homePage.categories).each(($category, index) => {
    cy.get(homePage.categories).eq(index).click();
    cy.wait("@category").then((interception) => {
      expect(interception.request.body).to.deep.equal({
        cat: categories[index],
      });
    });
    cy.wait(1000);
  });
});

it("Verify that the categories are displayed correctly on the page", () => {
  cy.get(homePage.categoriesTitle).should("be.visible");

  //Frontend categories
  const categories = ["Phones", "Laptops", "Monitors"];

  cy.get(homePage.categories).each(($element, index) => {
    cy.wrap($element).should("have.text", categories[index]);
  });
});
