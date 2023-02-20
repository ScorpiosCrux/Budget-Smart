import * as csv from "@fast-csv/parse";

const csv_file_path = "/Users/vivid/Code/Smart-Budget/backend/src/utilities/transactions.csv";

/* 
	Parses the file and prints the data row by row.
*/
csv.parseFile(csv_file_path)
	.on("error", (error) => console.error(error))
	.on("data", (row) => {
		console.log(row);
	})
	.on("end", (rowCount: number) => console.log(`Parsed ${rowCount} rows`));

console.log("Done");
