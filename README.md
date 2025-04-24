# experiment-platform

## Project Overview
This project is a survey platform used to collect data on the impact of adaptive AI systems on task performance. Participants are assigned to either an experimental or control group and complete a series of tasks. Based on their performance, the difficulty of the tasks is adjusted dynamically in the experimental group.

## Technologies

Next.js @15: For building the React-based frontend with server-side rendering.

React @19: For component-based UI management.

Tailwind CSS: For styling and layout.

ShadCN: For UI components that integrate with Tailwind.

## Project Structure
The project follows a simple structure that will support the flow of the survey and task management. Each step of the process is encapsulated in an HTML page, with dynamic behavior implemented via React and Next.js.

Pages
index.html
Purpose: Home page for the experiment.

Participants will read the informed consent and agree to join the experiment or disagree.

The survey information is presented with clear explanations of the research topic and procedure.

Key Components:
Research Topic: Information about the study.

Consent Form: Buttons for agreeing or disagreeing with participation.

Actionable Steps:
Implement a ConsentForm component that shows the research topic.

Add conditional rendering to display content based on whether the user has consented.

disagree.html
Purpose: Page displayed if the participant disagrees to participate.

Shows a thank you message and automatically closes the page.

Key Components:
Thank You Message: Express gratitude to the participant.

Auto Close Script: Use JavaScript to close the page after showing the message.

Actionable Steps:
Create a page in React that mimics the content and behavior (auto-close) from the provided HTML.

surveypre.html
Purpose: Show the participant their assigned group (experimental or control).

Show different messages depending on their group.

Key Components:
Dynamic Group Display: Based on the group assignment (experiment or control).

Task Instructions: Different messages for each group, explaining task difficulty handling.

Actionable Steps:
Create a component GroupAssignment to handle dynamic display based on group.

Implement conditional rendering for experimental and control groups.

tasktest.html
Purpose: Pre-task practice where participants solve practice puzzles.

Display practice questions with a time limit.

Key Components:
Task Instructions: Explain the task to the user.

Practice Questions: Display questions with input fields and a timer.

Actionable Steps:
Implement the puzzle task using a PuzzleTask React component.

Set up a timer for each question (use state management to track time and answers).

finish_test.html
Purpose: End the practice phase and move to the actual experiment.

A button to start the main experiment after completing practice.

Key Components:
Completion Message: Notify the participant that practice is finished.

Start Experiment Button: Move to the main task page.

Actionable Steps:
Implement a button that links to the task.html page, which begins the experiment.

task.html
Purpose: The main puzzle task page where participants complete the actual task.

Display puzzles and take answers from participants.

Redirect to the next question after answering.

Key Components:
Dynamic Question Display: Show each puzzle from a list.

Answer Form: Accept text answers and validate them.

Auto Redirect: Redirect to the next question with a small delay.

Actionable Steps:
Create a dynamic Task component that handles question display.

Implement form submission to capture answers.

Add a timer to redirect to the next question.

surveypost.html
Purpose: Post-task survey asking participants for feedback.

Participants will rate their perception of task difficulty and performance.

Key Components:
Likert Scale: Participants rate various aspects of the task.

Submit Form: Collect responses and submit them to the server.

Actionable Steps:
Implement a form with Likert scale ratings using radio buttons.

Collect the feedback and handle form submission.

finish.html
Purpose: Display a completion message after the experiment.

Thank participants and provide final study information.

Key Components:
Completion Message: Express gratitude and provide a summary of the study.

Study Explanation: Detail the research goals and process.

Actionable Steps:
Create a final Completion component to display the study summary.

Provide the option for the participant to exit or finish.
