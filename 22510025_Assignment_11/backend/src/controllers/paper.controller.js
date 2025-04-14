export const getAllPapers = async (req, res) => {
  const session = req.neo4jSession;

  try {
    const result = await session.run(`MATCH (p:Paper) RETURN p LIMIT 50`);
    const papers = result.records.map((r) => r.get("p").properties);
    res.json(papers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch papers" });
  } finally {
    await session.close();
  }
};

export const findPaperById = async (req, res) => {
  const { paperId } = req.params;
  const session = req.neo4jSession;

  try {
    const result = await session.run(
      `MATCH (p:Paper {paper_id: $paperId}) RETURN p`,
      { paperId }
    );

    if (result.records.length > 0) {
      const paper = result.records[0].get("p").properties;
      return res.status(200).json(paper);
    } else {
      return res.status(404).json({ message: "Paper not found" });
    }
  } catch (error) {
    console.error("Error fetching paper:", error);
    return res.status(500).json({ error: "Internal server error" });
  } finally {
    await session.close();
  }
};

export const checkCitation = async (req, res) => {
  const { paperIdA, paperIdB } = req.params;

  const session = req.neo4jSession;

  try {
    const query = `
      MATCH (pA:Paper {paper_id: $paperIdA}), (pB:Paper {paper_id: $paperIdB}),
      path = shortestPath((pA)-[:CITES*]->(pB))
      RETURN path
      LIMIT 1
    `;

    const result = await session.run(query, {
      paperIdA,
      paperIdB,
    });

    if (result.records.length > 0) {
      const record = result.records[0];
      const path = record.get("path");
      const start = path.start.properties;
      const end = path.end.properties;
      const citationPath = path.segments.map((segment) => {
        return {
          start: segment.start.properties,
          end: segment.end.properties,
          relationship: segment.relationship.type,
        };
      });

      return res.status(200).json({
        message:
          citationPath.length === 1 ? "Direct citation" : "Indirect citation",
        startPaper: start,
        endPaper: end,
        citationPath: citationPath,
      });
    } else {
      return res
        .status(404)
        .json({ message: "Paper A does not cite Paper B." });
    }
  } catch (error) {
    console.error("Error checking citation:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getClassificationById = async (req, res) => {
  const { paperId } = req.params;
  const session = req.neo4jSession;

  try {
    const query = `
      MATCH (p:Paper {paper_id: $paperId})
      WITH p.filename AS filename
      MATCH (p2:Paper {filename: filename})
      RETURN p2.classification AS classification
      LIMIT 1;
    `;

    // Execute the query with the paper_id parameter
    const result = await session.run(query, { paperId });

    // Check if the result contains any data
    if (result.records.length > 0) {
      const classification = result.records[0].get("classification");
      return res.status(200).json({
        message: "Classification found",
        classification,
      });
    } else {
      return res.status(404).json({
        message: "No classification found for the given paper_id.",
      });
    }
  } catch (error) {
    console.error("Error querying the database:", error);
    return res.status(500).json({
      message: "Error querying the database.",
      error: error.message,
    });
  } finally {
    // Close the session after query execution
    await session.close();
  }
};
