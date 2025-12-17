import { ObjectId } from "mongodb";
import { createError } from "../../lib/helper.js";
import { getDateTime } from "../../lib/utils.js";
import { collections } from "../../config/db.js";

export const getRoleRequests = async (req) => {
  const roleRequestsColl = await collections.roleRequests();
  const cursor = roleRequestsColl.find({}).sort({ requestTime: -1 });
  const result = await cursor.toArray();
  await cursor.close();
  if (result.length === 0) {
    throw createError("Role Requests Not found", 404);
  }
  return result;
};

export const createRoleRequestService = async (req) => {
  const body = req.body;
  const authInfo = req.headers.userInfo;
  const roleRequestsColl = await collections.roleRequests();

  if (!body.requestType || !body.userName) {
    throw createError("Request type and user name is required", 422);
  }

  const requestInfo = {
    userName: body.userName,
    userEmail: body.userEmail || authInfo.email,
    requestType: body.requestType,
    requestStatus: "pending",
    requestTime: getDateTime(),
  };
  const result = await roleRequestsColl.insertOne(requestInfo);
  return result;
};

export const updateRoleRequestService = async (req) => {
  const body = req.body;
  const { requestId } = req.params;

  if (!body.requestStatus) {
    throw createError(
      "Request Status is required. (pending, approved, rejected)",
      422
    );
  }

  const roleRequestsColl = await collections.roleRequests();
  const query = { _id: new ObjectId(requestId) };
  const existRequest = await roleRequestsColl.findOne(query);

  if (!existRequest) {
    throw createError("Request not found", 404);
  }

  const updateDocument = {
    $set: {
      requestStatus: body.requestStatus,
    },
  };

  const result = await roleRequestsColl.updateOne(query, updateDocument);

  if (result && body.requestStatus === "approved") {
    const usersColl = await collections.users();
    const query = { email: existRequest.userEmail };
    const updatedDoc = {
      role: existRequest.requestType,
    };
    if (existRequest.requestType === "chef")
      updatedDoc.chefId = `chef-${Math.floor(1000 + Math.random() * 8999)}`;

    await usersColl.updateOne(query, { $set: updatedDoc });
  }
  return result;
};
