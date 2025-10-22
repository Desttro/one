import { PushProcessor } from "@rocicorp/zero/pg";
import { zeroPostgresJS } from "@rocicorp/zero/server/adapters/postgresjs";
import type { Context } from "hono";
import postgres from "postgres";
import { must } from "../shared/must";
import { createMutators } from "../shared/mutators";
import { schema } from "../shared/schema";
import { getUserID } from "./login";

export async function handleMutate(c: Context) {
	const processor = new PushProcessor(
		zeroPostgresJS(
			schema,
			postgres(
				must(c.env.ZERO_UPSTREAM_DB, "required env var ZERO_UPSTREAM_DB"),
			),
		),
	);
	const userID = await getUserID(c);
	return await processor.process(createMutators(userID), c.req.raw);
}
