# chatbot_api.py
import google.generativeai as genai
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Configure Gemini
genai.configure(api_key="AIzaSyDvDmeZDZI_qrMNxwZ0xu_W5fnUYGvHsoI")
model = genai.GenerativeModel("gemini-2.0-flash-lite")  # or "gemini-1.5-pro"

app = FastAPI()

# Allow your frontend's origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input model
class ChatInput(BaseModel):
    message: str

# Simple chatbot logic (replace this with a model call if needed)
def get_bot_response(message: str) -> str:
    msg = message.lower()
    if "hello" in msg or "hi" in msg:
        return "Hello! welcome to pirates How can I help you today?"
    elif "bye" in msg:
        return "Goodbye! Have a nice day!"
    elif "/app" in msg:
        return "bot is under maintenance"
    elif "/web" in msg:
        return "bot is under maintenance"
    elif "/help" in msg:
        return "/app for data related to application development " \
        "/web for data related to website development"
    elif "your name" in msg or "who are you" in msg:
        return "I am a chati created to improve your experience with pirates"
    else:
        try:
            response = model.generate_content(message)
            return response.text
        except Exception as e:
            return f"Error: {str(e)}"

# Route for chatbot interaction
@app.post("/chat/")
def chat(input: ChatInput):
    response = get_bot_response(input.message)
    return {"response": response}



    






    