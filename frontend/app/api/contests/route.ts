import { NextResponse } from "next/server";
import { withAuth, type AuthenticatedRequest } from "@/lib/middleware";
import client from "@/lib/mongo";

async function postHandler(request: AuthenticatedRequest) {
  const db = client.db(`${process.env.DATABASE}`);
  try {
    const { user } = request;

    const data = await request.json();

    const { userID } = user;
    const business = await db.collection("business").findOne({ userID });

    await db.collection("contests").insertOne({
      businessID: business?.businessID,
      ...data,
      image: null,
      onChain: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      succes: true,
    });
  } catch (error) {
    return NextResponse.json({ error: `${error}` });
  } finally {
    console.log("Done: creating token");
  }
}

async function getHandler(request: AuthenticatedRequest) {
  const db = client.db(`${process.env.DATABASE}`);
  try {
    const { user } = request;
    const { userID } = user;

    const business = await db.collection("business").findOne(
      { userID },
      {
        projection: {
          businessID: 1,
        },
      },
    );

    const vouchers = await db
      .collection("contests")
      .find({ businessID: business?.businessID, isActive: true })
      .toArray();

    return NextResponse.json({
      succes: true,
      vouchers,
    });
  } catch (error) {
    return NextResponse.json({ error: `${error}` });
  } finally {
    console.log("Done: creating token");
  }
}

async function updateHandler(request: AuthenticatedRequest) {
  const db = client.db(`${process.env.DATABASE}`);
  try {
    const { user } = request;
    const { userID } = user;

    const { constestID, data } = await request.json();

    const business = await db.collection("business").findOne(
      { userID },
      {
        projection: {
          businessID: 1,
        },
      },
    );

    await db.collection("contests").findOneAndUpdate(
      { businessID: business?.businessID, constestID },
      {
        $set: {
          ...data,
        },
      },
    );

    return NextResponse.json({
      succes: true,
    });
  } catch (error) {
    return NextResponse.json({ error: `${error}` });
  } finally {
    console.log("Done: creating token");
  }
}

async function deleteHandler(request: AuthenticatedRequest) {
  const db = client.db(`${process.env.DATABASE}`);
  try {
    const { user } = request;
    const { userID } = user;
    const { constestID } = await request.json();

    const business = await db.collection("business").findOne(
      { userID },
      {
        projection: {
          businessID: 1,
        },
      },
    );

    await db.collection("contests").findOneAndUpdate(
      { businessID: business?.businessID, constestID, isActive: true },
      {
        $set: {
          isActive: false,
        },
      },
    );

    const contests = await db
      .collection("contests")
      .find({ businessID: business?.businessID, constestID, isActive: true })
      .toArray();

    return NextResponse.json({
      succes: true,
      contests,
    });
  } catch (error) {
    return NextResponse.json({ error: `${error}` });
  } finally {
    console.log("Done: creating token");
  }
}

export const POST = withAuth(postHandler);
export const GET = withAuth(getHandler);
export const PUT = withAuth(updateHandler);
export const DELETE = withAuth(deleteHandler);
