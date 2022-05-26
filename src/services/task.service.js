export async function getNextTask(caseSubType) {
  const res = await fetch('http://localhost:3000/retrieve-next-task')

  return await res.json()
}

export async function completeTask(caseSubType) {
  const res = await fetch('http://localhost:3000/complete-task')

  return await res.json()
}
