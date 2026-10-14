import NextLink from "next/link";
import type { ComponentProps } from "react";
// Portfolio pages have many links; avoid downloading every linked page just
// because its card entered the viewport. Actual clicks keep native Next routing.
export default function Link(props: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={false} {...props} />;
}

