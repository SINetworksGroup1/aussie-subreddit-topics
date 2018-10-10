#!/usr//bin/python3.6

import sys
import praw
from TopicParser import TopicParser, Keyword
from configparser import ConfigParser
from prawcore.exceptions import OAuthException
from argparse import ArgumentParser

# Get arguments
parser = ArgumentParser()
parser.add_argument('subreddit', help='subreddit to get hot topics from')
args = parser.parse_args()

# Load credentials
try:
    config = ConfigParser()
    config.read('config.ini')

    client_id = config['Credentials']['client_id']
    client_secret = config['Credentials']['client_secret']
    username = config['Credentials']['username']
    password = config['Credentials']['password']
except KeyError as e:
    print('Failed to read config')
    print('More specifically whe trying to read ' + str(e))
    exit(1)

# Create the topic parser
tp = TopicParser()

# Create PRAW instance
try:
    r = praw.Reddit(
        client_id=client_id, \
        client_secret=client_secret, \
        username=username, \
        password=password, \
        user_agent='aussie-subreddit-topics by /u/Thomotron, /u/DoneRaging, and /u/testing_qwerty123' \
    )

    print('Logged in as ' + str(r.user.me()))
except OAuthException:
    print('Failed to create PRAW instance, check your credentials')
    exit(1)

sub = r.subreddit(args.subreddit)
print('Searching the ' + sub.display_name + " subreddit...")

for submission in sub.hot(limit=100):
    tp.parse(submission.title)
    tp.parse(submission.selftext)

# save the dictonary to a JSON file
tp.save(sub.display_name)

# Load the data.json to the dictonary
# tp.load(subreddit)

# get the dictonary from the object and print it out
list = tp.getTopics()
for keyword in sorted(list):
    print("{} - {}".format(str(keyword.frequency), keyword.keyword))
