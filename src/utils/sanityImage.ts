import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

import { isSanityConfigured } from "@/utils/sanityClient";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const builder = projectId && dataset
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export const urlForImage = (source: Image | undefined) => {
  if (!builder || !source) return null;
  return builder.image(source);
};

export const sanityImageEnabled = isSanityConfigured;
