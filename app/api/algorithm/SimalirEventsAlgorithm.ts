import { Events } from "./ForYouAlgorithm";

interface Event {
    name: string;
    tags: number[];
}


function simalirEvents(event: Event, events: Events, topN: number = 5): string[] {
    const tagWeights: { [tag: number]: number } = {};

    // Assign weights for tags from clicked events (single weight)
    for (const tag of event.tags) {
        tagWeights[tag] = 1;
    }

    const eventScores: { [eventName: string]: number } = {};

    for (const [eventName, eventTags] of Object.entries(events)) {
        let score = eventTags.reduce((acc, tag) => acc + (tagWeights[tag] || 0), 0);

        if (event.name === eventName) {
            score = 0;
        }

        // Add slight randomness between -0.5 and 0.5
        score += (Math.random() - 0.5);

        eventScores[eventName] = score;
    }

    const sortedEvents = Object.entries(eventScores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, topN)
        .map(event => event[0]);

    return sortedEvents;
}

// Example usage
const events_: Events = {
    "Robotics Workshop": [9, 10, 12],
    "Campus Art Exhibition": [1, 7, 40],
    "Hackathon 2023": [11, 10, 26],
    "Debate Club Meeting": [8, 19, 24],
    "Yoga and Meditation Session": [32, 47, 48],
    "Startup Pitch Competition": [27, 26, 24],
    "Film Screening: Classic Cinema": [5, 6, 7],
    "Environmental Sustainability Panel": [20, 21, 19],
    "Math Problem-Solving Workshop": [14, 12, 15],
    "Cooking Class: Italian Cuisine": [44, 43, 7],
    "Running Club Meetup": [33, 30, 48],
    "Career Fair 2023": [25, 24, 26],
    "Poetry Slam Night": [6, 16, 7],
    "Engineering Expo": [12, 9, 26],
    "Language Exchange Café": [46, 7, 24],
    "Fitness Bootcamp": [31, 32, 48],
    "History Lecture Series": [17, 0, 19],
    "Chess Tournament": [39, 38, 24],
    "Photography Workshop": [40, 1, 41],
    "Theatre Production: Hamlet": [4, 16, 7],
    "AI and Machine Learning Seminar": [10, 12, 26],
    "Volunteer Day: Community Cleanup": [22, 20, 49],
    "Music Concert: Jazz Night": [2, 7, 24]
};

// pick random event
const randomEvent: Event = { name: "", tags: [0] };
const eventsArray = Object.entries(events_);
const randomIndex = Math.floor(Math.random() * eventsArray.length);
randomEvent.name = eventsArray[randomIndex][0];
randomEvent.tags = eventsArray[randomIndex][1];
const recommendedEventsOutput_ = simalirEvents(randomEvent, events_, 5);
console.log(randomEvent);
console.log(recommendedEventsOutput_);