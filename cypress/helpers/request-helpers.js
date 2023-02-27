var baseUrl = "https://restful-booker.herokuapp.com"

export function makeHttpRequest(method, path, headers, body) {
    return cy.request({
      method: method,
      url: baseUrl + path,
      headers: headers,
      body: body,
      failOnStatusCode: false
    });
  }