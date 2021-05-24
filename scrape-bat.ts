import axios from 'axios';
import { promises as fs } from 'fs';

const FILE = 'bat-auctions.json';

let auctions: any[] = [];

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getPage(page: number) {
  const response = await axios
    .get(`https://bringatrailer.com/wp-json/bringatrailer/1.0/data/keyword-filter?page=${page}sort=td&results=items`)
    .catch((error) => {
      console.error('Posting to Axiom failed', error);
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }

      return Promise.reject(error);
    });

  // console.log('PAGE', page, response.data);

  auctions.push(...response.data.items);
}

async function run() {
  for (let page = 1; page < 320; page += 1) {
    await getPage(page);
    await sleep(5000);
  }

  fs.writeFile(FILE, JSON.stringify(auctions, undefined, 2));

  console.log(`Done. Saved ${auctions.length} auctions`);
}

run();
