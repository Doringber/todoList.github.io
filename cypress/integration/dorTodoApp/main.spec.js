/// <reference types="cypress" />

context('Enter to Main Page', () => {
    beforeEach(() => {
      cy.visit('https://doringber.github.io/todoList.github.io/ ')
    })

    it('Type new Todo list', () => {
        cy.get('.todo-input')
          .type('fake@email.com').should('have.value', 'fake@email.com')

        cy.get('.todo-button').click()

        cy.get('.todo-input')
        .type('fake1@email.com').should('have.value', 'fake1@email.com')

      cy.get('.todo-button').click()
      })
    
    it('iterate over an array of elements', () => {
      cy.get('.todo-container>ul')
        .each(($el, index, $list) => {
          console.log($el, index, $list)
        })
    })
  
    it('Check when the list is empty', () => {
      cy.get('.todo-container>ul')
        .its('length')
        .should('be.gt', 0)
    })
  
    it('invokes a callback function with the current subject', () => {
    cy.get('.todo-input')
    .type('fake@email.com').should('have.value', 'fake@email.com')
    cy.get('.todo-button').click()

    cy.get('.todo-container>ul')
        .then(($lis) => {
        expect($lis, '1 items').to.have.length(1)
        expect($lis.eq(0), 'first item').to.contain('fake@email.com')
        })
    })
 })
  
  