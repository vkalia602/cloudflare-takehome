# Overview

In this assignment you will build a prototype web service to compute account balances given a transaction ledger.

An account balance represents the amount of money in a specific account at a given point in time. It takes into account both deposits (credits) and withdrawals (debits) made to the account. If the credits exceed the debits, the account has a positive balance, indicating surplus funds. Conversely, if the debits exceed the credits, the account has a negative balance, suggesting a deficit.

Users should be able to send a request with an `Account ID` and a `date` as input, and receive the balance as of that date as output. Additionally, users should be able to ask for balances as of named dates such as "Q1" or "Q3", corresponding to the end dates for those periods. Beyond that, the design of the API or any additional routes you think might be useful is up to you.


# Instructions
1. Clone (**please, don't fork!**) this repository and create a new branch for your development work
1. Create your implementation following the [Specification](#specification) below
1. Add instructions on how to run your implementation to the [Getting Started](#getting-started) section.
1. In the [follow-up questions](#follow-up-questions) section below, respond inline to each of the questions.
1. Commit your implementation and answers to a new private repo in your personal GH and give `@avyfain` access to the repo.

**Guidelines:**
- Do not spend longer than three hours on your implementation, a perfect implementation is not required or expected. Please move on to the [follow-up questions](#follow-up-questions) after that.
- You may use any libraries or frameworks of your choosing. We use Python and JS internally today, however we'd prefer you use whatever language you feel strongest in, rather than use this exercise as an opportunity to learn a new language.
- The input data are small enough that you can hold their contents in memory. Whether you put them in a database or a different data structure is up to you. We care more about the data layout or schemas you choose and your ability to explain your decisions than about the runtime of your prototype.
- You can assume the data is static and will not change while your service is running.
- Ask questions if you have them. The data model is intentionally vague, so you will need to make some assumptions. Document your assumptions in your code and in the follow-up questions.


# Specification

You will build the following functionality:
  - [ ] A web server that can load transaction and account data from the provided files
  - [ ] Account balances are correctly calculated as the sum of all transaction amounts prior to a given date.
  - [ ] A route that accepts an `Account ID` and a `date` as input, and returns the account balance as of that date.
  - [ ] A route that accepts an `Account ID` and a `named date` as input, and returns the account balance as of that date.

# Getting Started

This is a placeholder for instructions on how to run your implementation.

# Follow-Up Questions

  1. Describe which task you found most difficult in the implementation, and why.
  1. What lead you to choose these libraries or frameworks you used in your implementation?
  1. If there were no time restrictions for this exercise, what improvements would you make in the following areas:
      - Implementation
      - Persistence and data storage
      - Additional endpoints
  1. If you were asked to refactor this exercise so to support data with multiple currencies, what changes would you make?
  1. Assume the data grows into millions of rows, and can no longer be held in memory. Give a high level overview of how you would refactor and update your implementation to account for this level of volume.

# Evaluation Criteria

You will be evaluated out of a total of 50 points based on the following criteria.

  - Learning Exercise (30 points total)
    - **Functionality (20 points)**: is the requested functionality implemented as described without bugs?
    - **Code Quality (10 points)**: is the code well structured and easily read? Are the chosen data structures performant considering tradeoffs?
    - **Bonus (3 maximum)**: bonus points are awarded for anything that goes above and beyond the items in the specification. For example, additional endpoints, pre-computed aggregates or clever schema design.
  - Follow Up Questions (20 points total)
    - Question 1 (2 points)
    - Question 2 (3 points)
    - Question 3 (5 points)
    - Question 4 (5 points)
    - Question 5 (5 points)
