import { server, rest, caseSubtypes } from '../../../setupTests'

import './case-subtype-selector'

describe('case-subtype-selector', () => {
  let el

  beforeEach(() => {
    document.body.innerHTML = '<case-subtype-selector></case-subtype-selector>'

    el = document.body.querySelector('case-subtype-selector')
  })

  it('connectedCallback: 200', async () => {
    await el.connectedCallback()

    expect(el.options).toEqual(caseSubtypes)
  })

  it('connectedCallback: 404', async () => {
    server.use(rest.get('http://localhost:3000/case-subtypes', (req, res, ctx) => {
      return res(ctx.status(404))
    }))

    await el.connectedCallback()

    expect(el.options).toEqual([])
  })

  it('_handleChange', () => {
    el.options = caseSubtypes
    el._handleChange({
      target: {
        value: caseSubtypes[1].raw
      }
    })

    expect(el.selectedCaseSubType).toEqual(caseSubtypes[1])
  })

  it('_handleSubmit', () => {
    const spy = vi.spyOn(el, 'dispatchEvent')

    el.selectedCaseSubType = caseSubtypes[0]
    el._handleSubmit()

    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][0].detail).toEqual({ caseSubType: caseSubtypes[0] })
  })
})
