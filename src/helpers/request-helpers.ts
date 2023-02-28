const baseUrl = 'https://restful-booker.herokuapp.com'

export function makeHttpRequest (method: string, path: string, headers: any, body: any): Cypress.Chainable {
  return cy.request({
    method,
    url: baseUrl + path,
    headers,
    body,
    failOnStatusCode: false
  })
}
