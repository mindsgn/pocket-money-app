import client from "@/lib/mongo";
import { signJWT } from "@/lib/jwt";

interface userData {
  name: string;
}

interface BusinesData {
  businessName: string;
  businessType: string;
  businessAddress: string;
}

function isProfileComplete(data: userData) {
  switch (data) {
    case data:
      const { name } = data;
      if (name == "") {
        return false;
      } else if (name == null) {
        return false;
      }

      return true;
    case null:
    default:
      return false;
  }
}

function isBusinessProfileComplete(data: BusinesData) {
  switch (data) {
    case data:
      const { businessName, businessType, businessAddress } = data;

      if (businessName == "") {
        return false;
      } else if (businessName == null) {
        return false;
      } else if (businessType == null) {
        return false;
      } else if (businessType == "") {
        return false;
      } else if (businessAddress == "") {
        return false;
      } else if (businessAddress == null) {
        return false;
      }

      return true;
    case null:
    default:
      return false;
  }
}

//verify account
export async function POST(req: Request) {
  const { code, email } = await req.json();
  let redirectTo = "/onboarding";
  let profileCompleted = false;
  let businessCompleted = false;

  if (
    !email ||
    !code ||
    typeof email !== "string" ||
    typeof code !== "string"
  ) {
    throw new Error("");
  }

  const db = client.db(`${process.env.DATABASE}`);
  const auth = await db
    .collection("auth")
    .findOne({ email: email.toLowerCase() });

  if (!auth || auth.code !== code.toLowerCase() || auth.expires < new Date()) {
    throw new Error("failed");
  }

  const user = await db.collection("user").findOne(
    {
      email: email.toLowerCase(),
    },
    {
      projection: {
        email: 1,
        name: 1,
        type: 1,
        userID: 1,
      },
    },
  );
  const business = await db.collection("business").findOne(
    {
      userID: user?.userID,
    },
    {
      projection: {
        businessID: 1,
        isActive: 1,
        businessAddress: 1,
        businessName: 1,
        businessType: 1,
        description: 1,
        website: 1,
      },
    },
  );

  // const loyalty = await db.collection("points").findOne({ businessID: business?.businessID });
  const token = await signJWT({ userID: user?.userID });

  await db.collection("auth").deleteOne({ email: email.toLowerCase() });

  //@ts-expect-error: profile might be null or does not match type
  if (user) profileCompleted = isProfileComplete(user);
  //@ts-expect-error: business might be null or does not match type
  if (business) businessCompleted = isBusinessProfileComplete(business);

  if (profileCompleted && businessCompleted) {
    redirectTo = `/dashboard/contests`;
  } else {
    redirectTo = `/onboarding?profileCompleted=${profileCompleted}&businessCompleted=${businessCompleted}`;
  }

  try {
    return Response.json({
      token,
      user,
      business,
      profileCompleted,
      businessCompleted,
      redirectTo,
    });
  } catch (error) {
    return Response.json({ error: `${error}` });
  } finally {
    console.log("Done: verifing user");
  }
}
