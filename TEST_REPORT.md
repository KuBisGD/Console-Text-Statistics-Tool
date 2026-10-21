# Test Report

<!--
    Commit this file to the root of your application's GitHub repository, alongside its code.
    Every requirement listed in your README.md needs at least one test case below. Giving each
    requirement a short ID in the README (e.g. R1, R2) makes the "Requirement" column easy to fill
    in and to check.
-->

## Summary

*Briefly describe how you tested your application – manually through its interface, automatically,
or both – clearly enough that someone else could carry out the same tests. What was hardest to
test, and why?*

Answer:
To test the application manual tests were used in combination with automatic unit tests. The manual tests follow the use cases to ensure that expected behavior is functional. The application was also tested gradually as new features was added the the console flow.

To manually test the application open the use cases and follow each scenario flow. Account for any potential preconditions that may be required.


Manual tests where used to test the main application flow while the automatic unit tests tests core components in more detail as well as some UI flows to further confirm that 3rd-party modules still work after potential updates.
The automatic test can be executed by running `npm run test`/`npm test` the root directory of the application after installing all dependencies.


![Test results](image.png)

The reason that most UI is tested manually is that the tests are dependant on the visual style of the output/options to determine if the result is correct. This was used on the statistics UI only because it is directly linked to the 3rd-party module. 
During development testing was done manually as features got implemented, this is done because output format is not final and unit tests would have to be updated multiple times while the manual tests can quickly confirm a vague placeholder output. This part was not necessarily as hard as it was annoying to test.

## Test Results

<!-- **Example** (shows what filled-in rows can look like – remove this example table before
submitting):

| Test case                            | Requirement | Input                                                     | Expected outcome                                                   | Actual outcome                                                               |
| ------------------------------------ | ----------- | --------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| Show temperature chart for a city    | R1          | Selected "Växjö" in the city list and clicked "Show".     | A bar chart of the last seven days' temperatures for Växjö.         | ✅ As expected.                                                              |
| Unknown city name                    | R3          | Typed "Atlantis" in the search field and pressed Enter.   | A clear message that the city wasn't found; no chart is drawn.      | ❌ An empty chart was drawn – fixed, the message is now shown instead.       |

**Your test results:** -->

| Test case | Requirement | Input | Expected outcome | Actual outcome |
| --------- | ----------- | ----- | ---------------- | -------------- |
| Text can be provided and saved | R1 | Selected load form line and typed in "Hello world!", followed by "Goodbye world." and then a  "" (blank line) | Message confirming loaded text. | ✅ As expected. |
| Statistics can be shown | R2 | Use previously loaded text and navigate to statistics menu | Correct statistics for "Hello world! Goodbye world." | ✅ As expected. |
| Loaded text can be saved | R3 | Navigate to save menu and save the currently loaded text with the name "testing_save" | Confirmation message is shown and new save file can now be found when loading saves | ✅ As expected |
| Console navigation | R4 | Was tested in previous cases but now enter an invalid menu option anywhere (ex, -1 or "kamel") | Prompt to reenter a valid input is shown | ✅ As expected |

## Known Issues in Third-Party Modules

*List any flaws you found in the other student's module that affected your application, how they
show up, and how you handled them (e.g. a workaround, or a link to an issue you filed in the
module's repository). Write "None found" if there weren't any.*

Answer:
At the time of implementation the module had some limitations regarding new lines counting as a new sentence and usage of `Mr.` similar constricts would also end a sentence. The first limitation was solved by not saving the text as multiline by default but rather taking multiple lines and saving them as one line. It is however possible to work around this fix by for example editing the a saved file. The second limitation was not fixed in the application code.
When calculating the estimated time to read a text invalid words per minute times were not handled well and hade to be validated by the main application instead.

All issues were known at the time of implementation and appears to have been fixed in a later update that was not used in this application.