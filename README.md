# Lightshift Arcade Game

This project was to help teach myself better object-oriented programming structure, game update/draw loops, and general JavaScript.

Implemented using the P5.js framework for the event loop and drawing functionality.

Overall there is a game object that contains many layers of the game for title screen, end screen, and game functionality. Each game layer contains objects associated with its purpose.

## Future Updates

1) A couple portions of spaghetti code associated with collisions that needs to be cleaned up.
2) AI ships that maybe enter after a particular point  and try to ruin your day. A simple following mechanism with collision avoidance for the asteroids seems sufficient enough to start.
3) New items that allow for ship upgrades like weapons or shields. Currently every 1000 pts a one-time use shield drops from an asteroid. Perhaps it would make more sense to have the items drop from enemy ships rather than asteroids.
4) The lightshift RGB effect on all the assets isnt being drawn very efficiently. Improvements could be made.

Any feedback or comments are welcome! This is very much at a version 0.5 state.