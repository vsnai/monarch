import { origin } from '../env'

export async function getEligibilityVerificationTier() {
  const res = await fetch(origin + '/eligibility-verification-tier')

  return await res.json()
}
