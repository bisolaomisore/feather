## Setup

After cloning the project to your local machine run `npm install` to get all 
the necessary packages.

We need to generate a token from our Github account for this app to work. Go to the [developer settings](https://github.com/settings/apps) (must be logged in), and you should be able to get one through the Personal access tokens section. Make sure to select everything under user when setting the scope level of the token!

Once we get our token we need to add it to a `.env` file in the root folder of our project as follows:

`REACT_APP_PERSONAL_ACCESS_TOKEN='token_you_just_generated_goes_here'`

## How to use

You can run the project with `npm start`.

There is a view button for each user that pops up a modal with more data about the user, and if that user is currently authenticated there will be form where you can edit the Bio.