#!/usr//bin/python3.6

from TopicParser import TopicParser

# Create the object
tp = TopicParser()

#give it a bunch of titles or long strings
tp.parse("the rate that a character can gain experience points after the player has spent time away from the game.[14] When a character dies, it becomes a ghost—or wisp for Night Elf characters—at a nearby graveyard.[19] Characters can be resurrected by other characters that have the ability or can self-resurrect by moving from the graveyard to the place where they died. If a character is past level ten and they resurrect at a graveyard, the items equipped by the character degrade, requiring in-game money and a specialist NPC to repair them. Items that have degraded heavily become unusable until they are repaired. If the location of the character's body is unreachable, they can use a special spirit healer NPC to resurrect at the graveyard. When the spirit healer revives a character, items equipped by the character at that time are further d")
tp.parse("Here is an example of the same thing that happens when you print an object's method")
tp.parse("The key thing you need to know: optional arguments are evaluated only once, when the function is compiled. So if you pass a mutable as an optional argument")
tp.parse("Not the answer you're looking for? Browse other questions tagged")
tp.parse("to have getter and setter functions, perhaps to check something, in Python you can declare special method functions. This is what Martin v. Löwis meant when he said In Python, it is generally considere")

# save the dictonary to a JSON file
tp.save("test")

# Load the data.json to the dictonary
tp.load("test")

# get the dictonary from the object and print it out
dictonary = tp.getTopics()
for word in dictonary:
    print("{} - {}".format(str(dictonary[word]), word))
