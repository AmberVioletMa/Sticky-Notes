# Sticky-Notes
This is a simple project of a dashboard where you can add, modify and remove sticky notes, using markdown text, on real time, created using React Hooks, Node.js, Express, Sockets.io and MongoDB

For this project we will use MongoDB as database, if you don't have it you can download it from here https://www.mongodb.com/try/download/community
Since the project is based on node you also need to have a version of node already installed preferably version 16.14 but most will work fine, If you don't have it, you can download it from here: https://nodejs.org/es/download/

The scope of the project is as follows:
- You can add new notes using the (+) button in the top left corner.
- All the notes are draggable using the icon on the top left corner of the note and the position is automatically saved.
- The notes dont have a title only a body, and the body could be edited by clicking on it, also you can use Markdown formatting of the body and it will be rendered.
- You can remove each note using the button ( x ) in the upper right corner.
- All the changes are automatically saved on the database and reflected to the other user on the page on real time using sockets.
- All the notes show the time of creation at the bottom of each note.
- An indicator in the top center of the page shows the status of the updates, indicating any errors or if the information is successfully updated.
- Notes show a loader next to the drag button while the information in the database is being updated.
- If you try to leave the page while a note is still updating, the page will display a popup asking if you want to stay or go anyway.

Notes:
- The project is tested and have handles only for chrome and firefox.
- To test functionality that depends on the time it takes for the backend to retrieve the data (the last 2 points in the list above) you can add a settimeout before the response of the update call.

## How to run the project

- Clone the repository in a bash console. (git clone https://github.com/AmberVioletMa/Sticky-Notes.git)
- Navigate to the root folder (cd Sticky-Notes/)
- Navigate to the back-end folder (cd back-end)
- Install all the dependencies (npm install)
- Run the server (it will run on port 3010) (node server.js)

- Open a new bash console inside the root folder (Sticky-Notes folder)
- Navigate to the front-end folder (cd front-end)
- Install all the dependencies (npm install)
- Run the front-end (npm start) (it will run on port 3000)
- If the page does not open by itself you can see the page at the following url: http://localhost:3000/
