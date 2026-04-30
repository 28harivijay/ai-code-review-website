from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv
import os
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

llm = ChatGroq(
    api_key=os.getenv("GROQ_API_KEY"),
    model="llama-3.3-70b-versatile"
)

prompt = ChatPromptTemplate.from_template(
    "You are an expert code reviewer. Review this code and give feedback on bugs, readability and improvements:\n\n{code}"
)

chain = prompt | llm

class CodeReviewRequest(BaseModel):
    code: str

@app.get("/health")
def confirm():
    return ("Ok")

@app.post("/review")
def review_code(request: CodeReviewRequest):
    response = chain.invoke({"code": request.code})
    return {"feedback": response.content}