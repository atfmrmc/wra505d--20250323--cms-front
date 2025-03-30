describe('Basic User Experience', () => {
    it('Should open login page', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Se connecter').click();
        cy.url().should('include', '/login');
    });
    it('Should register a user', () => {
        cy.visit('http://localhost:3000/login');
        cy.contains('Créer un compte').click();
        cy.url().should('include', '/register');
        cy.get(':nth-child(2) > input')
            .type('cypress@cypress.com')
            .should('have.value', 'cypress@cypress.com');
        cy.get(':nth-child(3) > input')
            .type('test1234')
            .should('have.value', 'test1234');
        cy.get(':nth-child(4) > input')
            .type('test1234')
            .should('have.value', 'test1234');
        cy.get(':nth-child(5) > input')
            .type('Cypress')
            .should('have.value', 'Cypress');
        cy.get(':nth-child(6) > input')
            .type('Grosmollard')
            .should('have.value', 'Grosmollard');
        cy.get('form > button').click()
        cy.url().should('include', '/');
    });
});

