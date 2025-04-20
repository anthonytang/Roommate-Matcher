# # matching.py

# from sqlalchemy import create_engine, MetaData, Table, select
# import json
# import numpy as np
# import os
# from dotenv import load_dotenv
# from sklearn.metrics.pairwise import cosine_similarity
# import redis
# import json

# # Load environment variables and create the DB engine.
# load_dotenv()
# db_url = os.getenv("PYTHON_DATABASE_URL")
# engine = create_engine(db_url)
# metadata = MetaData()
# metadata.reflect(bind=engine)

# # Query the 'QuestionAnswer' table.
# question_answer_table = Table('QuestionAnswer', metadata, autoload_with=engine)

# def query_user_answers_and_emails():
#     """
#     Query the database for the `email` and `answers` fields from the QuestionAnswer table.
#     Returns a tuple: (list of answer dictionaries, list of emails).
#     """
#     with engine.connect() as conn:
#         query = select(question_answer_table.c.email, question_answer_table.c.answers)
#         results = conn.execute(query).mappings().all()
#     emails = []
#     user_answers = []
#     for row in results:
#         emails.append(row['email'])
#         answers = row['answers']
#         if isinstance(answers, str):
#             answers = json.loads(answers)
#         user_answers.append(answers)
#     return user_answers, emails

# # Define the Full Answer Possibilities Mapping
# possible_answers = {
#     # On-campus questions (IDs 34 to 63)

#     # International
#     "34": ["Yes", "No"],
#     "35": ["Yes", "No"],

#     # Sexuality
#     "36": ["Lesbian/gay", "Bisexual", "Asexual/aromatic", "Transgender", "Non-binary", "Straight"],
#     "37": ["Lesbian/gay", "Bisexual", "Asexual/aromatic", "Transgender", "Non-binary", "Straight"],

#     # Race/Ethnicity
#     "38": ["Caucasian", "Asian", "East Asian", "South Asian", "Southeast Asian", "Pacific Islander", "Middle Eastern", "African American", "Hispanic/Latino", "Native American"],
#     "39": ["Caucasian", "Asian", "East Asian", "South Asian", "Southeast Asian", "Pacific Islander", "Middle Eastern", "African American", "Hispanic/Latino", "Native American"],
    
#     # Religious Affiliation
#     "40": ["Christianity", "Judaism", "Hinduism", "Buddhism", "Islam", "Atheist", "Agnostic"],
#     "41": ["Christianity", "Judaism", "Hinduism", "Buddhism", "Islam", "Atheist", "Agnostic"],

#     # Political Affiliation
#     "42": ["Democrat", "Republican", "Liberal", "Conservative", "Socialist", "Green Party", "Libertarian"],
#     "43": ["Democrat", "Republican", "Liberal", "Conservative", "Socialist", "Green Party", "Libertarian"],

#     # Smoking
#     "44": ["Yes", "No"],
#     "45": ["Yes", "No"],

#     # Drinking
#     "46": ["Yes", "No"],
#     "47": ["Yes", "No"],

#     # Habits
#     "48": ["Hot: 80℉+", "Warm: 75-80℉", "Moderate: 70-75℉", "Cool: 65-70℉", "Cold: 65℉-"],
#     "49": ["Never", "Sometimes", "Frequently", "Only of the same sex"],
#     "50": ["Never", "Sometimes", "Frequently", "Only of the same sex"],
#     "51": ["Never", "Sometimes", "Often"],
#     "52": ["Yes", "Depends on who they are", "No"],
#     "53": ["Early bird", "Night owl"],
#     "54": ["Wake up: 5 - 9 am", "Wake up: 9 am - 12 pm", "Wake up: past 12 pm", "Sleep: 9 pm - 11 pm", "Sleep: 11 pm - 1 am", "Sleep: past 1 am"],
#     "55": ["Complete quiet", "Listen to music with headphones", "Background noise/music"],
#     "56": ["Completely dark", "Some light", "Lights on"],
#     "57": ["Quiet", "Loud"],
#     "58": ["Not that much", "Very"],
#     "59": ["Always clean and organized", "Slightly cluttered", "Messy"],
#     "60": ["Morning", "Night"],
#     "61": ["Going home", "Partying", "Socializing", "Studying", "A little bit of everything"],
#     "62": ["Complete quiet", "Listen to music with headphones", "Background noise/music"],
#     "63": ["Not very long", "Somewhat", "Very long", "The entire day"],

