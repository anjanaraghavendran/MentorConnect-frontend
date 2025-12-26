🔗 Backend Integration

This frontend application is designed to work with the MentorConnect Backend, which exposes REST APIs for authentication, mentorship management, performance tracking, and feedback handling.

Backend Repository

👉 [https://github.com/anjanaraghavendran/mentorconnect-backend](https://github.com/anjanaraghavendran/MentorConnect-Backend.git)

Backend Technology Stack

Spring Boot

Spring Data JPA

MySQL

RESTful APIs

API Communication

The frontend consumes backend APIs using HTTP requests (via fetch / axios) to:

Authenticate users (Admin / Mentor / Student)

Fetch mentor and student data

Display mentor–student assignments

View academic performance

Submit and retrieve mentor feedback

Local Development Setup

Ensure the backend server is running before starting the frontend:

Backend URL: http://localhost:8080


Update the API base URL in the frontend configuration if required.

🏗 Architecture Overview
React Frontend  →  Spring Boot REST APIs  →  MySQL Database


The frontend and backend are maintained as separate repositories to allow independent development and deployment.
