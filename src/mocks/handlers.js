import { rest } from 'msw'

export const caseSubtypes = [
  { raw: "post_a_payment", display: "Post a Payment" },
  { raw: "fee_waivers", display: "Fee Waivers" },
  { raw: "other", display: "Other" },
]

export const nextTask = {
  id: 4,
  title: "Adipisicing Est Reprehenderit",
  description: "Occaecat amet cillum non cupidatat cupidatat occaecat sint."
}

export const handlers = [
  rest.get('http://localhost:3000/case-subtypes', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(500),
      ctx.json(caseSubtypes)
    )
  }),

  rest.get('http://localhost:3000/retrieve-next-task', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(500),
      ctx.json(nextTask)
    )
  }),

  rest.get('http://localhost:3000/complete-task', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(500),
      ctx.json({})
    )
  }),

  rest.get('http://localhost:3000/eligibility-verification-tier', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(500),
      ctx.json({})
    )
  }),

  // ...
]

export { rest }
