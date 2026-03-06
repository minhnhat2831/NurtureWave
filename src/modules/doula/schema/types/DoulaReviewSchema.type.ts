import * as z from "zod";
import type { doulaOverReviewListItemSchema, doulaOverReviewParamsSchema, doulaOverReviewResponseSchema, doulaReviewListItemSchema, doulaReviewListSchema, doulaReviewParamsSchema } from "../schema/DoulaReviewSchema";

export type doulaReviewParams = z.infer<typeof doulaReviewParamsSchema>;

export type doulaReviewListItem = z.infer<typeof doulaReviewListItemSchema>

export type doulaReviewList = z.infer<typeof doulaReviewListSchema>

export type doulaOverReviewParams = z.infer<typeof doulaOverReviewParamsSchema>;

export type doulaOverReviewListItem = z.infer<typeof doulaOverReviewListItemSchema>;

export type doulaOverReviewResponse = z.infer<typeof doulaOverReviewResponseSchema>;
