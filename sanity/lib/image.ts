import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/** Build an optimized, transformable URL from a Sanity image reference. */
export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}
