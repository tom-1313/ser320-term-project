# ser320-term-project

# Introduction
The guide will walk you through on how to clone this repository and get started developing the application. This guide assumes you will be using GitBash for the terminal or your another terminal. 

# Cloning the Repository

You can either follow the directions below or watch this 3 minute [video](https://www.youtube.com/watch?v=CKcqniGu3tA) on how to clone a GitHub repository with the terminal.

1. In your web brower, click the green "Code" button at the top of the page and copy the HTTPS url.
2. In your terminal, navigate to the directory where you would like to save the project.
3. Once in the desired directory, type the following command and press enter: ```git clone https://github.com/tom-1313/ser320-term-project.git```
4. Once the respository has been cloned, you should see the project when you type the ls command in the terminal.

You can now open the project with VSCode.

# Note about Project Stucture

The project structure consists of two main folders. The first the the server side program. This folder contains all the code that relates to the database API and any routes. The second folder is the minutes tracker folder. This folder is responsible for all the front end code that includes the React application.

# Installing Node Packages

This is an important step and must be completed before you start working on the project. Please make sure you are in the correct directory before running the commands.

### Installing the Server Packages

1. Inside of the project root directory, navigate into the server folder with the terminal.
2. Once insde the server folder, install all the node packages by running the command: ```npm i```
3. Once all the packages have installed you are now ready to program.

### Installing the minutes-tracker Packages

**Note:** This part is not required till we start working on the front-end React application. The steps are the same as installing the Server packages.

1. Inside of the project root directory, navigate into the minutes-tracker folder with the terminal.
2. Once insde the minutes-tracker folder, install all the node packages by running the command: ```npm i```
3. Once all the packages have installed you are now ready to program.
4. To start the react application use the following command: ```npm start```

