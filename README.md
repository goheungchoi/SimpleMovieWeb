# Top 20 Movies Web

**Creator**: Goheung Choi

**Version**: *`1.0.0`*

This project uses TMDB API, which provides free access to movie database. 

## Description
This project is centered on personal development of programming skills related to front-end domains, such as UI components design and the creation of animations for smooth and seemless state transitions using HTML/CSS and JavaScript. Especially, the overall project was focused on the implementation of modern visual effects typically found on mainstream websites via JavaScript functions and CSS key frames.

Furthermore, the website is mainly built with React to achieve maximizing reusability and maintainability of UI components. It displays a list of top 20 movies, the data for which is fetched from the TMDB API. In this process, JSON data is efficiently fetched and parsed in accordance with lifecycle rules of React components, ensuring synchronous data flow and rendering while React system is utilized to manage transition and reorganization of the data based on user's actions. By these means, the website attained a dynamic, interactive and responsive UI.

## Features
  - Fetches data from IMDB API and parses the JSON structures into processable objects, such as JavaScript primitive types or arrays.
  - Establishes a smooth transition for opening a popup window on the main page.
  - Showcases many interactive animations corresponding to certain states of actions.
  - Utilizes Redux to maintain fetched API data, preventing the home page from requesting excessive data via API repeatedly when the web is redirected to the other pages.
  - Employs CSSTransition to realize a visually smooth transition to shows a pop-up window.
  - Uses a react router to enable redirecting pages.
