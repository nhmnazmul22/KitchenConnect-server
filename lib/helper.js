export const createError = (message, statusCode) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

export const handleQuery = async (
  req,
  collection,
  filterFields = [],
  defaultQuery = {}
) => {
  const {
    limit = 0,
    skip = 0,
    sort = "size",
    order = "desc",
    search = "",
  } = req.query;

  const sortOption = {};
  sortOption[sort || "size"] = order === "asc" ? 1 : -1;

  let query = defaultQuery || {};
  if (search && filterFields.length > 0) {
    query.$or = filterFields.map((field) => ({
      [field]: { $regex: search, $options: "i" },
    }));
  }

  const cursor = collection
    .find(query)
    .sort(sortOption)
    .limit(Number(limit))
    .skip(Number(skip));
  const result = await cursor.toArray();
  console.log(result);
  await cursor.close();

  return result;
};
