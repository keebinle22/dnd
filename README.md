# DND App v.1.4.0
Created by Kevin Le
## About
Dungeon and Dragon (DND) is a role playing/choose your adventure game where players go on grand adventures through a fantasy world. The main narrator is called the 'Dungeon Master' (DM) and is responsible for defining the rules of the game and the world, guiding the adventures throughout the mystical land, and most importantly, creating a story that will hook players for hours on end. The players will each have their own characters with different background, abilities, and skills. All of these informations have been recorded on sheets of papers. This is will this app comes into play. The application will digitally track each character sheets and allow each player to view and update their sheet throughout the game. Additionally, the DM will be able to view all player's character sheets in parallel when creating the next adventure.

## Change Logs
### 8/13/24
- Added client side form validation for Char Info and Health
- Added character sheet deletion
    - Modified backend where `CharInfoController` will delete all dependant tables
### 8/12/24
- Added client side form validation for Add User and Ability Scores
    - Utilized `useActionData` for validations.
    - Yet to implement validation for Char Info and Health or server side form validation.
### 8/11/24
- Updated add features to include **React Router's Data API's**
    - User can fill out forms for Char Info, Abiltiy Scores, and Health. Additionally, they can review and go back before saving. 
    - Battle Stat table will be created after saving/submitting.
    - `createBrowserRouter`, `Form`, `Outlet`, `redirect`, `actions` and `loaders` were implemented.
    - **Overloaded** `add` function so each respective object can be created with only `userID` as a parameter.
    - Issues:
        - No form validation has been implemented
        - No cancel button has been implemented. Anything filled out in the form will be recorded.
        - No AS influence on Health or BS.
        - UI/UX is horrible.
        - Functions could be moved to better `.js` file
- A girl broke my heart </3

### 8/3/24
- Added edit feature for Ability Scores, Battle Stat, Health, and Char Info.
    - Added submit, cancel and error logic to the UI.
- Added an add feature for AS, BS, Health, and CI.
    - UI for user input but no backend logic has been implemented.
- Refactored 'BrowserRouter' to 'createBrowserRouter'.
### 7/29/24
- Added edit feature for Ability Scores.
    - After editing AS, calculation for skills will be made in the backend and updated in UI.
- Experimented with popups as they will be used for editing.
### 7/27/24
- First git commit.
- Added a home, view, and char sheet page.
    - Char sheet page includes ability score, saving throws, skills, battle stats, health, and char info.
    - Backend CRUD logic has been created but not implemented in frontend

## TODO List
- [ ] Refactor functions to corresponding `.js` files
- [ ] Refactor each `.js` files
- [ ] Rename all `action` and `loader` functions
- [ ]  **60%** Add logic to as, skills, battle stat, health, and char info
- [x] Delete feature
- [ ] Reformat char sheet
- [ ] Improve home screen
- [ ] Add text area for languages and actions
- [ ] Add senses and weapons/cantrips
- [ ] Add security roles (DM/Players)
    - [ ] DM can view all player's char sheet
    - [ ] Players can only access their char sheet
- [ ] Add inventory
- [ ] Add features and traitrs
- [ ] Add character's About Me
- [ ] Add spells
- [ ] Add different class and race types
- [x] Determine if updating skills should occur in frontend or backend
