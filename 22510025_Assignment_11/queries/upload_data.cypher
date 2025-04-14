// 🔄 Load paper data and create Paper nodes
LOAD CSV WITH HEADERS FROM 'file:///papers.csv' AS row
CREATE (p:Paper {paper_id: row.paper_id, filename: row.filename, citation_string: row.citation_string});

// 🏷️ Create index on Paper nodes by paper_id to speed up matching
CREATE INDEX FOR (p:Paper) ON (p.paper_id);

// 🔄 Load citation relationships between papers
LOAD CSV WITH HEADERS FROM 'file:///citations.csv' AS row
MATCH (p1:Paper {paper_id: row.source_id})
MATCH (p2:Paper {paper_id: row.target_id})
CREATE (p1)-[:CITES]->(p2);

// 🏷️ Create index on Paper nodes by filename to improve classification matching
CREATE INDEX paper_filename_index FOR (p:Paper) ON (p.filename);

// 🔄 Load classification info and update Paper nodes with their classification
LOAD CSV WITH HEADERS FROM 'file:///classifications.csv' AS row
MATCH (p:Paper {filename: row.filename})
SET p.classification = row.classification;

// 🔄 Load extended paper data (from citations.withauthors) and create additional Paper nodes
LOAD CSV WITH HEADERS FROM 'file:///papers_extended.csv' AS row
CREATE (p:Paper {paper_id: row.paper_id, filename: row.filename});

// 🔄 Load citation relationships again (from citations.withauthors)
LOAD CSV WITH HEADERS FROM 'file:///paper_citations.csv' AS row
MATCH (p1:Paper {paper_id: row.source_id})
MATCH (p2:Paper {paper_id: row.target_id})
CREATE (p1)-[:CITES]->(p2);

// 🔄 Load author names and create Author nodes
LOAD CSV WITH HEADERS FROM 'file:///authors.csv' AS row
CREATE (a:Author {name: row.author_name});

// 🏷️ Create index on Author nodes by name to speed up author-paper matching
CREATE INDEX FOR (a:Author) ON (a.name);

// 🔄 Load paper-author relationships and connect Authors to Papers
LOAD CSV WITH HEADERS FROM 'file:///paper_author.csv' AS row
MATCH (p:Paper {paper_id: row.paper_id})
MATCH (a:Author {name: row.author_name})
CREATE (a)-[:AUTHORED]->(p);