# celery_config.py
from celery import Celery

# Create a Celery application
celery_app = Celery('matching_tasks',
                    broker='redis://localhost:6379/0',      # Redis as broker
                    backend='redis://localhost:6379/1')     # Optionally, Redis as result backend

# Optional: Configure Celery Beat schedule (if you want to run periodic tasks)
celery_app.conf.beat_schedule = {
    'run-matching-every-hour': {
        'task': 'tasks.precompute_matches',
        'schedule': 3600.0,  # Every hour (in seconds)
    },
}
celery_app.conf.timezone = 'UTC'
