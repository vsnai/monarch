export async function getEligibilityVerificationTier() {
  const res = await fetch('http://localhost:3000/eligibility-verification-tier')

  return await res.json()
}
