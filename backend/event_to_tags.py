import json
import logging

import requests

logger = logging.getLogger("aggregator.transformer")

class DictToTags:
    def __init__(self, api_key):
        self.api_key = api_key
        self.url = "https://api.openai.com/v1/chat/completions"

    def _create_payload(self, prompt):
        return {
            "model": "gpt-4-turbo",
            "messages": [{"role": "system", "content": prompt}],
            "max_tokens": 500,
            "temperature": 0.0,
        }

    def parse_event_details(self, title, description, location, date, time):
        prompt = f"""You have the following data about an event happening:
            {{
                "title": {title},
                "description": {description},
                "location": {location},
                "date": {date},
                "time": {time}"
            }}
        
        Your task:
        Pick 3 to 5 tags from the following list that you feel like best describe the event. Then return a list of the tags in the output format below.
        
        Tags:
        ["Academic", "Art", "Music", "Dance", "Theatre", "Film", "Poetry", "Culture", "Debate", "Robotics", "Coding", "Hackathon", "Engineering", "Science", "Math", "Writing", "Literature", "History", "Philosophy", "Politics", "Environment", "Sustainability", "Volunteer", "Charity", "Networking", "Career", "Business", "Entrepreneurship", "Finance", "Investment", "Sports", "Fitness", "Yoga", "Running", "Soccer", "Basketball", "Tennis", "Hiking", "Gaming", "Chess", "Photography", "Design", "Fashion", "Food", "Cooking", "Travel", "Language", "Meditation", "Wellness", "Community"]
        
        Output Format:
        [<tag1>, <tag2>, <tag3>... and so on up to 5 tags]
        
        Strictly adhere to this format and provide output only in JSON array format.
        """



        headers = {"Authorization": f"Bearer {self.api_key}", "Content-Type": "application/json"}

        payload = self._create_payload(prompt)

        try:
            response = requests.post(self.url, headers=headers, json=payload, timeout=20)
            response.raise_for_status()  # Check if the request was successful
            completion = response.json()["choices"][0]["message"]["content"].strip()

            # Attempt to parse the returned string into a JSON object
            return json.loads(completion)

        except requests.exceptions.RequestException as e:
            logger.exception("Error fetching data from OpenAI API", exc_info=e)
            raise

        except json.JSONDecodeError as e:
            logger.exception("Error parsing JSON response", exc_info=e)
            raise
