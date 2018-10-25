# Aussie Subreddit Topics
A visualisation of Australian subreddit post topics scraped with Python and visualised with Angular 6.

# Running the visualisation

You'll need a recent version of Node (8.13 or later) capable of running Angular 6. Grab a copy [here](https://nodejs.org/en/download/) before you start.

- Clone the repo with `git clone https://github.com/SINetworksGroup1/aussie-subreddit-topics.git`
- `cd` into the newly-created `aussie-subreddit-topics` directory
- `cd` into `website`
- Install dependencies with `npm install`
- Run the Angular dev server with `npm start`

The visualisation should be available at `http://localhost:4200`.

# Using the scraping tools

All the scraping tools are available in the root of the repo. There are two key scripts used to scrape and pre-process data:
1. `scrape.py`
2. `convert.py`

## `scrape.py`
`scrape.py` will, using a [PRAW](https://praw.readthedocs.io/en/latest/) instance, sign into Reddit and scrape the hottest 100 posts from the given subreddit and place the JSON-formatted output in `./jsons/<subreddit_name>.json`. i.e. calling `./scrape.py adelaide` will scrape [/r/adelaide](https://reddit.com/r/adelaide) and place the results in `./jsons/adelaide.json`.

## `convert.py`
`convert.py` digests JSONs produced by `convert.py` and aggregates the counts of each category. The results are placed into their own JSON/CSV file in the current working directory with the same name as the input file. i.e. calling `./convert.py ./jsons/adelaide.json json` will produce a category count in `./adelaide.json`.
