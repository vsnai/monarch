import { html, css, LitElement } from 'lit'

import './panel/task-panel'

export class MonarchApp extends LitElement {
  static get styles() {
    return [css`
      :host {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        height: 100vh;
      }

      nav {
        display: flex;
        flex-direction: row-reverse;
      }

      section {
        display: flex;
        height: 100%;
      }

      main {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `]
  }

  static properties = {
    isTaskPanelOpen: { type: Boolean }
  }

  constructor() {
    super()

    this.isTaskPanelOpen = true
  }

  _toggleTaskPanel() {
    this.isTaskPanelOpen = ! this.isTaskPanelOpen
  }

  render() {
    return html`
      <nav>
        <button @click=${this._toggleTaskPanel}>Toggle Task Panel</button>
      </nav>
      
      <section>
        <main>Search</main>

        ${this.isTaskPanelOpen
          ? html`<task-panel>Task Panel</task-panel>`
          : null
        }
      </section>
    `
  }
}

window.customElements.define('monarch-app', MonarchApp)
