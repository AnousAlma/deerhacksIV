import axios, { AxiosError, AxiosResponse } from 'axios';

type Tag = string;
type TagsResponse = Tag[];

// Define the OpenAI API response structure
interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

async function parseEventDetails(
  title: string,
  description: string,
  location: string,
  date: string,
  time: string
): Promise<TagsResponse> {
  const apiKey = "YOUR_OPENAI_API_KEY";
  if (apiKey === 'YOUR_OPENAI_API_KEY') {
    throw new Error('Please provide your OpenAI API key');
  }

  const prompt = `You have the following data about an event happening:
    {
      "title": ${JSON.stringify(title)},
      "description": ${JSON.stringify(description)},
      "location": ${JSON.stringify(location)},
      "date": ${JSON.stringify(date)},
      "time": ${JSON.stringify(time)}
    }
  
  Your task:
  Pick 3 to 5 tags from the following list that you feel like best describe the event. Then return a list of the tags in the output format below.
  
  Tags:
  ["Academic", "Art", "Music", "Dance", "Theatre", "Film", "Poetry", "Culture", "Debate", "Robotics", "Coding", "Hackathon", "Engineering", "Science", "Math", "Writing", "Literature", "History", "Philosophy", "Politics", "Environment", "Sustainability", "Volunteer", "Charity", "Networking", "Career", "Business", "Entrepreneurship", "Finance", "Investment", "Sports", "Fitness", "Yoga", "Running", "Soccer", "Basketball", "Tennis", "Hiking", "Gaming", "Chess", "Photography", "Design", "Fashion", "Food", "Cooking", "Travel", "Language", "Meditation", "Wellness", "Community"]
  
  Output Format:
  [<tag1>, <tag2>, <tag3>... and so on up to 5 tags]
  
  Strictly adhere to this format and provide output only in JSON array format.
  `;

  try {
    const response: AxiosResponse<OpenAIResponse> = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-turbo',
        messages: [{ role: 'system', content: prompt }],
        max_tokens: 500,
        temperature: 0.0,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const completion = response.data.choices[0].message.content.trim();
    const eventDetails: TagsResponse = JSON.parse(completion);

    return eventDetails;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      'Error fetching data from OpenAI API:',
      axiosError.response ? axiosError.response.data : axiosError.message
    );
    throw error;
  }
}

// // Usage example
// parseEventDetails(
//   '"Do-Nothing Machine" Workshop!',
//   'Come join the UTM Robotics Club for a fun and absurd afternoon of crafting your very own do-nothing machine using solenoids! Watch as your creation flicks a switch, only to immediately flick it back off... again... and again... and again. Channel your inner Sisyphus, but instead of pushing a boulder up a hill, you\'ll be pushing the boundaries of engineering futility.',
//   'University of Toronto Mississauga, Innovation Complex, Room 3120',
//   '2022-11-25',
//   '4:00 PM'
// )
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err));

export default parseEventDetails;