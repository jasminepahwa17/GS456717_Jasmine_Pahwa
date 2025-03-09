To run the code you can simply clone the repo, install dependencies, and run the "npm run dev" command. 


I have used context API for authentication, so that auth state is globally accessible. I have also created an import feature that takes data once and uses it for all the screen and prepopulate them dynamically. I have used reusable hook to use it for every screen where rowData was provided to the AG Grid and I have reused the AG Grid component for every screen. To get unique set of data for calender months grouped by weeks I have created a set of all unique values and created a map of all the values from stores and sku's data to put them together for planning page.
To keep the code reusable and optimized.


If I had 4 more hours I would look for gaps and optimize the performance of each component so it takes less resources and works more efficiently.



It was a fun challenge. Thanks for the opportunity!
