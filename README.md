Byte – Competition Platform for Codex Club

Byte is a web-based competition platform built to conduct technical coding competitions in a structured and automated way. It supports multiple rounds, automated evaluation, real-time scoring, and an admin panel for monitoring participants, submissions, and results.

The platform is designed to handle both objective (MCQ-based) and programming (DSA-based) rounds with clear rules, timed execution, automated evaluation, and transparent result tracking.

Features

Two-round competition flow (MCQ + DSA)

Timed MCQ round with client-side evaluation

Automated DSA code evaluation using Piston API

REST API-based backend for submissions and scoring

Admin panel to monitor participants, submissions, and scores

Secure and consistent data storage using MongoDB

Competition Flow

The competition consists of two rounds:

Round 1: MCQ Round

Participants are presented with 20 multiple-choice questions.

Each question has 4 options and only one correct answer.

A timer of 20 or 30 minutes is set based on the competition rules.

Participants answer questions one by one and submit the round.

Evaluation Process

All evaluation is done on the client side after submission.

The client compares selected answers with the correct answers.

A final score is calculated immediately on the client.

The final score is sent to the backend through REST APIs.

The backend stores the score in the database for later access.

This approach keeps the experience fast for participants while still ensuring the score is saved and tracked centrally.

Round 2: DSA (Programming) Round

Participants receive 3 programming questions.

Participants write code solutions directly in the interface.

There is no local compilation or execution option available to the participant (as per competition rules).

Once submitted, the code cannot be edited or recompiled by the participant.

Evaluation Process

The entire solution is sent to the backend along with the question ID.

The backend sends the solution, question, and test cases to the Piston API.

Piston compiles and executes the code against predefined test cases.

The output is matched with expected results.

A score is calculated based on passed test cases.

The backend stores the score and submission details in the database.

This ensures a fair, automated, and centralized evaluation process for all participants.

Admin Panel

The admin panel allows organizers to:

View all participants and their scores.

View round-wise scorecards (Round 1 and Round 2 separately).

See submitted answers for each MCQ question.

See submitted code solutions for each DSA problem.

Review participant performance and validate results.

This helps maintain transparency and control during and after the competition.

Tech Stack

Frontend: React, React Router

Backend: Node.js, Express.js

Database: MongoDB

Code Execution: Piston API

APIs: REST APIs

Version Control: Git, GitHub

High-Level Architecture

The frontend handles user interaction, timers, and MCQ evaluation.

The backend exposes REST APIs for submission, scoring, and data storage.

The backend integrates with Piston API for secure code execution.

MongoDB stores participants, submissions, and scorecards.

The admin panel consumes backend APIs to display results and submissions.

Data Stored

Participants and registration details

MCQ answers and scores

DSA code submissions and execution results

Round-wise scorecards

Timestamps and submission metadata
