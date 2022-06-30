import { origin } from '../env'

export async function getCaseSubTypes() {  
  const res = await fetch(origin + '/case-subtypes')

  if (res.ok) {
    return await res.json()
  }

  return null
}