#     # Off-campus questions (IDs 1 to 33)

#     # Sharing / Expenses
#     "1": ["Split costs evenly", "Separate utility expenses (e.g. One pays for hydro, one pays for internet)"],
#     "2": ["Let’s share everything - no need to ask", "You can probably borrow my stuff - just ask first", "I won’t say no in an emergency (I prefer to not share)", "Sorry, I don’t ever lend my stuff to others"],
#     "3": ["Take turns buying", "Split costs evenly", "Buy our own items separately"],
#     "4": ["Take turns buying", "Split costs evenly", "Buy our own items separately"],

#     # Cleanliness / Upkeep
#     "5": ["Could eat off the floor", "Everything is put away", "A little messy", "Where’s the floor?"],
#     "6": ["Always sparkling clean", "Clean and mostly tidy", "Good luck finding stuff", "Salmonella’s best friend"],
#     "7": ["Spotlessly clean - daily tidy", "Pretty good - weekly clean", "Not bad - monthly clean", "Not sure - no cleaning products"],
#     "8": ["Washed/put away daily", "Washed/dry overnight", "Wash in morning after overnight soak", "Wash only when everything else is dirty"],
#     "9": ["Rotate cleaning assignment", "Permanent cleaning assignment", "Decide when need for cleaning arises"],
#     "10": ["Daily", "Weekly", "Bi-weekly", "Once a month", "When desired"],

#     # Lifestyle
#     "11": ["Yes", "Yes, but not in the house", "No"],
#     "12": ["Yes", "No"],
#     "13": ["Dog", "Cat", "Other furry critter", "Fur-less critter", "None"],
#     "14": ["Dogs are fine", "Cats are fine", "Other furry critters are ok", "Fur-less critters are ok", "I don’t want pets around"],
#     "15": ["Going home", "Partying", "Studying", "Night in"],

#     # Noise Levels / Quiet Hours
#     "16": ["Any time of day or night", "During the day and evening, but not at night", "During the daytime only please", "I need the silence of a library"],
#     "17": ["Always!", "Often", "Rarely", "Never"],
#     "18": ["Shakes the floor", "Comfortable listening level", "Quiet, background level", "I use headphones"],
#     "19": ["Early: between 8pm - 11pm", "Moderate: between 11pm - 1am", "Late: between 1am - 4am", "During daylight hours"],
#     "20": ["Early: between 8pm - 11pm", "Moderate: between 11pm - 1am", "Late: between 1am - 4am", "During daylight hours"],
#     "21": ["Must be completely quiet", "Some distractions are ok", "Usually study elsewhere", "Who needs to study?"],
#     "22": ["I’ll be home 24/7", "Once or twice per day", "Constantly"],
#     "23": ["Quiet", "Loud"],

#     # Roommate Preferences
#     "24": ["Someone to split the bills and chores", "Someone friendly, but don’t have to be best friends", "Someone who wants to hang out and do stuff with"],
#     "25": ["Male", "Female"],
#     "26": ["Asian", "Caucasian", "African"],

#     # Socializing
#     "27": ["The more the merrier!", "Guests all the time", "Not a problem, just ask for a heads up", "One or two guests are okay occasionally", "On a rare occasion guests are fine", "I prefer no guests coming over"],
#     "28": ["Doesn’t bother me", "Occasionally is fine, but not multiple nights", "Guests staying over regularly is fine", "I’m not comfortable with guests staying over"],
#     "29": ["Love them, I’d host every week if I could!", "They’re fine, just provide notice ahead of time", "An occasional dinner/small gathering is fine", "I don’t want to have any parties at my home"],
#     "30": ["I have a guest who will stay over frequently (3+ x/week)", "I have a guest who will stay over occasionally (<3x)", "I do not anticipate any guests staying over"],
    
