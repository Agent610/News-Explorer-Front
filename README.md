News Explorer - Frontend
News Explorer as a whole both is a responsive web application that allows users to search for news articles based on keywords and topics of interest. The application retrives and displays news articles using external APIs, providing users with an easy way to explore current news.

The frontend was developed using React, JavaScript, HTML, and CSS. The backend portion is maintained in a separate repository.

Technologies Used

HTML5 – Application structure
CSS3 – Styling and responsive layouts
JavaScript (ES6+) – Application logic and functionality
React – Component-based user interface development
Vite – Development server and build tooling
APIs – Retrieving news articles and communicating with the backend

Features

News Search
Search for news articles using keywords entered into the search field.
Retrieve and display relevant articles through API requests.
Browse news articles without needing to create an account.

User Authentication
Existing users can sign in using their account credentials.
New users can register for an account.
After successful registration, a confirmation popup appears with the option to sign in or close the popup.

Saved Articles
Authenticated users can save news articles.
Saved articles are accessible through the Saved News page.
Guest users can search and browse articles but must sign in to save them.

Guest Access
Users do not need an account to search for or browse news articles.
Account registration is only necessary for features that require authentication, such as saving articles.

Getting Started
To run this project locally, follow these steps.

Prerequisites:
Node.js
npm

Installation

Clone the repository:
git clone https://github.com/Agent610/News-Explorer-Front.git

Navigate into the project directory:
cd News-Explorer-Front

Install the dependencies:
npm install

Start the development server:
npm run dev

Open the local URL provided by Vite in your browser.

Link to Github:
https://github.com/Agent610/News-Explorer-Front

Link to Live Application
https://news-explorer-tawny.vercel.app/
