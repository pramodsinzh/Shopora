import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  useCdn: false, // real-time reads, slightly higher latency per request but always fresh
})
