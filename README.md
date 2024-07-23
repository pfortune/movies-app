# Movie App - Assignment 2

## Overview

This project is a Single Page Application (SPA) developed using the React framework. The purpose of the assignment is to demonstrate proficiency in React by extending the basic movie app developed in labs.

### Author Information
- **Name:** Peter Fortune
- **Student Number:** 20011462
- **Course:** HDip in Computer Science
- **Institution:** South East Technological University

### Objective
- Implement features from the "Good" grading spectrum.
- Develop new views/pages, a list view, a detail view, and new routes.
- Apply a consistent Git commit history with meaningful messages.

### Completion Date
- **Due Date:** 18th August 2024

## Project Details

### Features Implemented

#### UI
- **New Views/Pages:** 
  - Most Popular Movies
  - Actors
  - TV Series
- **Detail View:** 
  - Actor Bio
  - TV Series Details
- **Routing:** 
  - New routes including parameterized URLs.
- **Data Hyperlinking:** 
  - Actors linked to movies, movies linked to series, etc.

#### Data Model
- **Additional Data Entity:** 
  - Actor
  - TV series
- **Server State Caching:** 
  - Implemented using React Query.

#### Functionality
- **Filtering and Sorting:** 
  - Added filtering by genre and sorting by popularity.
- **Fantasy Movie:** 
  - Basic implementation where users can create a fantasy movie record.

### Technical Stack

- **Frontend:** 
  - React
  - React Router
  - Material-UI
  - React Query
  - TypeScript

- **Backend:** 
  - Integrated with a Vercel deployment.

- **Development Tools:** 
  - Storybook for UI component development and testing.
  - ESLint for code quality.
  - Vite for fast development and build processes.

## Installation & Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/pfortune/movies-app.git
    cd movies-app
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Start the development server:**
    ```bash
    npm run dev
    ```

4. **Build for production:**
    ```bash
    npm run build
    ```

5. **Preview production build:**
    ```bash
    npm run preview
    ```