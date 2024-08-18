# Movie App - Assignment 2

## Overview

This project is a Single Page Application (SPA) developed using the React framework. The purpose of the assignment is to demonstrate proficiency in React by extending the basic movie app developed in labs.

### Author Information
- **Name:** Peter Fortune
- **Student Number:** 20011462
- **Course:** HDip in Computer Science
- **Institution:** South East Technological University

Demo app: https://movies-app-nu-two.vercel.app/

### Objective
- Implement features from the "Good" grading spectrum.
- Develop new views/pages, a list view, a detail view, and new routes.
- Apply a consistent Git commit history with meaningful messages.

## Project Details

## API Endpoints

### Discover Movies
- **Endpoint:** `discover/movie`
- **Function:** `getMovies`
- **Description:** Fetches a list of movies based on various filters such as title, genre, release date, and language.
- **Parameters:**
  - `filters`: An object containing various filtering options like `title`, `startYear`, `endYear`, `genre`, etc.
  - `sortBy`: Determines the sorting order, default is by popularity.
  - `page`: The page of results to fetch.

### Popular Movies
- **Endpoint:** `movie/popular`
- **Function:** `getPopularMovies`
- **Description:** Fetches a list of movies ordered by popularity.
- **Parameters:**
  - `page`: The page of results to fetch. Default is page 1.

### Movie Details
- **Endpoint:** `movie/:id`
- **Function:** `getMovie`
- **Description:** Fetches details for a specific movie based on the movie ID.
- **Parameters:**
  - `id`: The ID of the movie to fetch details for.

### Movie Genres
- **Endpoint:** `genre/movie/list`
- **Function:** `getGenres`
- **Description:** Fetches a list of all movie genres recorded by TMDB.

### Movie Images
- **Endpoint:** `movie/:id/images`
- **Function:** `getMovieImages`
- **Description:** Fetches images related to a specific movie.
- **Parameters:**
  - `id`: The ID of the movie to fetch images for.

### Movie Reviews
- **Endpoint:** `movie/:id/reviews`
- **Function:** `getMovieReviews`
- **Description:** Fetches reviews for a specific movie.
- **Parameters:**
  - `id`: The ID of the movie to fetch reviews for.

### Upcoming Movies
- **Endpoint:** `movie/upcoming`
- **Function:** `getUpcomingMovies`
- **Description:** Fetches a list of movies that are upcoming.
- **Parameters:**
  - `page`: The page of results to fetch. Default is page 1.

### Now Playing Movies
- **Endpoint:** `movie/now_playing`
- **Function:** `getNowPlayingMovies`
- **Description:** Fetches a list of movies that are currently playing in theaters.
- **Parameters:**
  - `page`: The page of results to fetch. Default is page 1.

### Top Rated Movies
- **Endpoint:** `movie/top_rated`
- **Function:** `getTopRatedMovies`
- **Description:** Fetches a list of movies ordered by rating.


## Routing

### Protected Routes

These routes are accessible only to logged-in users. They provide personalized features such as viewing and managing favourite movies, playlists, and creating or viewing fantasy movies.

- `/movies/favourites` - Displays the user's favourited movies.
- `/reviews/form` - Allows the user to add a new movie review.
- `/reviews/:id` - Displays the details of a specific movie review.
- `/playlist` - Shows the user's playlist of movies.
- `/fantasy-movie` - Allows the user to create a fantasy movie.
- `/fantasy-movie/:id` - Displays the details of a specific fantasy movie.
- `/fantasy-movies/` - Lists all of the user's fantasy movies.

### Public Routes

These routes are accessible to all users, regardless of whether they are logged in. They provide general browsing and movie discovery features.

- `/` - Home page displaying top-rated movies.
- `/movies/popular/page/:page` - Lists popular movies with pagination.
- `/movies/popular` - Redirects to the first page of popular movies.
- `/movies/upcoming` - Displays upcoming movies.
- `/movies/now-playing/page/:page` - Lists movies currently playing in theatres with pagination.
- `/movies/now-playing` - Redirects to the first page of now playing movies.
- `/movies/:id` - Displays the details of a specific movie.
- `/login` - Allows users to log in via Supabase OAuth (GitHub in this case).
- `*` - Any unknown routes redirect back to the homepage.
  
## Third-Party Components

- **Supabase Auth** - Used for user authentication. Users can log in with GitHub and log out. Protected routes are implemented using React Router, ensuring that only logged-in users can access features like favourites, playlists, and fantasy movies.

