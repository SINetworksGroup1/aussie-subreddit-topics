import json

class TopicParser(object):
    """docstring for TopicParser."""

    # Constructor
    def __init__(self):
        print("TopicParser Initalised")
        self.listOfTopics = dict()
        self.charsToRemove = list(",.[]0123456789/\\”’{}?\"<>:;|!@#$%^&*()_=+")
        with open('1-1000.txt', 'r') as textFile:
            self.topEnglishWords = textFile.read().split('\n')

    # Parse Method
    # Give a title as a string
    def parse(self, title):
        # Splits string by white space
        topics = title.lower().split()
        for topic in topics:

            # Removes all chars in charsToRemove from each topic
            for c in self.charsToRemove:
                topic = topic.replace("'s", "")
                topic = topic.replace(c, "")

            # Checks to see if the length of the word is 0 or 1 or if it is in
            # the topEnglishWords list
            if len(topic) < 2 or topic in self.topEnglishWords:
                # return to the top of the loop
                continue

            # Checks if the topic already exists in the listOfTopics
            if topic in self.listOfTopics:
                # if it does it incriments the count of the word
                self.listOfTopics[topic].frequency += 1
            else:
                # If not it adds it to the list and gives it a count of one
                self.listOfTopics[topic] = Keyword(topic, 1)

    # Returns the listOfTopics as a list of Keyword Objects
    def getTopics(self):
        return self.listOfTopics.values()

    # Saves the dictonary to fileName.json
    def save(self, fileName):
        keywordList = self.getTopics()
        keywordDict = dict()
        for keywordClass in keywordList:
            keywordDict[keywordClass.keyword] = keywordClass.frequency
        with open(fileName + '.json', 'w') as file:
            json.dump(keywordDict, file)
            print("Data saved to " + fileName + ".json")

    # Reads fileName.json to the dictonary
    def load(self, fileName):
        with open(fileName + '.json', 'r') as file:
            keywordDict = json.load(file)
            for keyword in keywordDict:
                self.listOfTopics[keyword] = Keyword(keyword, keywordDict.get(keyword))
            print("Data loaded from " + fileName + ".json")

class Keyword(object):
    def __init__(self, keyword, frequency):
        self.keyword = keyword
        self.frequency = frequency

    def __lt__(self, other):
        return self.frequency < other.frequency
