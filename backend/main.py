from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List
import os

app = FastAPI()

# Correct absolute path to static folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "..", "static")

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

# Serve HTML pages
@app.get("/")
async def home():
    return FileResponse(os.path.join(STATIC_DIR, "index.html"))

@app.get("/typing-test.html")
async def typing_test():
    return FileResponse(os.path.join(STATIC_DIR, "typing-test.html"))

@app.get("/game/word-game.html")
async def word_game():
    return FileResponse(os.path.join(STATIC_DIR, "game", "word-game.html"))

@app.get("/status/leaderboard.html")
async def leaderboard_page():
    return FileResponse(os.path.join(STATIC_DIR, "status", "leaderboard.html"))

# Leaderboard backend logic
class Result(BaseModel):
    name: str
    wpm: int
    accuracy: int
    characters: int

leaderboard: List[Result] = []

@app.post("/submit")
async def submit_result(result: Result):
    leaderboard.append(result)
    return {"message": "Result saved"}

@app.get("/leaderboard", response_model=List[Result])
async def get_leaderboard():
    return sorted(leaderboard, key=lambda r: r.wpm, reverse=True)[:10]