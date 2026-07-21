import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // real-time reads, slightly higher latency per request but always fresh
  // useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
