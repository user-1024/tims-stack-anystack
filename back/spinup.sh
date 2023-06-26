python3 manage.py migrate
python3 manage.py shell --command 'from core.tools import get_or_create_base_admin; get_or_create_base_admin()'
python3 manage.py shell --command 'from core.tools import get_or_create_test_users; get_or_create_test_users()'

if [ $PRODUCTION = "true" ]; then
    SINGLE_BEAT_REDIS_SERVER="redis://redis-db-svc.$UNIQUE_ID.svc.cluster.local:6379" single-beat celery -A back beat --loglevel=info &
fi

uvicorn conf.asgi:application --reload --port 8000 --host 0.0.0.0
