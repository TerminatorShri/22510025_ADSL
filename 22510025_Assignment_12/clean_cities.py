import csv

input_file = 'worldcities.csv'
output_file = 'clean_worldcities.csv'

with open(input_file, 'r', encoding='utf-8') as infile, \
        open(output_file, 'w', newline='', encoding='utf-8') as outfile:

    reader = csv.DictReader(infile)
    fieldnames = reader.fieldnames
    writer = csv.DictWriter(outfile, fieldnames=fieldnames)

    writer.writeheader()

    for row in reader:
        # Check if all values are non-empty and not just whitespace
        if all(row[col].strip() != '' for col in fieldnames):
            writer.writerow(row)

print(f"Cleaned data written to {output_file}")
