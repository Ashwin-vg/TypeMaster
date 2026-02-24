from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List

app = FastAPI()

# ✅ Corrected path to static folder
app.mount("/static", StaticFiles(directory="../static"), name="static")

# Serve HTML pages
@app.get("/", response_class=FileResponse)
async def home():
    return "../static/index.html"

@app.get("/typing-test.html", response_class=FileResponse)
async def typing_test():
    return "../static/typing-test.html"

@app.get("/game/word-game.html", response_class=FileResponse)
async def word_game():
    return "../static/game/word-game.html"

@app.get("/status/leaderboard.html", response_class=FileResponse)
async def leaderboard_page():
    return "../static/status/leaderboard.html"

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
