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

import Env from '../../models/env';
import ApiRoutesBooks from '../../models/routes';
import AddSelectors from '../../models/selectors/add-selectors';
import DeleteSelectors from '../../models/selectors/delete-selectors';
import HomeSelectors from '../../models/selectors/home-selectors';
import SearchSelectors from '../../models/selectors/search-selectors';
import ViewSelectors from '../../models/selectors/view-selectors';

// command to add a book

Cypress.Commands.add('addBookBefore', (bookTitle: string, bookDescription: string, bookAuthor: string, bookPublishedYear: number, bookAvailableFrom : string, bookHasEBook: boolean, bookCategoryIdValue: number) => {
  cy.request({
    // This is where you state the type of API that is being called
    method: 'POST',

    // This is where you state the url of the API request
    url: ApiRoutesBooks.AddBook,

    // The API request body goes here
    body: {
      title: bookTitle,
      description: bookDescription,
      author: bookAuthor,
      publishedYear: bookPublishedYear,
      availableFrom: bookAvailableFrom,
      hasEBook: bookHasEBook,
      bookCategoryId: bookCategoryIdValue,
    },

    // This gets the access token of the current login session
    auth: {
      bearer: '',
    },
  }).then((response) => response.body.output.id);
});

Cypress.Commands.add('addBookBeforeTitle', (bookTitle: string, bookDescription: string, bookAuthor: string, bookPublishedYear: number, bookAvailableFrom : string, bookHasEBook: boolean, bookCategoryIdValue: number) => {
  cy.request({
    // This is where you state the type of API that is being called
    method: 'POST',

    // This is where you state the url of the API request
    url: ApiRoutesBooks.AddBook,

    // The API request body goes here
    body: {
      title: bookTitle,
      description: bookDescription,
      author: bookAuthor,
      publishedYear: bookPublishedYear,
      availableFrom: bookAvailableFrom,
      hasEBook: bookHasEBook,
      bookCategoryId: bookCategoryIdValue,
    },

    // This gets the access token of the current login session
    auth: {
      bearer: '',
    },
  }).then((response) => response.body.output.title);
});

Cypress.Commands.add('addBook', () => {
// visit homepage of book website
  cy.visit(Env.homeURL);

  // click add a new book button
  cy.get(AddSelectors.AddBookButton).click();

  // add a book title
  cy.get(AddSelectors.BookTitle).type('Book Title');

  // add a description
  cy.get(AddSelectors.BookDescription).type('Book Description');

  // add an author name
  cy.get(AddSelectors.BookAuthor).type('Book Author');

  // add a published year
  cy.get(AddSelectors.YearBookPublished).type('2000');

  // add a date
  cy.get(AddSelectors.AvailableFrom).click().type('2001-06-06');

  // has e book
  cy.get(AddSelectors.EBook).click();

  // choose category
  cy.get(AddSelectors.FieldSelect).type('Fiction');
  cy.get(AddSelectors.SearchedCategory).click();

  // add the new book
  cy.get(AddSelectors.AddBookButton).click();
});

Cypress.Commands.add('deleteBook', () => {
  // visit homepage of book website
  cy.visit(Env.homeURL);

  // Click on last button
  cy.get(DeleteSelectors.LastPageButton).click();

  // delete most recent book added
  cy.get(DeleteSelectors.DeleteMostRecentBook).click();

  // click on pop up to confirm delete
  cy.get(DeleteSelectors.ConfirmButton).contains('Confirm').click();
});

Cypress.Commands.add('openFirstBook', () => {
  // visit homepage of book website
  cy.visit(Env.homeURL);

  // Click on open book button
  cy.get(ViewSelectors.OpenBookButton).click();

  // check book has been opened
  cy.get(ViewSelectors.UpdateBookScreen).should('be.visible');
});

Cypress.Commands.add('openSpecifiedBook', (bookId: string) => {
  // visit homepage of book website
  cy.visit(Env.homeURL);

  // Click on last button
  cy.get(HomeSelectors.LastPageButton).click();

  // Click on open button of book we want to edit
  cy.get(HomeSelectors.OpenBookDetails(bookId)).click();
  // cy.get(':nth-child(3) > :nth-child(5) > .table-button').click();
});

Cypress.Commands.add('deleteSpecifiedBook', (bookId: string) => {
  // visit homepage of book website
  cy.visit(Env.homeURL);

  // Click on last button
  cy.get(DeleteSelectors.LastPageButton).click();

  // delete specified book
  cy.get(DeleteSelectors.DeleteBookDetails(bookId)).click();

  // click on pop up to confirm delete
  cy.get(DeleteSelectors.ConfirmButton).contains('Confirm').click();
});

Cypress.Commands.add('deleteBookAfter', (bookId: string) => {
  cy.request({
    // This is where you state the type of API that is being called
    method: 'DELETE',

    // This is where you state the url of the API request
    url: `${ApiRoutesBooks.DeleteBook}${bookId}`,

    // This gets the access token of the current login session
    auth: {
      bearer: '',
    },
  });
});

Cypress.Commands.add('searchBook', (title: string)=> {
   // visit homepage of book website
   cy.visit(Env.homeURL);

   // enter title to search by
   cy.get(SearchSelectors.TitleSearchBox).type(title);

       // click search button
       cy.get(SearchSelectors.SearchButton).click();

       // check it is visible
    cy.get(SearchSelectors.SearchedBook).should('be.visible').contains('Author');

    // clear search
    cy.get(SearchSelectors.ClearSearch).click();

      // check search is cleared
      cy.get(SearchSelectors.TitleSearchBox).should('have.value', '');
}
)

Cypress.Commands.add('bookSearchAPI', (bookId: string) => {
  cy.request({
    // This is where you state the type of API that is being called
    method: 'GET',

    // This is where you state the url of the API request
    url: ApiRoutesBooks.GetBook+bookId,

    // The API request body goes here
   
    // This gets the access token of the current login session
    auth: {
      bearer: '',
    },
  }).then((response) => response.status);
});
