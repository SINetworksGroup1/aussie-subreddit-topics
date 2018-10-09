#!/usr//bin/python3.6

from TopicParser import TopicParser, Keyword
import praw

# Create the object
tp = TopicParser()

r = praw.Reddit(
    client_id='', \
    client_secret='', \
    username='', \
    password='', \
    user_agent='aussie-subreddit-topics by /u/Thomotron and /u/DoneRaging' \
)

print('Logged in as ' + str(r.user.me()))

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
