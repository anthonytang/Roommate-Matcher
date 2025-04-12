# matching.py

from sqlalchemy import create_engine, MetaData, Table, select
import json
import numpy as np
import os
from dotenv import load_dotenv
from sklearn.metrics.pairwise import cosine_similarity
import redis
import json

# Load environment variables and create the DB engine.
load_dotenv()
db_url = os.getenv("PYTHON_DATABASE_URL")
engine = create_engine(db_url)
metadata = MetaData()
metadata.reflect(bind=engine)

# Query the 'QuestionAnswer' table.
question_answer_table = Table('QuestionAnswer', metadata, autoload_with=engine)

def query_user_answers_and_emails():
    """
    Query the database for the `email` and `answers` fields from the QuestionAnswer table.
    Returns a tuple: (list of answer dictionaries, list of emails).
    """
    with engine.connect() as conn:
        query = select(question_answer_table.c.email, question_answer_table.c.answers)
        results = conn.execute(query).mappings().all()
    emails = []
    user_answers = []
    for row in results:
        emails.append(row['email'])
        answers = row['answers']
        if isinstance(answers, str):
            answers = json.loads(answers)
        user_answers.append(answers)
    return user_answers, emails

# Define the Full Answer Possibilities Mapping
possible_answers = {
    # On-campus questions (IDs 34 to 63)
    "34": ["Yes", "No"],
    "35": ["Yes", "No"],
    "36": ["Lesbian/gay", "Bisexual", "Asexual/aromatic", "Transgender", "Non-binary", "Straight"],
    "37": ["Lesbian/gay", "Bisexual", "Asexual/aromatic", "Transgender", "Non-binary", "Straight"],
    "38": ["Caucasian", "Asian", "East Asian", "South Asian", "Southeast Asian", "Pacific Islander", "Middle Eastern", "African American", "Hispanic/Latino", "Native American"],
    "39": ["Caucasian", "Asian", "East Asian", "South Asian", "Southeast Asian", "Pacific Islander", "Middle Eastern", "African American", "Hispanic/Latino", "Native American"],
    "40": ["Christianity", "Judaism", "Hinduism", "Buddhism", "Islam", "Atheist", "Agnostic"],
    "41": ["Christianity", "Judaism", "Hinduism", "Buddhism", "Islam", "Atheist", "Agnostic"],
    "42": ["Democrat", "Republican", "Liberal", "Conservative", "Socialist", "Green Party", "Libertarian"],
    "43": ["Democrat", "Republican", "Liberal", "Conservative", "Socialist", "Green Party", "Libertarian"],
    "44": ["Yes", "No"],
    "45": ["Yes", "No"],
    "46": ["Yes", "No"],
    "47": ["Yes", "No"],
    "48": ["Hot: 80℉+", "Warm: 75-80℉", "Moderate: 70-75℉", "Cool: 65-70℉", "Cold: 65℉-"],
    "49": ["Never", "Sometimes", "Frequently", "Only of the same sex"],
    "50": ["Never", "Sometimes", "Frequently", "Only of the same sex"],
    "51": ["Never", "Sometimes", "Often"],
    "52": ["Yes", "Depends on who they are", "No"],
    "53": ["Early bird", "Night owl"],
    "54": ["Wake up: 5 - 9 am", "Wake up: 9 am - 12 pm", "Wake up: past 12 pm", "Sleep: 9 pm - 11 pm", "Sleep: 11 pm - 1 am", "Sleep: past 1 am"],
    "55": ["Complete quiet", "Listen to music with headphones", "Background noise/music"],
    "56": ["Completely dark", "Some light", "Lights on"],
    "57": ["Quiet", "Loud"],
    "58": ["Not that much", "Very"],
    "59": ["Always clean and organized", "Slightly cluttered", "Messy"],
    "60": ["Morning", "Night"],
    "61": ["Going home", "Partying", "Socializing", "Studying", "A little bit of everything"],
    "62": ["Complete quiet", "Listen to music with headphones", "Background noise/music"],
    "63": ["Not very long", "Somewhat", "Very long", "The entire day"],
    # Off-campus questions (IDs 1 to 33)
    "1": ["Split costs evenly", "Separate utility expenses (e.g. One pays for hydro, one pays for internet)"],
    "2": ["Let’s share everything - no need to ask", "You can probably borrow my stuff - just ask first", "I won’t say no in an emergency (I prefer to not share)", "Sorry, I don’t ever lend my stuff to others"],
    "3": ["Take turns buying", "Split costs evenly", "Buy our own items separately"],
    "4": ["Take turns buying", "Split costs evenly", "Buy our own items separately"],
    "5": ["Could eat off the floor", "Everything is put away", "A little messy", "Where’s the floor?"],
    "6": ["Always sparkling clean", "Clean and mostly tidy", "Good luck finding stuff", "Salmonella’s best friend"],
    "7": ["Spotlessly clean - daily tidy", "Pretty good - weekly clean", "Not bad - monthly clean", "Not sure - no cleaning products"],
    "8": ["Washed/put away daily", "Washed/dry overnight", "Wash in morning after overnight soak", "Wash only when everything else is dirty"],
    "9": ["Rotate cleaning assignment", "Permanent cleaning assignment", "Decide when need for cleaning arises"],
    "10": ["Daily", "Weekly", "Bi-weekly", "Once a month", "When desired"],
    "11": ["Yes", "Yes, but not in the house", "No"],
    "12": ["Yes", "No"],
    "13": ["Dog", "Cat", "Other furry critter", "Fur-less critter", "None"],
    "14": ["Dogs are fine", "Cats are fine", "Other furry critters are ok", "Fur-less critters are ok", "I don’t want pets around"],
    "15": ["Going home", "Partying", "Studying", "Night in"],
    "16": ["Any time of day or night", "During the day and evening, but not at night", "During the daytime only please", "I need the silence of a library"],
    "17": ["Always!", "Often", "Rarely", "Never"],
    "18": ["Shakes the floor", "Comfortable listening level", "Quiet, background level", "I use headphones"],
    "19": ["Early: between 8pm - 11pm", "Moderate: between 11pm - 1am", "Late: between 1am - 4am", "During daylight hours"],
    "20": ["Early: between 8pm - 11pm", "Moderate: between 11pm - 1am", "Late: between 1am - 4am", "During daylight hours"],
    "21": ["Must be completely quiet", "Some distractions are ok", "Usually study elsewhere", "Who needs to study?"],
    "22": ["I’ll be home 24/7", "Once or twice per day", "Constantly"],
    "23": ["Quiet", "Loud"],
    "24": ["Someone to split the bills and chores", "Someone friendly, but don’t have to be best friends", "Someone who wants to hang out and do stuff with"],
    "25": ["Male", "Female"],
    "26": ["Asian", "Caucasian", "African"],
    "27": ["The more the merrier!", "Guests all the time", "Not a problem, just ask for a heads up", "One or two guests are okay occasionally", "On a rare occasion guests are fine", "I prefer no guests coming over"],
    "28": ["Doesn’t bother me", "Occasionally is fine, but not multiple nights", "Guests staying over regularly is fine", "I’m not comfortable with guests staying over"],
    "29": ["Love them, I’d host every week if I could!", "They’re fine, just provide notice ahead of time", "An occasional dinner/small gathering is fine", "I don’t want to have any parties at my home"],
    "30": ["I have a guest who will stay over frequently (3+ x/week)", "I have a guest who will stay over occasionally (<3x)", "I do not anticipate any guests staying over"],
    "31": ["I’m vegetarian/vegan but meat can be in the house", "I’m vegetarian/vegan and meat can’t be in the house", "I’m Kosher", "I’m Halal"],
    "32": ["All three meals, most days", "Usually dinners", "One or two big meals a week", "Pretty much never"],
    "33": ["I’m game for drinks during the week", "I save it for the weekends", "I drink a few times a month", "I don’t drink, but I don’t mind if you do", "I don’t drink, and I’d like an alcohol-free home"],
}

