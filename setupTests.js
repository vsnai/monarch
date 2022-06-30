import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { fetch, Headers, Request, Response } from 'cross-fetch'

export const caseSubtypes = [
  { raw: "post_a_payment", display: "Post a Payment" },
  { raw: "fee_waivers", display: "Fee Waivers" },
  { raw: "other", display: "Other" },
]

export const nextTask = {
  id: 4,
  title: "Adipisicing Est Reprehenderit",
  description: "Occaecat amet cillum non cupidatat cupidatat occaecat sint.",
  date: "2022-08-05T08:00:00"
}

export const handlers = [
  rest.get('http://localhost:3000/case-subtypes', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(10),
      ctx.json(caseSubtypes)
    )
  }),

  rest.get('http://localhost:3000/retrieve-next-task', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(10),
      ctx.json(nextTask)
    )
  }),

  rest.get('http://localhost:3000/complete-task', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(10),
      ctx.json({})
    )
  }),

  rest.get('http://localhost:3000/pend-task', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(10),
      ctx.json({})
    )
  }),

  rest.get('http://localhost:3000/eligibility-verification-tier', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(10),
      ctx.json({})
    )
  }),

  // ...
]

const server = setupServer(...handlers)

export { rest, server }

// https://github.com/reduxjs/redux-toolkit/issues/1271#issuecomment-877526770
global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

afterAll(() => server.close())

afterEach(() => server.resetHandlers())