#     # Food / Eating / Cooking
#     "31": ["I’m vegetarian/vegan but meat can be in the house", "I’m vegetarian/vegan and meat can’t be in the house", "I’m Kosher", "I’m Halal"],
#     "32": ["All three meals, most days", "Usually dinners", "One or two big meals a week", "Pretty much never"],
#     "33": ["I’m game for drinks during the week", "I save it for the weekends", "I drink a few times a month", "I don’t drink, but I don’t mind if you do", "I don’t drink, and I’d like an alcohol-free home"],
# }

# # Compute Matches: Query, One-hot Encode, and Cosine Similarity
# from sklearn.metrics.pairwise import cosine_similarity

# def one_hot_encode_user(answers: dict, question_ids: list, possible_answers: dict) -> list:
#     user_vector = []
#     for q in question_ids:
#         choices = possible_answers[q]
#         one_hot = [0] * len(choices)
#         ans = answers.get(q)
#         if ans is not None:
#             try:
#                 index = choices.index(ans)
#                 one_hot[index] = 1
#             except ValueError:
#                 pass
#         user_vector.extend(one_hot)
#     return user_vector

# def compute_matches():
#     # Retrieve user answers and emails.
#     user_answers_list, emails = query_user_answers_and_emails()
    
#     # If no user answers were returned, return an empty result.
#     if not user_answers_list:
#         return {"emails": emails, "onCampus": {"userMatrix": [], "simMatrix": []}, "offCampus": {"userMatrix": [], "simMatrix": []}}
    
#     # Separate question IDs into on-campus and off-campus.
#     on_campus_ids = sorted([q for q in possible_answers if 34 <= int(q) <= 63], key=lambda x: int(x))
#     off_campus_ids = sorted([q for q in possible_answers if int(q) < 34], key=lambda x: int(x))
    
#     # One-hot encode each user's answers for each group.
#     def one_hot_encode_subset(user_ans, question_ids_subset):
#         return one_hot_encode_user(user_ans, question_ids_subset, possible_answers)
    
#     onCampus_vectors = [one_hot_encode_subset(user_ans, on_campus_ids) for user_ans in user_answers_list]
#     offCampus_vectors = [one_hot_encode_subset(user_ans, off_campus_ids) for user_ans in user_answers_list]
    
#     # Convert the vectors to NumPy arrays.
#     onCampus_matrix = np.array(onCampus_vectors)
#     offCampus_matrix = np.array(offCampus_vectors)
    
#     # Compute cosine similarity if there is data.
#     onCampus_sim = cosine_similarity(onCampus_matrix) if onCampus_matrix.size > 0 else []
#     offCampus_sim = cosine_similarity(offCampus_matrix) if offCampus_matrix.size > 0 else []
    
#     return {
#         "emails": emails,
#         "onCampus": {
#             "userMatrix": onCampus_matrix.tolist(),
#             "simMatrix": onCampus_sim.tolist() if isinstance(onCampus_sim, np.ndarray) else onCampus_sim
#         },
#         "offCampus": {
#             "userMatrix": offCampus_matrix.tolist(),
#             "simMatrix": offCampus_sim.tolist() if isinstance(offCampus_sim, np.ndarray) else offCampus_sim
#         }
#     }

# # Celery Task to Precompute Matches and Cache Results
# from celery_config import celery_app

# redis_client = redis.Redis(host="localhost", port=6379, db=2)
# CACHE_KEY = "precomputed_match_results"

# @celery_app.task
# def precompute_matches():
#     results = compute_matches()
#     print(results)
#     redis_client.set(CACHE_KEY, json.dumps(results))
#     return "Precomputation complete."

# if __name__ == "__main__":
#     print(precompute_matches.apply().get())














# matching.py

import os
import json
import numpy as np
from sqlalchemy import create_engine, MetaData, Table, select
from dotenv import load_dotenv
import redis
from celery_config import celery_app

