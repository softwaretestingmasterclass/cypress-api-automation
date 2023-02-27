import { makeHttpRequest } from '../helpers/request-helpers'

let token
let bookingId
const reservationPayload = require('../fixtures/reservation-body.json')
const tokenPayload = require('../fixtures/token-data.json')

describe('Restful booker API tests', () => {
  it('Get user token', () => {
    makeHttpRequest(
      'POST',
      '/auth',
      { 'Content-Type': 'application/json' },
      tokenPayload
    ).then(response => {
      expect(response.status).to.equal(200)
      const body = JSON.parse(JSON.stringify(response.body))
      token = body.token
    })
  })

  it('List all bookings for the hotel', () => {
    makeHttpRequest(
      'GET',
      '/booking',
      { 'Content-Type': 'application/json' }
    ).then(response => {
      expect(response.status).to.equal(200)
    })
  })

  it('Create a new hotel reservation', () => {
    makeHttpRequest(
      'POST',
      '/booking',
      { 'Content-Type': 'application/json' },
      reservationPayload
    ).then(response => {
      const body = JSON.parse(JSON.stringify(response.body))
      bookingId = body.bookingid

      expect(body.booking).has.property('firstname', reservationPayload.firstname)
      expect(body.booking).has.property('lastname', reservationPayload.lastname)
      expect(body.booking).has.property('totalprice', reservationPayload.totalprice)
      expect(body.booking).has.property('depositpaid', reservationPayload.depositpaid)
    })
  })

  it('Get booking details by reservation id', () => {
    makeHttpRequest(
      'GET',
      '/booking/' + bookingId,
      { 'Content-Type': 'application/json' }
    ).then(response => {
      expect(response.status).to.equal(200)
    })
  })

  it('Delete booking', () => {
    makeHttpRequest(
      'DELETE',
      '/booking/' + bookingId,
      { 'Content-Type': 'application/json', Cookie: 'token=' + token }
    ).then(response => {
      expect(response.status).to.equal(201)
    })
  })

  it('Get booking details after deletion', () => {
    makeHttpRequest(
      'GET',
      '/booking/' + bookingId,
      { 'Content-Type': 'application/json' }
    ).then(response => {
      expect(response.status).to.equal(404)
    })
  })
})
