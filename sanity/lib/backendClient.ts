import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "../env"

export const backendClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,  // set to false if statically genarating pages, using ISR or revalidation
    token: process.env.SANITY_API_TOKEN,
})