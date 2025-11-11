import { createClient, type ClientConfig } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-06-01";
const token = process.env.SANITY_API_READ_TOKEN;

const useCdn = process.env.NODE_ENV === "production" && !token;

export const isSanityConfigured = Boolean(projectId && dataset);

const baseConfig: ClientConfig | null = projectId && dataset ? {
  projectId,
  dataset,
  apiVersion,
  useCdn,
  token,
} : null;

export const sanityClient = baseConfig ? createClient(baseConfig) : null;

export const getSanityClient = (overrides?: Partial<ClientConfig>) => {
  if (!baseConfig) return null;
  return createClient({ ...baseConfig, ...overrides });
};
