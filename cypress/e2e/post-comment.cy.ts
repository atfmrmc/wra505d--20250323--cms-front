describe('Login as user and post comment', () => {
    it('Go to login page', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Se connecter').click();
        cy.url().should('include', '/login');
    });
    it('Login as user, comment, and logout', () => {
        cy.visit('http://localhost:3000/login');
        cy.get(':nth-child(2) > input')
            .type('jesuisunhackeretjaimehacker@hotmail.bash')
            .should('have.value', 'jesuisunhackeretjaimehacker@hotmail.bash');
        cy.get(':nth-child(3) > input')
            .type('test1234')
            .should('have.value', 'test1234');
        cy.get('form > button').click()
        cy.url().should('include', '/');
        cy.get('[href="/outils/excel"] > .tool--section--cover').click();
        cy.url().should('include', '/outils/excel');
        cy.get('#comment')
            .type("Je détéste excel, c'est pour les vieux")
            .should("have.value", "Je détéste excel, c'est pour les vieux");
        cy.get('.tool--comments--form > .btn').click()
        cy.get('[href="/options/profile"]').click()
        cy.get('button.btn').click()
        cy.url().should('include', '/login');
    });
})