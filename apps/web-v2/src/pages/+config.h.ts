import type { Config } from "vike/types";

import vikeReact from "vike-react";

import logoUrl from "../assets/favicons/favicon.svg";
import { HeadDefault } from "../layouts/HeadDefault";
import { LayoutDefault } from "../layouts/LayoutDefault";

export default {
  Layout: LayoutDefault,
  Head: HeadDefault,
  title: "SENSE WEB",
  description: "",
  favicon: logoUrl,
  extends: vikeReact,
} satisfies Config;
