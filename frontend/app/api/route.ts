export async function GET(req: Request) { 
  try {
    return Response.json({});
  } catch (error) {
    return Response.json({ error: `${error}` });
  } finally {
    console.log("Done: updating business")
  }
};