- **Supabase Database** - Four tables are used in the database to persist data for fantasy movies, favourites, playlists, and reviews for a user.

## Independent Learning

I have had the opportunity to work with React during my work placement, which has greatly contributed to my understanding and proficiency in the technology. The practical experience gained through day-to-day work has been invaluable in reinforcing the concepts and techniques required for this project.

In addition to on-the-job experience, I have supplemented my learning through various other resources:

- **Documentation**: I have extensively read and referred to the official documentation for TypeScript, React Router, Supabase, TanStack Query, and React. These resources have provided deep insights and guided me through best practices in using these technologies.
- **UI.dev**: I subscribed to UI.dev, which offers comprehensive learning material focused on TanStack Query, React Router, and React. The tutorials and lessons provided by UI.dev have been particularly helpful in solidifying my understanding and application of these tools in real-world scenarios.

This combination of hands-on experience and structured learning has equipped me with the skills necessary to successfully complete this assignment.


#### Functionality

- **Fantasy Movie Creation:**
  - Users have the ability to create a custom fantasy movie by inputting various details including the Title, Description, Genre, Release Date, Runtime, Director, Cast, Production Company, and a Poster image. Additionally, they can specify whether the movie has won an Oscar.
  - A real-time preview of the fantasy movie is displayed on the right side of the form as the user enters the details, allowing for immediate visual feedback.
  - Once all the details are entered to the user's satisfaction, the fantasy movie can be saved to the database with a single click.
  - Users can browse and view all the fantasy movies they've created, as well as those created by others.
  - The fantasy movies are presented in a visually appealing card format, consistent with the display of other movies in the app.
  - Clicking on any fantasy movie card will take the user to a detailed view of that movie, showcasing all the information that was input during its creation.

- **Additional Features:**
  - **Pagination:** Pagination is implemented to handle large lists of movies, ensuring efficient navigation through content.
  - **Supabase Auth with GitHub:** The app uses Supabase for authentication, allowing users to log in via GitHub.
  - **Data Persistence:** User data such as favourites, playlists, and fantasy movies are persisted in a Supabase database for logged-in users.
  - **Deployment:** The site is deployed on Vercel for easy access and performance optimization.
  - **User Reviews:** User-generated reviews are displayed alongside reviews fetched from the API, offering a comprehensive view of movie feedback.
  - **Navigation:** The app features a side navigation menu for easy access to different sections.
  - **Feature Visibility:** Certain features are hidden or restricted for users who are not logged in, ensuring a personalised and secure user experience.


### Technical Stack

- **Frontend:** 
  - React
  - React Router
  - Material-UI
  - TanStack Query
  - TypeScript

- **Backend:** 
  - Integrated with a Vercel deployment.
  - Supabase for user authentication and database management.

- **Development Tools:** 
  - Storybook for UI component development and testing.
  - ESLint for code quality.
  - Vite for fast development and build processes.

## Problems Encountered

Earlier in the project, I had successfully implemented filtering functionality, and I even managed to integrate search functionality within this feature, which was also working well. However, when I attempted to split the search from the filter and create two separate components, something went awry. Despite my efforts, I couldn't get both features to work independently as intended.

With the deadline approaching and having spent considerable time getting the fantasy movie feature to work, I decided it was better to strip out the filter feature altogether rather than leave a half-baked solution in place. This decision allowed me to focus on delivering a more polished and complete project in other areas.

## AI Declaration

I used AI to help solve TypeScript issues at the time of deployment and in creating this README. It was helpful when asking questions about the documentation or when I encountered something that I didn't understand. Additionally, some of the CSS in the project was generated with the help of AI.

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

### Environment Variables

You will need to add your Supabase anon key, TMDB API key, and Supabase URL to a `.env` file:

```bash
VITE_TMDB_KEY=
VITE_SUPABASE_URL=
VITE_SUPABASE_KEY=
```

### Database Setup

In addition to the basic installation and setup, you will need to configure the database to fully utilise the app's features.

1. **Create Necessary Tables in Supabase:**
   The application requires specific tables in a Supabase database to function correctly (e.g., for user data management, playlists, and favourites). These tables must be set up according to a predefined schema.

2. **SQL Scripts:**
   The SQL scripts required to create these tables can be provided upon request. Without these tables, certain features of the application may not work as intended.
