import {
  type AnyColumn,
  ColumnBaseConfig,
  ColumnsSelection,
  GetColumnData,
  type SQL,
  and,
  inArray,
  is,
  isNotNull,
  sql,
} from "drizzle-orm";
import {
  PgColumn,
  PgTimestampString,
  type SelectedFields,
  SubqueryWithSelection,
  WithSubqueryWithSelection,
} from "drizzle-orm/pg-core";
import { SelectResultFields } from "drizzle-orm/query-builders/select.types";

export function takeFirst<T>(items: T[]) {
  return items.at(0);
}

export function takeFirstOrThrow<T>(items: T[]) {
  const first = takeFirst(items);

  if (!first) {
    throw new Error("First item not found");
  }

  return first;
}

export function distinct<Column extends AnyColumn>(column: Column) {
  return sql<Column["_"]["data"]>`distinct(${column})`;
}

export function distinctOn<Column extends AnyColumn>(column: Column) {
  return sql<Column["_"]["data"]>`distinct on (${column}) ${column}`;
}

export function max<Column extends AnyColumn>(column: Column) {
  return sql<Column["_"]["data"]>`max(${column})`;
}

export function count<Column extends AnyColumn>(column: Column) {
  return sql<number>`cast(count(${column}) as integer)`;
}

/**
 * Coalesce a value to a default value if the value is null
 * Ex default array: themes: coalesce(pubThemeListQuery.themes, sql`'[]'`)
 * Ex default number: votesCount: coalesce(PubPollAnswersQuery.count, sql`0`)
 */
export function coalesce<T>(
  value: SQL.Aliased<T> | SQL<T> | AnyColumn,
  defaultValue: SQL
) {
  return sql<T>`coalesce(${value}, ${defaultValue})`;
}

type Unit = "minutes" | "minute";
type Operator = "+" | "-";

export function now(interval?: `${Operator} interval ${number} ${Unit}`) {
  return sql<string>`now() ${interval || ""}`;
}

//
// example where table.data type is { id: string; type: 'document' | 'image' }
// eq(eqJsonb(table.data, {
//                              id: 'some value',
//                              type: "document",
//                          }))
export function eqJsonb<T extends PgColumn>(
  column: T,
  value: Partial<GetColumnData<T, "raw">>
) {
  return sql`${column} @> ${value}`;
}

// Select a JSONB field
// example:
// const results = await db
//            .select({
//                myField: pickJsonbField<
//                    MyDataType, // the one you use for jsonb("data").$type<MyDataType>().notNull(),
//                    "fieldKey" // one of MyDataType
//                >(table.data, "fieldKey"),
//            })
export function pickJsonbField<
  U,
  K extends keyof U,
  T extends PgColumn = PgColumn
>(column: T, field: K, cast?: "uuid") {
  return sql<U[K]>`((${column}->${field})${
    cast ? sql.raw(`::${cast}`) : undefined
  })`;
}

// .where(inJsonArray(subQueryWithJsonAggregate.anArray, "keyName", [valueFromParams]))
export function inJsonArray<T extends SQL.Aliased<unknown[]>>(
  jsonArray: T,
  key: keyof T["_"]["type"][number],
  values: string[]
) {
  const element = sql.raw(`${String(key)}_array_element`);

  return sql`EXISTS (
		SELECT 1
		FROM jsonb_array_elements(${jsonArray}) AS ${element}
		WHERE ${inArray(sql`${element}->>${key}`, values)}
	  )`;
}

// Like getTableColumns but for sub queries https://orm.drizzle.team/docs/goodies#get-typed-table-columns
export function getSubQueryColumns<
  S extends ColumnsSelection,
  A extends string
>(subQuery: SubqueryWithSelection<S, A> | WithSubqueryWithSelection<S, A>) {
  const { selection } = subQuery as unknown as {
    selection: (typeof subQuery)["_"]["selectedFields"];
  };

  return selection;
}

export type InferSubQueryModel<T extends SQL.Aliased> = T["_"]["type"];

type PgColumnJson<T> = PgColumn<ColumnBaseConfig<"json", string> & { data: T }>;
export function isNotNullJsonb<T>(
  column: PgColumnJson<T>,
  key: keyof T
): SQL | undefined {
  return and(isNotNull(column), isNotNull(sql`${column}->>${key}`));
}

export function jsonBuildObject<T extends SelectedFields>(shape: T) {
  const chunks: SQL[] = [];

  Object.entries(shape).forEach(([key, value]) => {
    if (chunks.length > 0) {
      chunks.push(sql.raw(`,`));
    }

    chunks.push(sql.raw(`'${key}',`));

    // json_build_object formats to ISO 8601 ...
    if (is(value, PgTimestampString)) {
      chunks.push(sql`timezone('UTC', ${value})`);
    } else {
      chunks.push(sql`${value}`);
    }
  });

  return sql<SelectResultFields<T>>`json_build_object(${sql.join(chunks)})`;
}

export function jsonAggBuildObject<
  T extends SelectedFields,
  Column extends AnyColumn,
  TNullable extends T
>(
  shape: T,
  options?: {
    orderBy?: { colName: Column; direction: "ASC" | "DESC" };
    nullable?: Partial<TNullable>;
  }
) {
  const nullableValues = Object.values(options?.nullable ?? {});

  return sql<SelectResultFields<T>[]>`coalesce(
    json_agg(${jsonBuildObject(shape)}
    ${
      options?.orderBy
        ? sql`ORDER BY ${options.orderBy.colName} ${sql.raw(
            options.orderBy.direction
          )}`
        : undefined
    })
    FILTER (WHERE ${and(
      sql.join(
        Object.values(shape)
          .filter((value) => !nullableValues.includes(value))
          .map((value) => sql`${sql`${value}`} IS NOT NULL`),
        sql` AND `
      )
    )})
    ,'${sql`[]`}')`;
}

// with filter non-null + distinct
export function jsonAgg<Column extends AnyColumn>(column: Column) {
  return coalesce<GetColumnData<Column, "raw">[]>(
    sql`json_agg(distinct ${sql`${column}`}) filter (where ${column} is not null)`,
    sql`'[]'`
  );
}

// // generalist
// export function jsonAgg<Column extends AnyColumn>(column: Column) {
//   return coalesce<GetColumnData<Column, "raw">[]>(
//     sql`json_agg(${sql`${column}`})`,
//     sql`'[]'`
//   );
// }

// Sometimes you want an array and not a json
export function arrayAgg<Column extends AnyColumn>(column: Column) {
  return sql<
    GetColumnData<Column, "raw">[]
  >`array_agg(distinct ${sql`${column}`}) filter (where ${column} is not null)`;
}

// To be completed
type PGCastTypes = "uuid" | "uuid[]" | "text" | "text[]";

type PGArrayCastTypes = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [P in PGCastTypes]: P extends `${infer _T}[]` ? P : never;
}[PGCastTypes];

// Transform an array of values (from a function params) into a postgres array
export function toArray<Values>(values: Values[], cast: PGArrayCastTypes) {
  const chunks: SQL[] = [];

  values.forEach((column) => {
    if (chunks.length > 0) {
      chunks.push(sql.raw(`,`));
    }

    chunks.push(sql`${column}`);
  });

  return sql`array[${sql.join(chunks)}]::${sql.raw(cast)}`;
}
