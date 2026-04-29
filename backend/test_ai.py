from dotenv import load_dotenv
import os
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate

# Load your API key from .env file
load_dotenv()

# Connect to Groq AI
llm = ChatGroq(
    api_key=os.getenv("GROQ_API_KEY"),
    model="llama-3.3-70b-versatile"
)

# Create a prompt template
prompt = ChatPromptTemplate.from_template(
    "You are an expert code reviewer. Review this code and give feedback on bugs, readability and improvements:\n\n{code}"
)

# Chain the prompt and the AI together
chain = prompt | llm

# Test it with some sample code
sample_code = """
def add_numbers(a, b):
    return a - b
"""

# Run it
response = chain.invoke({"code": sample_code})
print(response.content)
