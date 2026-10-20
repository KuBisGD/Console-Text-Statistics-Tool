# Use Cases

## System

Console Text Statistics Tool

## Primary actor

User

## UC-01: Enter text manually

**Goal:** Load text into the application for analysis or saving.

**Preconditions:** The application is running.

**Trigger:** The user selects **Manual line input** from the main menu.

**Main success scenario:**

1. The system prompts the user to enter text one line at a time.
2. The user enters one or more lines.
3. The user submits a blank line to finish.
4. The system combines the entered lines into one text and makes it the current text.
5. The system confirms that the text was loaded.

**Postcondition:** The entered text is available for statistics and saving.

## UC-02: Load a saved text

**Goal:** Make a previously saved text the current text.

**Preconditions:** The application is running and at least one saved text is available.

**Trigger:** The user selects **Load text from file** from the main menu.

**Main success scenario:**

1. The system lists the saved text files by name.
2. The user selects a file.
3. The system loads its contents as the current text.
4. The system confirms that the file was loaded.

**Alternate flow: no saved texts are available:**

1. The system informs the user that no saves were found.
2. The user returns to the main menu without loading a text.

**Alternate flow: user returns without selecting a file:**

1. The user selects **Back**.
2. The system returns to the main menu without changing the current text.

**Postcondition:** The selected saved text is available for statistics and saving.

## UC-03: View text statistics

**Goal:** Review statistics for the current text.

**Preconditions:** A text has been entered or loaded.

**Trigger:** The user selects **View text statistics** from the main menu.

**Main success scenario:**

1. The system displays the statistics menu.
2. The user selects one or more statistics to view:
   - Character count
   - Word count
   - Sentence count
   - Frequency of each word, in descending frequency order
   - Average word length
   - Average sentence length, measured in words
   - Estimated reading time
3. For estimated reading time, the system prompts for a reading speed in words per minute.
4. The user enters a reading speed from 1 to 1000 words per minute.
5. The system displays the selected result.
6. The user returns to the statistics menu or selects **Back** to return to the main menu.

**Alternate flow: no text is loaded:**

1. The user selects **View text statistics**.
2. The system informs the user that no content is loaded.
3. The system returns the user to the main menu.

**Alternate flow: invalid menu option or reading speed:**

1. The system asks the user to enter a valid option or reading speed.
2. The user enters another value.
3. The system continues the scenario with the valid input.

**Postcondition:** The current text remains available in the application.

## UC-04: Save the current text

**Goal:** Store the current text for later use.

**Preconditions:** A text has been entered or loaded.

**Trigger:** The user selects **Save loaded text** from the main menu.

**Main success scenario:**

1. The system displays the names of currently saved texts.
2. The system prompts the user for a save name.
3. The user enters a name without a path separator.
4. The system trims surrounding whitespace from the name and saves the current text as a `.txt` file.
5. The system confirms that the text was saved.

**Alternate flow: no text is loaded:**

1. The user selects **Save loaded text**.
2. The system informs the user that no content is loaded.
3. The system returns the user to the main menu.

**Alternate flow: invalid save name:**

1. The user enters a name containing `/` or `\`.
2. The system asks for a valid name.
3. The user enters another name.

**Postcondition:** The current text is stored in the application's saves folder under the chosen name.

## UC-05: Exit the application

**Goal:** Close the application.

**Preconditions:** The application is running.

**Trigger:** The user selects **Exit** from the main menu.

**Main success scenario:**

1. The system closes the application.

**Postcondition:** The application is no longer running.
