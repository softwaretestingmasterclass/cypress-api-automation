const baseUrl = 'https://restful-booker.herokuapp.com'

export function makeHttpRequest (method, path, headers, body) {
  return cy.request({
    method,
    url: baseUrl + path,
    headers,
    body,
    failOnStatusCode: false
  })
}
