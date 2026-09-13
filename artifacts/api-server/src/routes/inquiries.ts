import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import { clerkClient, getAuth } from "@clerk/express";
import { db, inquiriesTable } from "@workspace/db";
import {
  CreateInquiryBody,
  CreateInquiryResponse,
  ListInquiriesResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/inquiries", async (req, res): Promise<void> => {
  const parsed = CreateInquiryBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid inquiry");
    res.status(400).json({ error: "Please check the inquiry details." });
    return;
  }

  const [inquiry] = await db
    .insert(inquiriesTable)
    .values({
      ...parsed.data,
      business: parsed.data.business || null,
    })
    .returning();

  res.status(201).json(CreateInquiryResponse.parse(inquiry));
});

router.get("/inquiries", async (req, res): Promise<void> => {
  const auth = getAuth(req);
  if (!auth.userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const user = await clerkClient.users.getUser(auth.userId);
  const isStudioAdmin = user.emailAddresses.some(
    ({ emailAddress }) =>
      emailAddress.toLowerCase() === "extapano@gmail.com",
  );
  if (!isStudioAdmin) {
    req.log.warn({ userId: auth.userId }, "Non-admin inquiry access denied");
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  const inquiries = await db
    .select()
    .from(inquiriesTable)
    .orderBy(desc(inquiriesTable.createdAt));

  res.json(ListInquiriesResponse.parse(inquiries));
});

export default router;