
SUN-XREF-MF
===========

### New Style SUN dictionary

This program allows one to view the SUN dictionary looking for mismatches with the contents of an image for a given unicode.

#### Assumptions:

*   Primary file can be either **.csv** or **.xlsx**. If **XLSX** then the sheet name must be **"Sheet1"**.
*   The primary file is created by parsing the **SUN???.sfd** file.
*   The SUN Diictionary file must be an .xlsx file. The first sheet named **'Table\_of\_Contents'**
*   Format of the dictionary file is as featured in the **"SUN\_DB\_Rosetta\_Stone\_06.25.2024.xlsx"** spreadsheet.
*   The font files are not necessary except for viewing the image for comparison with the Contents
*   If the font files are used, both the **WOFF** and **TTF** font files must be present.

#### Features:

*   Browse or Drag and Drop dictionary file, primary word file and font file into the page.
*   Search all Columns.
*   Sort a column by clicking on column header.
*   Identified miscompares are shown in red.
*   Clicking on a red line in the SUN Directory will show the differences.

#### Instructions

Both the SUN dictionary and the Primary Word list must be loaded for comparison to work.

Contents (Made From) data is assumed within parenthasis separated by commas.  
Comparisons are made of consistant "Contents" entries in order and "Contents" entries are unique for a unicode.

There are four tabs to allow viewing data in different ways.

*   The "SUN Directory" tab shows the original dictionary in linear form.
*   The "Primary Words" tab shows a list of the primary words combined with the "Contents column from the SUN directory.
*   The "Error List" tab is a list of the miscompares "Content" miscompares.
*   The "Contains" tab shows all the all the uicodes for a particular content.

#### Usage

Drag and Drop files any where on page or click the browse button The program will determine the type of file based on assumptions above.  
Selecting "SUN Dictionary" tab will display the SUN Dictionary - parsed into a linear array.  
Selecting "Primary Words" tab will gather the contents for each unicode.

In the SUN directory tab, miscompare errors will be highlighted with red. If the "Show Errors" box is checked only the error rows will be shown making it easier to find the errors.
