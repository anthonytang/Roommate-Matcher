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
        "email": "anthony.tang.tx@gmail.com",
        "answers": json.dumps({
            "34": "Yes",
            "35": "Yes",
            "36": "Lesbian/gay",
            "37": "Straight",
            "38": "Caucasian",
            "39": "Asian",
            "40": "Christianity",
            "41": "Hinduism",
            "42": "Democrat",
            "43": "Republican",
            "44": "Yes",
            "45": "Yes",
            "46": "Yes",
            "47": "Yes",
            "48": "Hot: 80℉+",
            "49": "Never",
            "50": "Never",
            "51": "Never",
            "52": "No",
            "53": "Early bird",
            "54": "5–9 am",
            "55": "Complete quiet",
            "56": "Completely dark",
            "57": "Quiet",
            "58": "Not that much",
            "59": "Always clean",
            "60": "Morning",
            "61": "Home",
            "62": "Complete quiet",
            "63": "All day"
        }),
        "weights": json.dumps({
            "Habits": 10,
            "Smoking": 5,
            "Drinking": 5,
            "Sexuality": 3,
            "International": 7,
            "Race/Ethnicity": 10,
            "Political Affiliation": 10,
            "Religious Affiliation": 10
        }),
        "createdAt": now,
        "updatedAt": now,
    },
    {
        "id": 2,
        "email": "art11@rice.edu",
        "answers": json.dumps({
            "34": "No",
            "35": "No",
            "36": "Straight",
            "37": "Lesbian/gay",
            "38": "Asian",
            "39": "Caucasian",
            "40": "Hinduism",
            "41": "Christianity",
            "42": "Republican",
            "43": "Democrat",
            "44": "No",
            "45": "No",
            "46": "No",
            "47": "No",
            "48": "Cold: <65℉",
            "49": "Frequently",
            "50": "Frequently",
            "51": "Often",
            "52": "Yes",
            "53": "Night owl",
            "54": "After 1 am",
            "55": "Background noise",
            "56": "Lights on",
            "57": "Loud",
            "58": "Not that much",
            "59": "Messy",
            "60": "Night",
            "61": "Partying",
            "62": "Background noise",
            "63": "Short"
        }),
        "weights": json.dumps({
            "Habits": 3,
            "Smoking": 10,
            "Drinking": 10,
            "Sexuality": 10,
            "International": 10,
            "Race/Ethnicity": 3,
            "Political Affiliation": 7,
            "Religious Affiliation": 7
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
