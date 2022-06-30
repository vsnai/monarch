import { origin } from '../env'

export async function getNextTask(caseSubType) {
  const res = await fetch(origin + '/retrieve-next-task')

  return await res.json()
}

export async function completeTask(caseSubType) {
  const res = await fetch(origin + '/complete-task')

  return await res.json()
}

export async function pendTask(caseSubType) {
  const res = await fetch(origin + '/pend-task')

  return await res.json()
}
