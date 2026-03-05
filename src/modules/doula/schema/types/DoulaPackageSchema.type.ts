import z from "zod";
import type { caresListItemSchema, doulaPackageDetailResponseSchema, doulaPackageDetailSchema, doulaPackageListItemSchema, doulaPackageListSchema, doulaPackageParamsSchema } from "../schema/DoulaPackageSchema";

export type doulaPackageParams = z.infer<typeof doulaPackageParamsSchema>

export type doulaPackageListItem = z.infer<typeof doulaPackageListItemSchema>

export type doulaPackageList = z.infer<typeof doulaPackageListSchema>

export type caresListItem = z.infer<typeof caresListItemSchema>

export type doulaPackageDetail = z.infer<typeof doulaPackageDetailSchema>

export type doulaPackageDetailResponse = z.infer<typeof doulaPackageDetailResponseSchema>
