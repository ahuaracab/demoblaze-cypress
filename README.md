# DemoBlaze Automated Testing with Cypress

This repository contains automated functional tests for the DemoBlaze project using Cypress.

## Table of Contents

- [DemoBlaze Automated Testing with Cypress](#demoblaze-automated-testing-with-cypress)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation and Usage](#installation-and-usage)
  - [Demo Result Image](#demo-result-image)
  - [Interpret the Results](#interpret-the-results)
  - [Configuration](#configuration)
  - [Environment](#environment)
  - [Dependencies](#dependencies)
  - [Folder Structure](#folder-structure)
  - [Issues and Contributions](#issues-and-contributions)
  - [Author](#author)
  - [License](#license)

## Prerequisites

-   Node.js version 14 or higher is required.

## Installation and Usage

1.  Clone this repository:

    `git clone https://github.com/ahuaracab/demoblaze-cypress`

2.  Navigate to the repository directory.

3.  Install dependencies:

    `npm install`

4.  Run the automated tests using the following command:

    `npm run cy:run`

## Demo Result Image

![](demo.png)

## Interpret the Results

After test execution, you will see the results in the terminal. Here's how to interpret the results:

-   **Spec**: Name of each test specification file executed.
-   **Tests**: Number of individual test cases within each specification.
-   **Passed**: Number of test cases that passed successfully.
-   **Failed**: Number of test cases with failures or issues.
-   **Pending**: Number of pending test cases.
-   **Skipped**: Number of skipped test cases.
-   **Duration**: Total execution time for each specification.

Analyze the "Passed" and "Failed" columns to assess test outcomes.

Overall Result At the end of the output, you'll see an overall result:

-   "`All specs passed!`" indicates all tests passed.
-   If any tests failed, scroll up to the corresponding specification for details.

## Configuration

The configuration for the tests is located in cypress.json and includes the base URL for the tests.

`{ "baseUrl": "https://www.demoblaze.com/" }`

## Environment

The tests are executed with random credentials created for each test. If you want to use your own username and password credentials to run the tests:

-   Copy the cypress.env.json.example file and rename it to cypress.env.json

-   Replace the example credentials with your credentials.

## Dependencies

-   Cypress: A powerful end-to-end testing framework for web applications.
-   @faker-js/faker: A library for generating realistic fake data.

## Folder Structure

-   cypress/: Contains the test scripts and fixtures organized by categories.
    -   e2e/: End-to-end test scripts.
        -   pages/: Page Object Model classes for different pages.
        -   tests/: Test scripts using Page Object Model.
    -   support/: Additional utilities for tests.
        -   faker.js: A file containing a function to generate fake data for tests.
-   cypress.json: Configuration file for Cypress.
-   package.json: Project metadata and scripts.
-   README.md: You're currently reading it!

## Issues and Contributions

If you encounter any issues or have suggestions for improvement, please open an issue on [GitHub](https://github.com/ahuaracab/demoblaze-cypress/issues).

## Author

-   Angelo Huaraca

## License

This project is licensed under the ISC License.

For more details, please refer to the [LICENSE](LICENSE) file.