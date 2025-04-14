import csv
import os

# 1. Convert papers


def convert_papers():
    with open('papers', 'r') as infile, open('papers.csv', 'w', newline='') as outfile:
        writer = csv.writer(outfile)
        writer.writerow(['paper_id', 'filename', 'citation_string'])
        for line in infile:
            parts = line.strip().split('\t')
            if len(parts) == 3:
                writer.writerow(parts)

# 2. Convert citations


def convert_citations():
    with open('citations', 'r') as infile, open('citations.csv', 'w', newline='') as outfile:
        writer = csv.writer(outfile)
        writer.writerow(['source_id', 'target_id'])
        for line in infile:
            parts = line.strip().split()
            if len(parts) == 2:
                writer.writerow(parts)

# 3. Convert classifications


def convert_classifications():
    with open('classifications', 'r') as infile, open('classifications.csv', 'w', newline='') as outfile:
        writer = csv.writer(outfile)
        writer.writerow(['filename', 'classification'])
        for line in infile:
            parts = line.strip().split('\t')
            if len(parts) == 2:
                writer.writerow(parts)

# 4. Convert citations.withauthors


def convert_citations_with_authors():
    paper_set = set()
    author_set = set()

    with open('citations.withauthors', 'r') as infile, \
            open('papers_extended.csv', 'w', newline='') as paperfile, \
            open('paper_citations.csv', 'w', newline='') as citationfile, \
            open('authors.csv', 'w', newline='') as authorfile, \
            open('paper_author.csv', 'w', newline='') as pa_relfile:

        paper_writer = csv.writer(paperfile)
        citation_writer = csv.writer(citationfile)
        author_writer = csv.writer(authorfile)
        pa_writer = csv.writer(pa_relfile)

        paper_writer.writerow(['paper_id', 'filename'])
        citation_writer.writerow(['source_id', 'target_id'])
        author_writer.writerow(['author_name'])
        pa_writer.writerow(['author_name', 'paper_id'])

        lines = [line.strip() for line in infile if line.strip()]
        i = 0

        while i < len(lines):
            if lines[i] == "***":
                i += 1
                if i >= len(lines):
                    break
                paper_id = lines[i]
                i += 1
                if i >= len(lines):
                    break
                filename = lines[i]
                i += 1

                paper_writer.writerow([paper_id, filename])
                paper_set.add(paper_id)

                # Read cited paper IDs
                while i < len(lines) and lines[i] != "*":
                    cited_id = lines[i]
                    citation_writer.writerow([paper_id, cited_id])
                    i += 1
                i += 1  # Skip "*"

                # Read authors
                while i < len(lines) and lines[i] != "***":
                    author = lines[i]
                    if author not in author_set:
                        author_writer.writerow([author])
                        author_set.add(author)
                    pa_writer.writerow([author, paper_id])
                    i += 1
            else:
                i += 1


# 🔁 Run all
if __name__ == '__main__':
    convert_papers()
    convert_citations()
    convert_classifications()
    convert_citations_with_authors()
    print("✅ All files converted to CSV.")
