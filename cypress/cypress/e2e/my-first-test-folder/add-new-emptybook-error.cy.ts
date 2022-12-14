// wont work as no book data is included
import Env from '../../../models/env';
import ApiRoutesBooks from '../../../models/routes';
import AddSelectors from '../../../models/selectors/add-selectors';

describe('As a user I cannot add a new book with no information', () => {
  it('Checks a user cannot add a new book with no information', () => {
    // visit homepage of book website
    cy.visit(Env.homeURL);

    // click add a new book button
    cy.get(AddSelectors.AddBookButton).click();

    // Make sure the request to add the book is intercepted
    cy.intercept(ApiRoutesBooks.AddBook).as('addBook');

    // add the new book
    cy.url().should('contain', '.net/book').then(() => {
    cy.get(AddSelectors.AddBookButton).click();

    // Check that the request to add the book returns a 400 status code
    cy.wait('@addBook').then((intercept) => {
      const { statusCode } = intercept.response;
      expect(statusCode).to.equal(400);
    });

    // check validation error appears
    cy.get(AddSelectors.ValidationError).contains('Title is required');
    cy.get(AddSelectors.ValidationError).contains('Description is required');
    cy.get(AddSelectors.ValidationError).contains('Author is required');
    cy.get(AddSelectors.ValidationError).contains('Published Year is required');
    cy.get(AddSelectors.ValidationError).contains('Available From is required');
    cy.get(AddSelectors.ValidationError).contains('Book Category is required');
  });
  });
});