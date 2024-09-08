# Find Adidas Store App

This application helps users find the nearest Adidas store using Google Maps and its API. The app provides location-based search for Adidas stores and allows users to authenticate using Firebase Authentication with options for email/password, Google Sign-In, and Facebook Sign-In.

## Features

- **Google Maps Integration**: The app uses Google Maps and its API to find Adidas stores near the user's location.
- **Firebase Authentication**: Includes authentication via Email/Password, Google Sign-In, and Facebook Sign-In.
- **Location Permission**: When the user first starts using the app, they are prompted for location permission to determine their current location.
- **Adidas Store Search**: Based on the user's current location, the app searches for the nearest Adidas store and recommends the closest one, while also listing other nearby stores.
- **Google Maps Directions**: Users can click on the listed stores, which will open Google Maps for navigation to the selected store.
- **Live Demo**: The project has been deployed for easy access. [Check it out here](https://find-adidas-store-m8yx.vercel.app/home).

## How It Works

1. The app asks for the user's location when they first use the app.
2. Google Maps API is used to search for the nearest Adidas stores based on the user's current location.
3. The nearest recommended store is displayed, along with a list of other nearby stores.
4. Users can click on any store in the list to open Google Maps and get directions to that store.

## Installation Instructions

To run the app locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/lwinhtet/find-Adidas-store.git
   ```

2. Navigate into the project directory:

   ```bash
   cd find-Adidas-store
   ```

3. Install the necessary dependencies:

   ```bash
   npm install
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

## Technologies Used

- **Next.js**: A React framework used for building the app.
- **Firebase Authentication**: For user authentication (Email/Password, Google, and Facebook).
- **Google Maps API**: To search for and display nearby Adidas stores.
- **Tailwind CSS**: For styling the app.
- **Vercel**: Used for deploying the app.

## Project Duration

This project was completed in **3 days** of hard work and dedication. I hope you enjoy testing it!