# === Load Environment ===
load_dotenv()
db_url = os.getenv("PYTHON_DATABASE_URL")
engine = create_engine(db_url)
metadata = MetaData()
metadata.reflect(bind=engine)
question_answer_table = Table("QuestionAnswer", metadata, autoload_with=engine)

# === Redis ===
redis_client = redis.Redis(host="localhost", port=6379, db=2)
CACHE_KEY = "precomputed_match_results"

# === Question → Category Mapping ===
question_category_map = {
    "34": "International", "35": "International",
    "36": "Sexuality", "37": "Sexuality",
    "38": "Race", "39": "Race",
    "40": "Religion", "41": "Religion",
    "42": "Politics", "43": "Politics",
    "44": "Smoking", "45": "Smoking",
    "46": "Drinking", "47": "Drinking",
    "48": "Habits", "49": "Habits", "50": "Habits", "51": "Habits",
    "52": "Habits", "53": "Habits", "54": "Habits", "55": "Habits",
    "56": "Habits", "57": "Habits", "58": "Habits", "59": "Habits",
    "60": "Habits", "61": "Habits", "62": "Habits", "63": "Habits",
    "1": "Sharing", "2": "Sharing", "3": "Sharing", "4": "Sharing",
    "5": "Cleanliness", "6": "Cleanliness", "7": "Cleanliness", "8": "Cleanliness", "9": "Cleanliness", "10": "Cleanliness",
    "11": "Lifestyle", "12": "Lifestyle", "13": "Lifestyle", "14": "Lifestyle", "15": "Lifestyle",
    "16": "Noise", "17": "Noise", "18": "Noise", "19": "Noise", "20": "Noise",
    "21": "Noise", "22": "Noise", "23": "Noise",
    "24": "Roommate Preferences", "25": "Roommate Preferences", "26": "Roommate Preferences",
    "27": "Socializing", "28": "Socializing", "29": "Socializing", "30": "Socializing",
    "31": "Food", "32": "Food", "33": "Food",
}

