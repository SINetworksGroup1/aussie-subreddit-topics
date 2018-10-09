#!/usr//bin/python3.6

from TopicParser import TopicParser, Keyword
import praw
import sys

# Create the object
tp = TopicParser()

# Load the data.json to the dictonary
tp.load(sys.argv[1])

# get the dictonary from the object and print it out
list = tp.getTopics()
for keyword in sorted(list):
    print("{} - {}".format(str(keyword.frequency), keyword.keyword))
