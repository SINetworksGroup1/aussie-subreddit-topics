#!/usr//bin/python3.6

from TopicParser import TopicParser, Keyword
from configparser import ConfigParser

import praw
from prawcore.exceptions import OAuthException

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
        user_agent='aussie-subreddit-topics by /u/Thomotron and /u/DoneRaging' \
    )

    print('Logged in as ' + str(r.user.me()))
except OAuthException:
    print('Failed to create PRAW instance, check your credentials')
    exit(1)

sub = r.subreddit('adelaide')

for submission in sub.hot(limit=10):
    # print(submission.title)\
    tp.parse(submission.title)

# save the dictonary to a JSON file
# tp.save("test")

# Load the data.json to the dictonary
# tp.load("test")

# get the dictonary from the object and print it out
list = tp.getTopics()
for keyword in sorted(list, reverse=True):
    print("{} - {}".format(keyword.keyword, str(keyword.frequency)))
