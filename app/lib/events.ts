export default function fetchData() {
    return [{ 'title': 'Intro to SQL workshop', 'description': 'Are you interested in learning the basics of SQL? Do you want to learn how to manage databases and gain valuable skills for CSC343? Then this Intro to SQL workshop is just for you!', 'location': 'MN2130', 'date': '14 Feb', 'time': '17:00 - 18:00' },

    { 'title': 'GDSC UTM: Graph-orithms!', 'description': 'Some of the most common technical interview questions are graph problems! Crack tough graph problems using DFS and BFS templates, and learn topological sorting.', 'location': '', 'date': '20 Feb', 'time': '2:00 - 3:00 PM' }, { 'title': 'GDSC UTM: The Hidden Power of Google Apps Script', 'description': 'Learn how to automate data collection using Javascript and Google Sheets Apps Script API.', 'location': '', 'date': '21 Feb', 'time': '1:00 - 2:00 PM', 'img_src': '/images/img4.png' }, { 'title': 'GDSC UTM: Intro to React', 'description': 'Learn the basics of React such as components, navigation, states, and more. Plus, you�ll come out of the workshop with a basic portfolio site deployed using GitHub pages!', 'location': '', 'date': '22 Feb', 'time': '2:00 - 3:00 PM', 'img_src': '/images/img3.png' }, { 'title': 'GDSC UTM: Ctrl + Alt + Activism!', 'description': 'If you have a lack of love for big tech & the government, look no further! Grab your favourite tinfoil hat as we dive deep into the political side of the world-wide-web, discuss the history of online activism, various theories, the history of online politics, historical figures, what you can do, and more!', 'location': '', 'date': '23 Feb', 'time': '1:30 - 2:30 PM', 'img_src': '/images/img5.png' },

    { 'title': 'GDSC UTM: Intro to Large Language Models', 'description': 'GDSC UTM is hosting our third machine learning workshop, this time covering Intro to Large Language Models.', 'location': 'DH2060', 'date': '1 Mar', 'time': '18:00 - 19:00', 'img_src': '/images/hero-img.png' }]
}

export function getFeaturedImages() {
    const events = fetchData();
    // Get the last 5
    const featured = events.slice(-5);
    // Return just the image paths
    return featured.map((event) => event.img_src);
}