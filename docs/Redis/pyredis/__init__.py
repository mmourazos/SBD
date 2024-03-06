import os
import redis
from dotenv import load_dotenv

load_dotenv()

HOST = os.getenv("REDIS_HOST")
PORT = os.getenv("REDIS_PORT")
PASSWORD = os.getenv("REDIS_PASSWORD")

r = redis.Redis(host=HOST, port=PORT, password=PASSWORD, decode_responses=True)

r.set("foo", "bar")

value = r.get("foo")

print(f"foo: {value}")