# === Full Possible Answers Dictionary ===
possible_answers = {
    # On-campus (34–63)
    "34": ["Yes", "No"], "35": ["Yes", "No"],
    "36": ["Lesbian/gay", "Bisexual", "Asexual/aromatic", "Transgender", "Non-binary", "Straight"],
    "37": ["Lesbian/gay", "Bisexual", "Asexual/aromatic", "Transgender", "Non-binary", "Straight"],
    "38": ["Caucasian", "Asian", "East Asian", "South Asian", "Southeast Asian", "Pacific Islander", "Middle Eastern", "African American", "Hispanic/Latino", "Native American"],
    "39": ["Caucasian", "Asian", "East Asian", "South Asian", "Southeast Asian", "Pacific Islander", "Middle Eastern", "African American", "Hispanic/Latino", "Native American"],
    "40": ["Christianity", "Judaism", "Hinduism", "Buddhism", "Islam", "Atheist", "Agnostic"],
    "41": ["Christianity", "Judaism", "Hinduism", "Buddhism", "Islam", "Atheist", "Agnostic"],
    "42": ["Democrat", "Republican", "Liberal", "Conservative", "Socialist", "Green Party", "Libertarian"],
    "43": ["Democrat", "Republican", "Liberal", "Conservative", "Socialist", "Green Party", "Libertarian"],
    "44": ["Yes", "No"], "45": ["Yes", "No"],
    "46": ["Yes", "No"], "47": ["Yes", "No"],
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

    # Off-campus (1–33)
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

# === One-hot Encoding ===
def one_hot_encode_user(answers: dict, question_ids: list, possible_answers: dict) -> list:
    vector = []
    for q in question_ids:
        # skip any ID not in possible_answers
        if q not in possible_answers:
            continue
        choices = possible_answers[q]
        one_hot = [0] * len(choices)
        ans = answers.get(q)
        if ans in choices:
            one_hot[choices.index(ans)] = 1
        vector.extend(one_hot)
    return vector

# === Expand Category Weights to Feature Weights ===
def expand_weights_to_questions(question_ids, question_category_map, category_weights, possible_answers):
    full_weights = []
    for q in question_ids:
        if q not in possible_answers:
            continue
        w = category_weights.get(question_category_map[q], 1)
        n_choices = len(possible_answers[q])
        full_weights.extend([w] * n_choices)
    return np.array(full_weights)

# === Query User Answers + Weights ===
def query_user_data():
    with engine.connect() as conn:
        query = select(
            question_answer_table.c.email,
            question_answer_table.c.answers,
            question_answer_table.c.weights
        )
        results = conn.execute(query).mappings().all()

    emails, all_answers, all_weights = [], [], []
    for row in results:
        emails.append(row["email"])
        answers = json.loads(row["answers"]) if isinstance(row["answers"], str) else row["answers"]
        weights = json.loads(row["weights"]) if isinstance(row["weights"], str) else row["weights"]
        all_answers.append(answers)
        all_weights.append(weights)

    return emails, all_answers, all_weights

# === Compute Similarity Matrices ===
def compute_matches(possible_answers, question_ids, emails, all_answers, all_weights, question_category_map):
    # Build only the IDs that exist in possible_answers
    valid_qids = [q for q in question_ids if q in possible_answers]

    user_vectors = [
        one_hot_encode_user(ans, valid_qids, possible_answers)
        for ans in all_answers
    ]
    weight_vectors = [
        expand_weights_to_questions(valid_qids, question_category_map, w, possible_answers)
        for w in all_weights
    ]

    QA = np.array(user_vectors).T        # (features, users)
    weights = np.array(weight_vectors).T # (features, users)

    # Cast to float before normalizing
    weights = weights.astype(np.float64)

    # Normalize each user’s weight vector
    for i in range(weights.shape[1]):
        weights[:, i] /= np.linalg.norm(weights[:, i], ord=2)

    n = QA.shape[1]
    norm_1 = np.zeros((n, n))
    norm_2 = np.zeros((n, n))
    cos_sim = np.zeros((n, n))
    norm_1_w = np.zeros((n, n))
    norm_2_w = np.zeros((n, n))
    cos_sim_w = np.zeros((n, n))

    for i in range(n):
        for j in range(n):
            diff = QA[:, i] - QA[:, j]

            # Unweighted
            norm_1[i, j] = np.linalg.norm(diff, ord=1)
            norm_2[i, j] = np.linalg.norm(diff, ord=2)
            cos_sim[i, j] = (
                np.dot(QA[:, i], QA[:, j]) /
                (np.linalg.norm(QA[:, i]) * np.linalg.norm(QA[:, j]))
            )

            # Weighted
            diff_w = diff * weights[:, i]
            norm_1_w[i, j] = np.linalg.norm(diff_w, ord=1)
            norm_2_w[i, j] = np.linalg.norm(diff_w, ord=2)
            QA_j_new = QA[:, j] - diff * weights[:, i]
            cos_sim_w[i, j] = (
                np.dot(QA[:, i], QA_j_new) /
                (np.linalg.norm(QA[:, i]) * np.linalg.norm(QA_j_new))
            )

    return {
        "emails": emails,
        "userMatrix": QA.T.tolist(),
        "norm1": norm_1.tolist(),
        "norm2": norm_2.tolist(),
        "cosine": cos_sim.tolist(),
        "norm1_weighted": norm_1_w.tolist(),
        "norm2_weighted": norm_2_w.tolist(),
        "cosine_weighted": cos_sim_w.tolist(),
    }

# === Celery Task ===
@celery_app.task
def precompute_matches():
    # Only include IDs that exist in both maps
    question_ids = sorted(
        [q for q in question_category_map if q in possible_answers],
        key=lambda x: int(x)
    )

    emails, all_answers, all_weights = query_user_data()
    result = compute_matches(
        possible_answers,
        question_ids,
        emails,
        all_answers,
        all_weights,
        question_category_map
    )
    print(result)
    redis_client.set(CACHE_KEY, json.dumps(result))
    return "Precomputation complete."

# === Manual Run ===
if __name__ == "__main__":
    print(precompute_matches.apply().get())
