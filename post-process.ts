// Helper library written for useful postprocessing tasks with Flat Data
// Has helper functions for manipulating csv, json, excel, zip, and image files
import { readJSON, writeJSON } from 'https://deno.land/x/flat@0.0.9/mod.ts';

const LATEST_FILE = 'latest-bat-auctions.json';
const FINAL_FILE = 'bat-auctions.json';

// Read the latest auctions.
const latest = await readJSON(LATEST_FILE);
// console.log(latest);

// Read the current auctions.
const auctions: any[] = await readJSON(FINAL_FILE);

// Only add auctions we don't have.
latest.forEach((auction: any) => {
  if (!auctions.find((aa) => aa.id === auction.id)) {
    auctions.push(auction);
    console.log('NEW', auction);
  }
});

// Write update JSON file
await Deno.writeTextFile(FINAL_FILE, JSON.stringify(auctions, undefined, 2));
console.log(`Done. Saved ${auctions.length} auctions`);
