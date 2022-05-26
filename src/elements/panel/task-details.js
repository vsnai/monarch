import { html, css, LitElement } from 'lit'

import { getNextTask, completeTask } from '../../services/task.service'
import { getEligibilityVerificationTier } from '../../services/vaas.service'

export class TaskDetails extends LitElement {
  static get styles() {
    return [css`
      :host {
        background: white;
        margin: 0 1rem;
        padding: 1rem;
      }

      main {
        display: flex;
        flex-direction: column;
      }

      button {
        margin-top: 1rem;
      }
    `]
  }

  static properties = {
    loadingState: { type: String },
    caseSubType: { type: Object },
    task: { type: Object },
  }

  constructor() {
    super()

    this.loadingState = 'default'
    this.caseSubType = {}
    this.task = {}
  }

  async willUpdate(props) {
    if (props.has('caseSubType')) {
      this.loadingState = 'default'

      await this._getNextTask()

      this.loadingState = null
    }
  }

  async _completeTask() {
    this.loadingState = 'completed'

    await completeTask()

    await this._getNextTask()

    this.loadingState = null
  }

  async _getNextTask() {
    this.task = {}

    const task = await getNextTask(this.caseSubType.raw)

    await getEligibilityVerificationTier()

    this.task = task
  }

  render() {
    if (this.loadingState === 'default') {
      return html`<div>Loading ...</div>`
    } else if (this.loadingState === 'completed') {
      return html`<div>Loading ... (Task Completed)</div>`
    } else if (this.loadingState === null) {
      return html`
        <main>
          <div>${this.task.title}</div>
          <div>${this.task.description}</div>
          <button @click=${this._completeTask}>Complete Task</button>
        </main>
      `
    }
  }
}

window.customElements.define('task-details', TaskDetails)
