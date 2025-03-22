import { Request, Response } from "express";
import mongoose from "../config/mongo.config";
import { ApiError, ApiResponse } from "../config/api.config";

// Function to get or create a dynamic model
const getModel = (collectionName: string) => {
  console.log(`🛠️ Creating/Fetching model for collection: ${collectionName}`);
  return (
    mongoose.models[collectionName] ||
    mongoose.model(collectionName, new mongoose.Schema({}, { strict: false }))
  );
};

// 1️⃣ Fetch all collection names
export const getCollections = async (req: Request, res: Response) => {
  console.log("📢 Fetching all collection names...");
  try {
    if (!mongoose.connection.db) {
      console.error("❌ Database connection is not established!");
      return res
        .status(500)
        .json(new ApiError(500, "Database connection is not established"));
    }

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(
      "✅ Collections fetched:",
      collections.map((col) => col.name)
    );

    res.status(200).json(
      new ApiResponse(
        200,
        collections.map((col) => col.name),
        "Collections fetched successfully"
      )
    );
  } catch (error) {
    console.error("❌ Error fetching collections:", error);
    res
      .status(500)
      .json(
        new ApiError(500, "Error fetching collections", [
          (error as Error).message,
        ])
      );
  }
};

// 2️⃣ Fetch all documents from a collection
export const getAllDocuments = async (req: Request, res: Response) => {
  console.log(
    `📢 Fetching documents from collection: ${req.params.collectionName}`
  );
  try {
    const Model = getModel(req.params.collectionName);
    const documents = await Model.find();
    console.log(
      `✅ Retrieved ${documents.length} documents from ${req.params.collectionName}`
    );

    res
      .status(200)
      .json(
        new ApiResponse(200, documents, "Documents retrieved successfully")
      );
  } catch (error) {
    console.error("❌ Error retrieving documents:", error);
    res
      .status(500)
      .json(
        new ApiError(500, "Error retrieving documents", [
          (error as Error).message,
        ])
      );
  }
};

// 3️⃣ Create a new document in a collection
export const createDocument = async (req: Request, res: Response) => {
  console.log(
    `📢 Creating a new document in collection: ${req.params.collectionName}`
  );
  console.log("📝 Request Body:", req.body);
  try {
    const Model = getModel(req.params.collectionName);
    const newDocument = new Model(req.body);
    await newDocument.save();
    console.log("✅ Document created successfully:", newDocument);

    res
      .status(201)
      .json(new ApiResponse(201, newDocument, "Document created successfully"));
  } catch (error) {
    console.error("❌ Error creating document:", error);
    res
      .status(400)
      .json(
        new ApiError(400, "Error creating document", [(error as Error).message])
      );
  }
};

// 4️⃣ Update a document in a collection
export const updateDocument = async (req: Request, res: Response) => {
  console.log(
    `📢 Updating document in collection: ${req.params.collectionName}`
  );
  console.log("🆔 Document ID:", req.params.id);
  console.log("📝 Updated Data:", req.body);
  try {
    const Model = getModel(req.params.collectionName);
    const updatedDocument = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedDocument) {
      console.warn("⚠️ Document not found for update:", req.params.id);
      return res.status(404).json(new ApiError(404, "Document not found"));
    }

    console.log("✅ Document updated successfully:", updatedDocument);
    res
      .status(200)
      .json(
        new ApiResponse(200, updatedDocument, "Document updated successfully")
      );
  } catch (error) {
    console.error("❌ Error updating document:", error);
    res
      .status(400)
      .json(
        new ApiError(400, "Error updating document", [(error as Error).message])
      );
  }
};

// 5️⃣ Delete a document from a collection
export const deleteDocument = async (req: Request, res: Response) => {
  console.log(
    `📢 Deleting document from collection: ${req.params.collectionName}`
  );
  console.log("🆔 Document ID:", req.params.id);
  try {
    const Model = getModel(req.params.collectionName);
    const deletedDocument = await Model.findByIdAndDelete(req.params.id);

    if (!deletedDocument) {
      console.warn("⚠️ Document not found for deletion:", req.params.id);
      return res.status(404).json(new ApiError(404, "Document not found"));
    }

    console.log("✅ Document deleted successfully:", deletedDocument);
    res
      .status(200)
      .json(new ApiResponse(200, {}, "Document deleted successfully"));
  } catch (error) {
    console.error("❌ Error deleting document:", error);
    res
      .status(500)
      .json(
        new ApiError(500, "Error deleting document", [(error as Error).message])
      );
  }
};

// 🔍 **Fetch a Sample Document and Detect Fields**
export const getSampleDocument = async (
  req: Request,
  res: Response
): Promise<any> => {
  console.log(
    `🔍 Fetching a sample document from collection: ${req.params.collectionName}`
  );
  try {
    const Model = getModel(req.params.collectionName);
    const sampleDoc = await Model.findOne();

    if (!sampleDoc) {
      console.warn(
        "⚠️ No documents found in collection:",
        req.params.collectionName
      );
      return res
        .status(404)
        .json(new ApiError(404, "No documents found in collection"));
    }

    const data = sampleDoc.toObject();
    console.log("✅ Sample Document Retrieved:", data);

    // **Detect Predefined & Custom Fields**
    const allFields = Object.keys(data);

    // Fetch multiple documents to analyze structure
    const collectionDocs = await Model.find().limit(5);
    const fieldCount: Record<string, number> = {};

    collectionDocs.forEach((doc) => {
      Object.keys(doc.toObject()).forEach((field) => {
        fieldCount[field] = (fieldCount[field] || 0) + 1;
      });
    });

    // Consider fields appearing in at least 80% of documents as predefined
    const predefinedFields = Object.keys(fieldCount).filter(
      (field) => fieldCount[field] >= collectionDocs.length * 0.8
    );
    const customFields = allFields.filter(
      (field) => !predefinedFields.includes(field)
    );

    console.log("📊 Field Analysis → Predefined Fields:", predefinedFields);
    console.log("📊 Field Analysis → Custom Fields:", customFields);

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { sample: data, predefinedFields, customFields },
          "Sample document retrieved"
        )
      );
  } catch (error) {
    console.error("❌ Error retrieving sample document:", error);
    res
      .status(500)
      .json(
        new ApiError(500, "Error retrieving sample document", [
          (error as Error).message,
        ])
      );
  }
};
