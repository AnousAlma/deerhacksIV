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

async function parseUserAnswers(
  studentYear: string,
  studentMajor: string,
  hobies: string,
  freeTime: string,
  description: string,
  socialActivity: string,
  superpower: string
): Promise<TagsResponse> {
  const apiKey = process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY';
  if (apiKey === 'YOUR_OPENAI_API_KEY') {
    throw new Error('Please provide your OpenAI API key');
  }

  const prompt = `We asked a user the following questions and they gave us the following answers to the questions:
      What year of study are you in?
      ${studentYear}
      What's your major or area of study?
      ${studentMajor}
      What are your hobbies? (Write up to 10 words)
      ${hobies}
      What's your favorite way to spend free time?
      ${freeTime}
      How would your friends describe you?
      ${description}
      What's your go-to social activity?
      ${socialActivity}
      If you could have a superpower, what would it be?
      ${superpower}

  
  Your task:
  Pick 5 to 7 tags from the following list that you feel like the user would be interested in based on their answers.
  
  Tags:
  ["Academic", "Art", "Music", "Dance", "Theatre", "Film", "Poetry", "Culture", "Debate", "Robotics", "Coding", "Hackathon", "Engineering", "Science", "Math", "Writing", "Literature", "History", "Philosophy", "Politics", "Environment", "Sustainability", "Volunteer", "Charity", "Networking", "Career", "Business", "Entrepreneurship", "Finance", "Investment", "Sports", "Fitness", "Yoga", "Running", "Soccer", "Basketball", "Tennis", "Hiking", "Gaming", "Chess", "Photography", "Design", "Fashion", "Food", "Cooking", "Travel", "Language", "Meditation", "Wellness", "Community"]
  
  Output Format:
  [<tag1>, <tag2>, <tag3>... and so on up to 7 tags]
  
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

// Usage example
parseUserAnswers(
  'Sophomore',
  'Computer Science',
  'reading, hiking, gaming, painting',
  'Playing sports or working out.',
  'The life of the party.',
  'Grabbing coffee or food with friends.',
  'Teleportation—I’d never be late to events!'
)
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

export default parseUserAnswers;