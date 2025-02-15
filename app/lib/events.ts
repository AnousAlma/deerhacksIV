export default function fetchData() {
    return [
      {
        id: 1,
        title: "Robotics Club Meeting",
        description: "Eat Pizza until you drop",
        date: "2025-03-15",
        location: "Auditorium",
        post_tag: "online",
        img_src: "/images/hero-img.png", 
  
      },
      {
        id: 2,
        title: "Bus waiting",
        description: "Wait for the bus that was supposedly going to arrive in 10 minutes",
        date: "2025-04-10",
        location: "outside in the cold",
        post_tag: "discord",
        img_src: "/images/herosdf-img.png", 
      },
      {
        id: 1,
        title: "Robotics Club Meeting",
        description: "Eat Pizza until you drop",
        date: "2025-03-15",
        location: "Auditorium",
        post_tag: "online",
        img_src: "/images/hero-img.png", 
      },
      {
        id: 2,
        title: "Bus waiting",
        description: "Wait for the bus that was supposedly going to arrive in 10 minutes",
        date: "2025-04-10",
        location: "outside in the cold",
        post_tag: "discord",
        img_src: "/images/hero-img.png", 
      },
      {
        id: 1,
        title: "Robotics Club Meeting",
        description: "Eat Pizza until you drop",
        date: "2025-03-15",
        location: "Auditorium",
        post_tag: "online",
        img_src: "/images/hero-img.png", 
      },
      {
        id: 2,
        title: "Bus waiting",
        description: "Wait for the bus that was supposedly going to arrive in 10 minutes",
        date: "2025-04-10",
        location: "outside in the cold",
        post_tag: "discord",
        img_src: "/images/hero-img.png", 
      },
      
      // Add more if needed
    ];
  }
export function getFeaturedImages() {
    const events = fetchData();
    // Get the last 5
    const featured = events.slice(-5);
    // Return just the image paths
    return featured.map((event) => event.img_src);
  }