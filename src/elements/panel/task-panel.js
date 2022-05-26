import { html, css, LitElement } from 'lit'

import './case-subtype-selector'
import './task-details'

export class TaskPanel extends LitElement {
  static get styles() {
    return [css`
      :host {
        display: flex;
        flex-direction: column;
        background: #F1F1F1;
        width: 24rem;
      }

      main {
        background: white;
        margin: 0 1rem;
        padding: 1rem;
      }
    `]
  }

  static properties = {
    caseSubType: { type: Object },
  }

  constructor() {
    super()

    this.caseSubType = {}
  }
  
  _handleCaseSubTypeChange(event) {    
    this.caseSubType = event.detail.caseSubType
  }

  render() {
    return html`
      <case-subtype-selector @case-subtype-selected=${this._handleCaseSubTypeChange}></case-subtype-selector>

      ${Object.keys(this.caseSubType).length > 0
        ? html`<task-details .caseSubType=${this.caseSubType}></task-details>`
        : null
      }
    `
  }
}

window.customElements.define('task-panel', TaskPanel)
