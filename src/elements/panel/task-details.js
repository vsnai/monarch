import { html, css, LitElement } from 'lit'
import { format, parseISO } from 'date-fns'

import { getNextTask, completeTask, pendTask } from '../../services/task.service'
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
    isLoading: { type: String },
    caseSubType: { type: Object },
    task: { type: Object },
  }

  constructor() {
    super()

    this.isLoading = 'default'
    this.caseSubType = {}
    this.task = {}
  }

  async willUpdate(props) {
    if (props.has('caseSubType')) {
      this.isLoading = 'default'

      await this._getNextTask()

      this.isLoading = null
    }
  }

  async _completeTask() {
    this.isLoading = 'completed'

    await completeTask()

    await this._getNextTask()

    this.isLoading = null
  }

  async _pendTask() {
    this.isLoading = 'pended'

    await pendTask()

    await this._getNextTask()

    this.isLoading = null
  }

  async _getNextTask() {
    const task = await getNextTask(this.caseSubType.raw)

    if (Object.keys(task).length === 0) {
      this.task = {}

      return
    }

    // use task instead of this.task !

    await getEligibilityVerificationTier()

    // await new Promise(r => setTimeout(r, 1000))

    this.task = task
  }

  render() {
    if (this.isLoading === 'default') {
      return html`<div>Loading ...</div>`
    } else if (this.isLoading === 'completed') {
      return html`<div>Loading ... (Task Completed)</div>`
    } else if (this.isLoading === 'pended') {
      return html`<div>Loading ... (Pended Until ${format(parseISO(this.task.date), 'MM/dd/yyyy')})</div>`
    } else if (this.isLoading === null && Object.keys(this.task).length === 0) {
      return html`<div>No task found.</div>`
    } else if (this.isLoading === null) {
      return html`
        <main>
          <div>${this.task.title}</div>
          <div>${this.task.description}</div>
          <button @click=${this._completeTask}>Complete Task</button>
          <button @click=${this._pendTask}>Pend Task</button>
        </main>
      `
    }
  }
}

window.customElements.define('task-details', TaskDetails)
