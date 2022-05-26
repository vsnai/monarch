import { rest } from 'msw'
import { server } from '../../mocks/server'
import { caseSubtypes } from '../../mocks/handlers'

import './case-subtype-selector'

describe('case-subtype-selector', async () => {
  beforeEach(() => {
    document.body.innerHTML = '<case-subtype-selector></case-subtype-selector>'
  })

  it('connectedCallback: 200', async () => {
    const el = document.body.querySelector('case-subtype-selector')

    await el.connectedCallback()
    await el.updateComplete

    expect(el.options).toEqual(caseSubtypes)
  })

  it('connectedCallback: 404', async () => {
    server.use(rest.get('http://localhost:3000/case-subtypes', (req, res, ctx) => {
      return res(ctx.status(404))
    }))

    const el = document.body.querySelector('case-subtype-selector')

    await el.connectedCallback()
    await el.updateComplete

    expect(el.options).toEqual([])
  })

  it('_handleChange', async () => {
    const el = document.body.querySelector('case-subtype-selector')

    el.options = caseSubtypes
    el._handleChange({
      target: {
        value: caseSubtypes[1].raw
      }
    })

    expect(el.selectedCaseSubType).toEqual(caseSubtypes[1])
  })

  it('_handleSubmit', async () => {
    const el = document.body.querySelector('case-subtype-selector')

    const spy = vi.spyOn(el, 'dispatchEvent')

    el.selectedCaseSubType = caseSubtypes[0]
    el._handleSubmit()

    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][0].detail).toEqual({ caseSubType: caseSubtypes[0] })
  })
})
