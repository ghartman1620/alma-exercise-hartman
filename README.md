This is an exercise for Gabe Hartman's application to tryalma.ai.

## Getting Started

To run this application, clone into this repository, navigate to the root of the repository, and set up with:
```bash
npm install # This takes a few moments.
```

Run the development server with:

```bash
npm run dev
```

To run ESlint to ensure code style, use one of the following:

```bash
npm run lint # Read and report errors
npm run fix # Read and fix errors that eslint can automatically fix, such as those pertaining to quotes and semicolons. 
```

Open [http://localhost:8080](http://localhost:8080) with your browser.


## Completed Functional Requirements

## Public Lead Form
View the lead submission form at /case-submission, or click the link from the home of the application.

You can submit a case with first name, last name, email, linkedin, interested visas, and an open text area input. On submission, the client validates the form to ensure required fields are provided and the email address
appears valid.

Upon submission, a confirmation is displayed.

## Internal Leads List UI
View the internal leads ui at /login. The credentials are:
* username: admin
* password: alma 
An internal UI is guarded by a mock, insecure authentication system to display the list of leads, including those submitted while the application was active.

## Incomplete Functional Requirements
In the interest of time, I did not complete some of the functional requirements. These are:
* Resume / CV upload
* Admin button to change the state of a case from PENDING to REACHED_OUT
* Style matching that of the mocks
* Pagination of leads

## Technical Requirements Implemented
* NextJS to implement the application
* JsonForms to implement the lead form and login form in a configuration driven way 
* API routes using Next.JS support. The functionality of the APIs is mocked to use an in-memory datastore.
* A mock authentication mechanism to protect the internal leads page. There is a single static auth token, and it is passed using url query parameters, so this is certainly not a secure authentication system.
* Use redux to manage the state of the leads.
* Form validation to ensure required fields are filled in.
* Style components using a css-in-js library, EmotionJS
* ESLint passing code

## Known Issues
* Due to the in-memory datastore and the dev server's optimization of only compiling the code needed for each api once it's called, if you submit a case from the public case submission page before navigating to the internal case list, it may be lost.

## Design Considerations

* I've used NextJS APIs for the population of data into the internal leads page, for authentication, and for submission of the leads form. The internal leads page's API, together with the server side component, allows the data fetching to occur together with rendering in fewer round trip network requests from the client to the server, speeding up rendering. This is certainly important as the number of leads and complexity of the application grows.
* I've used Redux and Redux Toolkit for the management of the state of the leads list in the internal leads list page. While this is initially a relatively simple task, future functional enhancements to this application, including the button to change case status, will involve continuing to manipulate this state. Using redux facilitates:
    * Ensuring more deeply nested component trees to work on the lead list can always access the necessary state with reduced complexity from prop drilling
    * Minimizing the number of client re-renders that the client side components in the leads list UI need to perform using redux selectors. Selectors invoked in a component with useSelector such as selectLeads, only trigger a re-render of the component if the data a component relies on has changed. In a design where the top-level table component must pass the state of the internal lists to all its children, it is very easy to cause far too many component re-renders, reducing page performance.
* I've selected redux toolkit because it reduces much of the boilerplate associated with introducing redux into a react app. I like its division of state and its use of immer to allow reducers to update state using "mutating" syntax. For example, see setLeads in leads.slice.ts
* EmotionJS for component styling. I don't have a strong opinions between css-in-js versus module CSS and emotion versus any other css-in-js library. However, I do prefer both to global styles. Global stylesheets make it very easy for developers to mistakenly overwrite one anothers' styles in a growing application, while module CSS and css-in-js ensure that the CSS a developer writes only affects the component for which it was written.
* JsonForms for building the case submission form in a configuration driven way. I'd not used JsonForms before, and I enjoyed reducing the amount of code necessary to implement a form - a very common task. In my past experience, I've written helper components to make object configuration based forms, and JsonForms handled this nicely.

## Future Functional Improvements
In addition to the listed functional requirements that were not yet implemented, additional future functional improvements that I would like to add:
* The loading experience when submitting a case is very poor and it's unclear that anything is happening. This should certainly be improved to at least add a simple loading spinner.
* Pagination in the leads page. As the number of leads grows, adjusting the page and API so that only a number of leads are fetched at a time will ensure the application's performance does not degrade with scale.


## Future Technical Improvements
If I were to continue working on this application, I would consider the following technical improvements:
* Unit testing. This is essential to ensure an application like this continues to function as it grows and speeds up developer productivity. I'd use jest and react-testing-library to do so - react-testing-library tests components by verifying what a user would see, rather than asserting on the internals of a component like what subcomponents it renders.
* The CaseSubmissionForm component is too large and has too much business logic. Upon a code review and iteration, I would split apart the submission logic and error state management into hooks to reduce the concerns of the component itself to only rendering.
* Naturally, this authentication system is no good at actually securing the internal leads UI. Given an expansion of this application my first choice would be to adopt an existing authentication system such as OAuth.
* There are a few deprecated packages in the dependencies. I'd want to look into those before much longer in future development of this application. 

I appreciate your reading my documents and code. Thank you again for your consideration!
