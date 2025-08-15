import type { Category } from "../../masters/categories";
import type { Prefecture } from "../../masters/prefectures";
import type { SystemName } from "../../masters/systemNames";

export type SlugInfo =
  | { type: "prefecture"; data: Prefecture }
  | { type: "category"; data: Category }
  | { type: "system"; data: SystemName };
