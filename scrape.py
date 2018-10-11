#!/usr//bin/python3.6

import sys
import praw
import json
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

objectList = list()
for submission in sub.hot(limit=100):
    objectList.append({
        'title' : submission.title, \
        'body' : submission.selftext, \
        'is_video' : submission.is_video, \
        'post_url' : 'www.reddit.com' + submission.permalink, \
        'content_url' : submission.url, \
        'category' : '' \
    })

# save the dictonary to a JSON file
with open('./jsons/' + sub.display_name + '.json', 'w') as file:
    json.dump(objectList, file)
