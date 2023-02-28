import { makeHttpRequest } from '../helpers/request-helpers'
import reservationPayload from '../fixtures/reservation-body.json'
import tokenPayload from '../fixtures/token-data.json'

let token: string
let bookingId: string

describe('Restful booker API tests', () => {
  const tokenBody = tokenPayload
  it('Get user token', () => {
    makeHttpRequest(
      'POST',
      '/auth',
      { 'Content-Type': 'application/json' },
      tokenBody
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
      { 'Content-Type': 'application/json' }, ''
    ).then(response => {
      expect(response.status).to.equal(200)
    })
  })

  it('Create a new hotel reservation', () => {
    const reservationBody = reservationPayload
    makeHttpRequest(
      'POST',
      '/booking',
      { 'Content-Type': 'application/json' },
      reservationBody
    ).then(response => {
      const body = JSON.parse(JSON.stringify(response.body))
      bookingId = body.bookingid

      expect(body.booking).has.property('firstname', reservationBody.firstname)
      expect(body.booking).has.property('lastname', reservationBody.lastname)
      expect(body.booking).has.property('totalprice', reservationBody.totalprice)
      expect(body.booking).has.property('depositpaid', reservationBody.depositpaid)
    })
  })

  it('Get booking details by reservation id', () => {
    makeHttpRequest(
      'GET',
      '/booking/' + bookingId,
      { 'Content-Type': 'application/json' }, ''
    ).then(response => {
      expect(response.status).to.equal(200)
    })
  })

  it('Delete booking', () => {
    makeHttpRequest(
      'DELETE',
      '/booking/' + bookingId,
      { 'Content-Type': 'application/json', Cookie: 'token=' + token }, ''
    ).then(response => {
      expect(response.status).to.equal(201)
    })
  })

  it('Get booking details after deletion', () => {
    makeHttpRequest(
      'GET',
      '/booking/' + bookingId,
      { 'Content-Type': 'application/json' }, ''
    ).then(response => {
      expect(response.status).to.equal(404)
    })
  })
})
