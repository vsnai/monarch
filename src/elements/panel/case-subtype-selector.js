import { html, css, LitElement } from 'lit'

import { getCaseSubTypes } from '../../services/case-subtype.service'

export class CaseSubTypeSelector extends LitElement {
  static get styles() {
    return [css`
      :host {
        display: flex;
        flex-direction: column;
        background: white;
        margin: 1rem;
        padding: 1rem;
      }

      select {
        margin-bottom: 1rem;
      }
    `]
  }

  static properties = {
    options: { type: Array },
    selectedCaseSubType: { type: Object },
  }

  constructor() {
    super()

    this.options = []
    this.selectedCaseSubType = {}
  }

  async connectedCallback() {
    super.connectedCallback()

    const caseSubTypes = await getCaseSubTypes()

    if (! caseSubTypes) {
      return;
    }

    this.options = caseSubTypes
  }

  _handleChange(event) {
    this.selectedCaseSubType = this.options.find(({ raw }) => raw === event.target.value)
  }

  _handleSubmit() {
    this.dispatchEvent(new CustomEvent('case-subtype-selected', {
      detail: { caseSubType: this.selectedCaseSubType }
    }))
  }

  render() {
    return html`
      ${this.options.length === 0
        ? html`<div>Loading ...</div>`
        : html`
          <select @change=${this._handleChange}>
            <option disabled selected>Select Work Queue</option>
            ${this.options.map(({ raw, display }) => html`<option value=${raw}>${display}</option>`)}
          </select>

          <button @click=${this._handleSubmit}>Submit</button>
        `
      }
    `
  }
}

window.customElements.define('case-subtype-selector', CaseSubTypeSelector)
