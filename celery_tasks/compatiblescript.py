import os
import json
from sqlalchemy import create_engine, MetaData, Table, delete, insert
from dotenv import load_dotenv
from datetime import datetime

now = datetime.utcnow().isoformat()

# Load environment variables
load_dotenv()
db_url = os.getenv("PYTHON_DATABASE_URL")
engine = create_engine(db_url)
metadata = MetaData()
metadata.reflect(bind=engine)

# Define the QuestionAnswer table
question_answer_table = Table("QuestionAnswer", metadata, autoload_with=engine)

# Sample data to insert
sample_data = [
    {
        "id": 1,
        "email": "anthonytang42@gmail.com",
        "answers": json.dumps({
            "34": "No",
            "35": "No",
            "36": "Lesbian/gay",
            "37": "Straight",
            "38": "Asian",
            "39": "Caucasian",
            "40": "Christianity",
            "41": "Atheist",
            "42": "Democrat",
            "43": "Republican",
            "44": "No",
            "45": "No",
            "46": "No",
            "47": "No",
            "48": "Moderate: 70–75℉",
            "49": "Frequently",
            "50": "Frequently",
            "51": "Often",
            "52": "Yes",
            "53": "Night owl",
            "54": "After 1 am",
            "55": "Headphones",
            "56": "Completely dark",
            "57": "Loud",
            "58": "Very",
            "59": "Slightly cluttered",
            "60": "Night",
            "61": "Socializing",
            "62": "Headphones",
            "63": "Somewhat"
        }),
        "weights": json.dumps({
            "Habits": 10,
            "Smoking": 10,
            "Drinking": 10,
            "Sexuality": 3,
            "International": 3,
            "Race/Ethnicity": 3,
            "Political Affiliation": 7,
            "Religious Affiliation": 3
        }),
        "createdAt": now,
        "updatedAt": now,
    },
    {
        "id": 2,
        "email": "anthony.tang.tx@gmail.com",
        "answers": json.dumps({
            "34": "No",
            "35": "No",
            "36": "Lesbian/gay",
            "37": "Straight",
            "38": "Asian",
            "39": "Caucasian",
            "40": "Christianity",
            "41": "Atheist",
            "42": "Democrat",
            "43": "Republican",
            "44": "No",
            "45": "No",
            "46": "No",
            "47": "No",
            "48": "Moderate: 70–75℉",
            "49": "Frequently",
            "50": "Frequently",
            "51": "Often",
            "52": "Yes",
            "53": "Night owl",
            "54": "After 1 am",
            "55": "Headphones",
            "56": "Completely dark",
            "57": "Loud",
            "58": "Very",
            "59": "Slightly cluttered",
            "60": "Night",
            "61": "Socializing",
            "62": "Headphones",
            "63": "Somewhat"
        }),
        "weights": json.dumps({
            "Habits": 10,
            "Smoking": 10,
            "Drinking": 10,
            "Sexuality": 3,
            "International": 3,
            "Race/Ethnicity": 3,
            "Political Affiliation": 7,
            "Religious Affiliation": 3
        }),
        "createdAt": now,
        "updatedAt": now,
    },
]

def reset_and_seed():
    with engine.begin() as conn:
        # 1. Delete all existing rows
        conn.execute(delete(question_answer_table))
        print("✅ Cleared all existing QuestionAnswer rows.")

        # 2. Insert new rows
        conn.execute(insert(question_answer_table), sample_data)
        print(f"✅ Inserted {len(sample_data)} new entries into QuestionAnswer.")

if __name__ == "__main__":
    reset_and_seed()
