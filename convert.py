#!/usr//bin/python3.6

import json, csv, sys, argparse

parser = argparse.ArgumentParser()
parser.add_argument('fileName', help='A JSON file name in ./formatted-jsons/ -.json, Example: ./convert.py adelaide')
parser.add_argument('format', nargs='?', choices=['csv', 'json'], default='csv', help='format to output as (default: csv)')
args = parser.parse_args()

subreddit = args.fileName

with open('./formatted-jsons/' + subreddit + '.json', 'r') as file:
    submissionList = json.load(file)

generalDiscussion = 0
transport = 0
nature = 0
history = 0
other = 0
questions = 0
food = 0
photos = 0
news = 0
entertainment = 0
education = 0
memes = 0

for submission in submissionList:
    category = submission.get('category').lower()

    if category == 'general discussion':
        generalDiscussion += 1
    elif category == 'transport':
        transport += 1
    elif category == 'nature':
        nature += 1
    elif category == 'history':
        history += 1
    elif category == 'other':
        other += 1
    elif category == 'questions':
        questions += 1
    elif category == 'food':
        food += 1
    elif category == 'photos':
        photos += 1
    elif category == 'news':
        news += 1
    elif category == 'entertainment':
        entertainment += 1
    elif category == 'education':
        education += 1
    elif category == 'memes':
        memes += 1
    else:
        print('Unrecognised category \'' + category + '\' for submission \'' + submission.get('title') + '\'')

print("General Discussion: " + str(generalDiscussion))
print("Transport: " + str(transport))
print("Nature: " + str(nature))
print("History: " + str(history))
print("Other: " + str(other))
print("Questions: " + str(questions))
print("Food: " + str(food))
print("Photos: " + str(photos))
print("News: " + str(news))
print("Entertainment: " + str(entertainment))
print("Education: " + str(education))
print("Memes: " + str(memes))

total = generalDiscussion + transport + nature + history + other + questions + food + photos + news + entertainment + education + memes
print('Total: ' + str(total))

if total == 100:
    if args.format == 'csv':
        with open(subreddit + '.csv', 'w', newline='') as csvfile:
            cw = csv.writer(csvfile, delimiter=',')
            cw.writerow(['Category'] + ['Frequency'])
            cw.writerow(['General Discussion'] + [generalDiscussion])
            cw.writerow(['Transport'] + [transport])
            cw.writerow(['Nature'] + [nature])
            cw.writerow(['History'] + [history])
            cw.writerow(['Other'] + [other])
            cw.writerow(['Questions'] + [questions])
            cw.writerow(['Food'] + [food])
            cw.writerow(['Photos'] + [photos])
            cw.writerow(['News'] + [news])
            cw.writerow(['Entertainment'] + [entertainment])
            cw.writerow(['Education'] + [education])
            cw.writerow(['Memes'] + [memes])
    elif args.format == 'json':
        with open(subreddit + '.json', 'w') as jsonfile:
            json.dump( \
                { \
                    'generalDiscussion': generalDiscussion, \
                    'transport': transport, \
                    'nature': nature, \
                    'history': history, \
                    'other': other, \
                    'questions': questions, \
                    'food': food, \
                    'photos': photos, \
                    'news': news, \
                    'entertainment': entertainment, \
                    'education': education, \
                    'memes': memes, \
                }, \
                jsonfile \
            )
else:
    print("There wasn't 100 post analysed,\nPlease check " + subreddit + '.json for Category Errors')
