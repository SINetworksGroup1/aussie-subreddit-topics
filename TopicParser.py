import json

class TopicParser(object):
    """docstring for TopicParser."""

    # Constructor
    def __init__(self):
        print("TopicParser Initalised")
        self.listOfTopics = dict()
        self.charsToRemove = list(",.[]0123456789/\\{}?\"<>:;|!@#$%^&*()-_=+")

    # Parse Method
    # Give a title as a string
    def parse(self, title):
        # Splits string by white space
        topics = title.lower().split()
        for topic in topics:
            # Removes all chars in charsToRemove from each topic
            for c in self.charsToRemove:
                topic = topic.replace(c, "")
                topic = topic.replace("'s'", "")
                topic = topic.replace("'s'", "")
            # Checks if the topic already exists in the listOfTopics
            if topic in self.listOfTopics and topic:
                # if it does it incriments the count of the word
                self.listOfTopics[topic].frequency += 1
            else:
                # If not it adds it to the list and gives it a count of one
                self.listOfTopics[topic] = Keyword(topic, 1)

    # Returns the listOfTopics as a dictonary
    def getTopics(self):
        return self.listOfTopics.values()

    # Saves the dictonary to fileName.json
    def save(self, fileName):
        with open(fileName + '.json', 'w') as file:
            json.dump(self.listOfTopics, file)

    # Reads fileName.json to the dictonary
    def load(self, fileName):
        with open(fileName + '.json', 'r') as file:
            self.listOfTopics = json.load(file)

class Keyword(object):
    def __init__(self, keyword, frequency):
        self.keyword = keyword
        self.frequency = frequency

    def __lt__(self, other):
        return self.frequency < other.frequency