# Compute Matches: Query, One-hot Encode, and Cosine Similarity
from sklearn.metrics.pairwise import cosine_similarity

def one_hot_encode_user(answers: dict, question_ids: list, possible_answers: dict) -> list:
    user_vector = []
    for q in question_ids:
        choices = possible_answers[q]
        one_hot = [0] * len(choices)
        ans = answers.get(q)
        if ans is not None:
            try:
                index = choices.index(ans)
                one_hot[index] = 1
            except ValueError:
                pass
        user_vector.extend(one_hot)
    return user_vector

def compute_matches():
    # Retrieve user answers and emails.
    user_answers_list, emails = query_user_answers_and_emails()
    
    # If no user answers were returned, return an empty result.
    if not user_answers_list:
        return {"emails": emails, "onCampus": {"userMatrix": [], "simMatrix": []}, "offCampus": {"userMatrix": [], "simMatrix": []}}
    
    # Separate question IDs into on-campus and off-campus.
    on_campus_ids = sorted([q for q in possible_answers if 34 <= int(q) <= 63], key=lambda x: int(x))
    off_campus_ids = sorted([q for q in possible_answers if int(q) < 34], key=lambda x: int(x))
    
    # One-hot encode each user's answers for each group.
    def one_hot_encode_subset(user_ans, question_ids_subset):
        return one_hot_encode_user(user_ans, question_ids_subset, possible_answers)
    
    onCampus_vectors = [one_hot_encode_subset(user_ans, on_campus_ids) for user_ans in user_answers_list]
    offCampus_vectors = [one_hot_encode_subset(user_ans, off_campus_ids) for user_ans in user_answers_list]
    
    # Convert the vectors to NumPy arrays.
    onCampus_matrix = np.array(onCampus_vectors)
    offCampus_matrix = np.array(offCampus_vectors)
    
    # Compute cosine similarity if there is data.
    onCampus_sim = cosine_similarity(onCampus_matrix) if onCampus_matrix.size > 0 else []
    offCampus_sim = cosine_similarity(offCampus_matrix) if offCampus_matrix.size > 0 else []
    
    return {
        "emails": emails,
        "onCampus": {
            "userMatrix": onCampus_matrix.tolist(),
            "simMatrix": onCampus_sim.tolist() if isinstance(onCampus_sim, np.ndarray) else onCampus_sim
        },
        "offCampus": {
            "userMatrix": offCampus_matrix.tolist(),
            "simMatrix": offCampus_sim.tolist() if isinstance(offCampus_sim, np.ndarray) else offCampus_sim
        }
    }

# Celery Task to Precompute Matches and Cache Results
from celery_config import celery_app

redis_client = redis.Redis(host="localhost", port=6379, db=2)
CACHE_KEY = "precomputed_match_results"

@celery_app.task
def precompute_matches():
    results = compute_matches()
    print(results)
    redis_client.set(CACHE_KEY, json.dumps(results))
    return "Precomputation complete."

if __name__ == "__main__":
    print(precompute_matches.apply().get())
