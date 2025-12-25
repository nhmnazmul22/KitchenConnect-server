import { ObjectId } from "mongodb";
import { createError, handleQuery } from "../../lib/helper.js";
import { getDateTime } from "../../lib/utils.js";
import { collections } from "../../config/db.js";

export const getUsers = async (req) => {
  const usersColl = await collections.users();
  const result = await handleQuery(req, usersColl, ["name", "address", "role"]);
  if (result.length === 0) {
    throw createError("Users Not found", 404);
  }
  const total = await usersColl.count();
  return {
    users: result,
    total,
  };
};

export const createUserService = async (req) => {
  const body = req.body;
  const usersColl = await collections.users();

  if (!body.email) {
    throw createError("User email is required", 422);
  }

  const existUser = await usersColl.findOne({ email: body.email });

  if (existUser) {
    throw createError("User Already exists", 422);
  }

  const userInfo = {
    name: body.name,
    email: body.email,
    profileImage: body.profileImage || "",
    address: body.address || "",
    role: "user",
    status: "active",
    chefId: null,
    createdAt: getDateTime(),
  };
  const result = await usersColl.insertOne(userInfo);
  return result;
};

export const updateUserService = async (req) => {
  const body = req.body;
  const { userId } = req.params;
  const usersColl = await collections.users();

  if (body.chefId) {
    throw createError("Unprocessable Entity", 422);
  }

  const query = { _id: new ObjectId(userId) };
  const existUser = await usersColl.findOne(query);

  if (!existUser) {
    throw createError("User not found", 404);
  }

  const updateDocument = {
    $set: {
      name: body.name || existUser.name,
      email: body.email || existUser.email,
      profileImage: body.profileImage || existUser.profileImage,
      address: body.address || existUser.address,
      role: body.role || existUser.role,
      status: body.status || existUser.status,
    },
  };

  const result = await usersColl.updateOne(query, updateDocument);
  return result;
};

export const getProfileService = async (req) => {
  const authInfo = req.headers.userInfo;
  const usersColl = await collections.users();

  const query = { _id: new ObjectId(authInfo.userId) };
  const profile = await usersColl.findOne(query);
  return profile;
};

export const updateProfileService = async (req) => {
  const body = req.body;
  const authInfo = req.headers.userInfo;
  const usersColl = await collections.users();

  if (body.role || body.status || body.chefId) {
    throw createError("Unprocessable Entity", 422);
  }

  const query = { _id: new ObjectId(authInfo.userId) };
  const existUser = await usersColl.findOne(query);

  if (!existUser) {
    throw createError("User not found", 404);
  }

  const updateDocument = {
    $set: {
      name: body.name || existUser.name,
      email: body.email || existUser.email,
      profileImage: body.profileImage || existUser.profileImage,
      address: body.address || existUser.address,
    },
  };

  const result = await usersColl.updateOne(query, updateDocument);
  return result;
};
