# User Management Module (Digihire Intern Task)

A full-stack application for managing users — built with **FastAPI**, **PostgreSQL**, and **React (Vite + MUI)**.

---

## 🚀 Features
- Add new users with **Full Name**, **Mobile**, **Email**, and **Status (Active/Inactive)**
- Display all users in a professional table with dynamic **status badges**
- Realtime **Dashboard Summary** (Total, Active, Inactive users)
- REST API backend with FastAPI and PostgreSQL

---

## 🧩 Tech Stack
**Frontend:** React.js (Vite, Material UI, Axios)  
**Backend:** FastAPI, SQLAlchemy, Pydantic  
**Database:** PostgreSQL  
**API Communication:** REST (JSON)

---

## ⚙️ Setup Instructions

### 1️⃣ Backend Setup (FastAPI)
```bash
# clone the repo
git clone https://github.com/Hitttesh/user-management-module.git
cd user-management-module

# create and activate virtual environment
python -m venv venv
venv\Scripts\activate

# install dependencies
pip install -r requirements.txt

# setup PostgreSQL database
psql -U postgres
CREATE DATABASE userdb;
CREATE USER usermgr WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE userdb TO usermgr;
\q

# apply schema
psql -U usermgr -d userdb -f schema.sql

# run FastAPI server
uvicorn app.main:app --reload
