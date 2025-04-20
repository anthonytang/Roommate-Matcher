# celery_config.py

import os
from celery import Celery
from celery.schedules import crontab

# Broker & backend (you can override via REDIS_URL env var if you like)
BROKER_URL = os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0")
RESULT_BACKEND = os.getenv("CELERY_RESULT_BACKEND", "redis://localhost:6379/1")

celery_app = Celery(
    "matching_tasks",
    broker=BROKER_URL,
    backend=RESULT_BACKEND,
)

# Auto‐discover tasks in the ‘celery_tasks’ package
celery_app.autodiscover_tasks(["celery_tasks"])

# Run your matching job every 5 minutes
celery_app.conf.beat_schedule = {
    "recompute-matches-every-5-minutes": {
        # Make sure this matches the module path where precompute_matches lives:
        "task": "celery_tasks.matching.precompute_matches",
        # or if matching.py is at the project root, use "matching.precompute_matches"
        "schedule": crontab(minute="*/5"),
    },
}

celery_app.conf.timezone = "UTC"
