// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { loginData } from "./../support/faker";
import { NavBarPage } from "../e2e/pages/NavBarPage";
import { CartPage } from "../e2e/pages/CartPage";

const navBarPage = new NavBarPage();
const cartPage = new CartPage();

Cypress.Commands.add("login", () => {
  cy.visit("/");
  const data = loginData();

  cy.get(navBarPage.signupButton).as("signupButton");
  cy.get(navBarPage.loginButton).as("loginButton");

  if (!Cypress.env("username") || !Cypress.env("password")) {
    cy.get("@signupButton").click();
    typeSlowly(navBarPage.signUsername, data.username);
    typeSlowly(navBarPage.signPassword, data.password);
    cy.get(navBarPage.signupConfirmButton).as("signupConfirmButton");
    cy.get("@signupConfirmButton").click();

    cy.get("@loginButton").click();
    typeSlowly(navBarPage.loginUsername, data.username);
    typeSlowly(navBarPage.loginPassword, data.password);
    cy.get(navBarPage.loginConfirmButton).as("loginConfirmButton");
    cy.get("@loginConfirmButton").click();
  } else {
    cy.get("@loginButton").click();
    typeSlowly(navBarPage.loginUsername, Cypress.env("username"));
    typeSlowly(navBarPage.loginPassword, Cypress.env("password"));
    cy.get(navBarPage.loginConfirmButton).as("loginConfirmButton");
    cy.get("@loginConfirmButton").click();
  }

  function typeSlowly(element, text) {
    cy.get(element).invoke("val", "").type(text, { force: true });
  }
});

Cypress.Commands.add("cleanCart", () => {
  let deletedAllItems = false;

  function deleteAllItems() {
    if (!deletedAllItems) {
      cy.get(cartPage.deleteButtons)
        .should("exist")
        .then(($buttons) => {
          cy.get(cartPage.deleteButtons).eq(0).click();
          cy.wait(3000);

          if ($buttons.length === 1) {
            deletedAllItems = true;
          }

          deleteAllItems();
        });
    }
  }

  deleteAllItems();
});
