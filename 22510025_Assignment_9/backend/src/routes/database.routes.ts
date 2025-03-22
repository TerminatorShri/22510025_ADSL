import express from "express";
import {
  getCollections,
  getAllDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  getSampleDocument,
} from "../controllers/database.controller";

const router = express.Router();

// Middleware for logging requests
router.use((req, res, next) => {
  console.log(`📢 Incoming Request: ${req.method} ${req.originalUrl}`);
  if (Object.keys(req.body).length) console.log("📝 Request Body:", req.body);
  next();
});

// 1️⃣ Fetch all collection names
router.get("/collections", async (req, res) => {
  console.log("🔍 GET /collections → Fetching all collections...");
  await getCollections(req, res);
});

// 2️⃣ Fetch all documents from a collection
router.get("/collections/:collectionName", async (req, res) => {
  console.log(
    `🔍 GET /collections/${req.params.collectionName} → Fetching documents...`
  );
  await getAllDocuments(req, res);
});

// 3️⃣ Create a new document in a collection
router.post("/collections/:collectionName", async (req, res) => {
  console.log(
    `📌 POST /collections/${req.params.collectionName} → Creating document...`
  );
  await createDocument(req, res);
});

// 4️⃣ Update a document in a collection
router.put("/collections/:collectionName/:id", async (req, res) => {
  console.log(
    `🛠️ PUT /collections/${req.params.collectionName}/${req.params.id} → Updating document...`
  );
  await updateDocument(req, res);
});

// 5️⃣ Delete a document from a collection
router.delete("/collections/:collectionName/:id", async (req, res) => {
  console.log(
    `🗑️ DELETE /collections/${req.params.collectionName}/${req.params.id} → Deleting document...`
  );
  await deleteDocument(req, res);
});

router.get("/collections/:collectionName/sample", getSampleDocument);

// Middleware for handling invalid routes
router.use((req, res) => {
  console.warn(`⚠️ 404 - Route Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: "Route Not Found" });
});

export default router;
