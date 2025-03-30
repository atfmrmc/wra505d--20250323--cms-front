describe('Login as author and post content, then delete it', () => {
    it('Go to login page', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Se connecter').click();
        cy.url().should('include', '/login');
        cy.visit('http://localhost:3000/login');
        cy.get(':nth-child(2) > input')
            .type('chatgpt@openai.com')
            .should('have.value', 'chatgpt@openai.com');
        cy.get(':nth-child(3) > input')
            .type('test1234')
            .should('have.value', 'test1234');
        cy.get('form > button').click()
        cy.url().should('include', '/');
        cy.get('[href="/administration/outils"]').click()
        cy.get('[href="/administration/editeur/nouveau"]').click()
        cy.get('#title')
            .type('Cypress')
            .should('have.value', 'Cypress');
        cy.get('#content')
            .type('Cypress est un outil de test de bout en bout pour les applications web.')
            .should('have.value', 'Cypress est un outil de test de bout en bout pour les applications web.');
        cy.get(':nth-child(4) > input')
            .type('Développement')
            .should('have.value', 'Développement');
        cy.get(':nth-child(4) > button').click()
        cy.get('[type="submit"]').click()
        cy.pause()
        cy.get('[href="/administration/outils"]').click()
        cy.get(':nth-child(8) > :nth-child(2) > .row > button.btn').click
    });
});
