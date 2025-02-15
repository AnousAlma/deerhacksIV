interface UserData {
    preferences: number[];
    events_clicked: string[];
}

export interface Events {
    [eventName: string]: number[];
}

const TAGS: { [key: number]: string } = {
    0: "Academic",
    1: "Art",
    2: "Music",
    3: "Dance",
    4: "Theatre",
    5: "Film",
    6: "Poetry",
    7: "Culture",
    8: "Debate",
    9: "Robotics",
    10: "Coding",
    11: "Hackathon",
    12: "Engineering",
    13: "Science",
    14: "Math",
    15: "Writing",
    16: "Literature",
    17: "History",
    18: "Philosophy",
    19: "Politics",
    20: "Environment",
    21: "Sustainability",
    22: "Volunteer",
    23: "Charity",
    24: "Networking",
    25: "Career",
    26: "Business",
    27: "Entrepreneurship",
    28: "Finance",
    29: "Investment",
    30: "Sports",
    31: "Fitness",
    32: "Yoga",
    33: "Running",
    34: "Soccer",
    35: "Basketball",
    36: "Tennis",
    37: "Hiking",
    38: "Gaming",
    39: "Chess",
    40: "Photography",
    41: "Design",
    42: "Fashion",
    43: "Food",
    44: "Cooking",
    45: "Travel",
    46: "Language",
    47: "Meditation",
    48: "Wellness",
    49: "Community"
};

function recommendEvents(userData: UserData, events: Events, topN: number = 5): string[] {
    const tagWeights: { [tag: number]: number } = {};

    // Assign weights for preferences (double weight)
    for (const tag of userData.preferences) {
        tagWeights[tag] = (tagWeights[tag] || 0) + 2;
    }

    // Assign weights for tags from clicked events (single weight)
    for (const eventName of userData.events_clicked) {
        for (const tag of events[eventName]) {
            tagWeights[tag] = (tagWeights[tag] || 0) + 1;
        }
    }

    const eventScores: { [eventName: string]: number } = {};

    for (const [eventName, eventTags] of Object.entries(events)) {
        let score = eventTags.reduce((acc, tag) => acc + (tagWeights[tag] || 0), 0);

        // Penalize clicked events
        if (userData.events_clicked.includes(eventName)) {
            score -= 4;
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





const userData: UserData = {
    preferences: [9, 12, 15, 26, 32], // Robotics, Engineering, Writing, Business, Yoga
    events_clicked: ["Robotics Workshop", "Campus Art Exhibition", "Hackathon 2023"]
};

// const userData: UserData = {
//     preferences: [21, 20, 19, 24, 26], // Sustainability, Environment, Politics, Networking, Business
//     events_clicked: ["Environmental Sustainability Panel", "Math Problem-Solving Workshop", 
//         "Cooking Class: Italian Cuisine", "Running Club Meetup", 
//         "Career Fair 2023"]
// };

const events: Events = {
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

const recommendedEventsOutput = recommendEvents(userData, events, 5);
console.log(recommendedEventsOutput);

// indexing a tag example
console.log(TAGS[userData.preferences[0]]); // Robotics