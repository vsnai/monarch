export async function getCaseSubTypes() {  
  const res = await fetch('http://localhost:3000/case-subtypes')

  if (res.ok) {
    return await res.json()
  }

  return null
}
