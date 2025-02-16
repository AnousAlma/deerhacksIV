export default function fetchData() {
    return [
        {
            title: 'Intro to SQL workshop',
            description:
                'Are you interested in learning the basics of SQL? Do you want to learn how to manage databases and gain valuable skills for CSC343? Then this Intro to SQL workshop is just for you!',
            location: 'MN2130',
            startDateTime: '2025-02-14T17:00',
            endDateTime: '2025-02-14T18:00',
        },
        {
            title: 'GDSC UTM: Graph-orithms!',
            description:
                'Some of the most common technical interview questions are graph problems! Crack tough graph problems using DFS and BFS templates, and learn topological sorting.',
            location: '',
            startDateTime: '2025-02-20T14:00',
            endDateTime: '2025-02-20T15:00',
        },
        {
            title: 'GDSC UTM: The Hidden Power of Google Apps Script',
            description:
                'Learn how to automate data collection using Javascript and Google Sheets Apps Script API.',
            location: '',
            startDateTime: '2025-02-21T13:00',
            endDateTime: '2025-02-21T14:00',
            img_src: '/images/img4.png',
        },
        {
            title: 'GDSC UTM: Intro to React',
            description:
                'Learn the basics of React such as components, navigation, states, and more. Plus, you’ll come out of the workshop with a basic portfolio site deployed using GitHub pages!',
            location: '',
            startDateTime: '2025-02-22T14:00',
            endDateTime: '2025-02-22T15:00',
            img_src: '/images/img3.png',
        },
        {
            title: 'GDSC UTM: Ctrl + Alt + Activism!',
            description:
                'If you have a lack of love for big tech & the government, look no further! Grab your favourite tinfoil hat as we dive deep into the political side of the world-wide-web, discuss the history of online activism, various theories, the history of online politics, historical figures, what you can do, and more!',
            location: '',
            startDateTime: '2025-02-23T13:30',
            endDateTime: '2025-02-23T14:30',
            img_src: '/images/img5.png',
        },
        {
            title: 'GDSC UTM: Intro to Large Language Models',
            description:
                'GDSC UTM is hosting our third machine learning workshop, this time covering Intro to Large Language Models.',
            location: 'DH2060',
            startDateTime: '2025-03-01T18:00',
            endDateTime: '2025-03-01T19:00',
            img_src: '/images/hero-img.png',
        },
    ];
}


export function getFeaturedImages() {
    const events = fetchData();
    // Get the last 5
    const featured = events.slice(-4);
    // Return just the image paths
    return featured.map((event) => event.img_src);
}