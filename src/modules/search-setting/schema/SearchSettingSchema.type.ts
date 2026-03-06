import * as z from "zod";
import type { searchSettingListItemScheme, searchSettingListScheme, searchSettingParamsScheme, searchSettingRequestScheme, searchSettingResponseScheme } from "./SearchSettingSchema";

export type searchSettingRequest = z.infer<typeof searchSettingRequestScheme>;

export type searchSettingParams = z.infer<typeof searchSettingParamsScheme>;

export type searchSettingListItem = z.infer<typeof searchSettingListItemScheme>;

export type searchSettingList = z.infer<typeof searchSettingListScheme>;

export type searchSettingResponse = z.infer<typeof searchSettingResponseScheme>;