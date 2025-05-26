import { db } from "../utils/user.db.js";

const insertSeedExercises = async () => {
  const seedExercises = [
    {
      title: "🧩 Exercise 1: The Web Awakens - Creating Your First HTML Page",
      description:
        "Every adventure begins somewhere. This one begins with your first-ever HTML page. Let's put it together and start your journey on the web!",
      starterCode: `<!DOCTYPE html> <!-- Declares the document type as HTML5 -->
        <html> <!-- Root element of the HTML document -->
          <head> <!-- Contains metadata and title -->
            <title>My Web Adventure</title> <!-- Title of the webpage displayed on the browser tab -->
          </head>
        
          <body> <!-- The main content of the webpage -->
            <!-- This is how you write a comment in HTML -->
            <!-- Comments are ignored by the browser and used to explain code -->
            <h1>The Journey of HTML Begins</h1> <!-- Main heading for the page -->
            <!-- Hint: Start with a basic HTML skeleton like this -->
          </body> <!-- End of body -->
        </html> <!-- End of HTML document -->`,
    },
    {
      title: "🧩 Exercise 2: Speak Loud and Clear - Meet the Headings!",
      description:
        "Headings are like signboards on the road. They help you organize your ideas and guide your readers. Time to try out headings from big to small.",
      starterCode: `<body> <!-- Starts the body where content is displayed -->
        <h1>Main Title</h1> <!-- Largest heading -->
        <h2>Subheading Level 1</h2> <!-- Second largest heading -->
        <h6>The smallest whisper of a heading</h6> <!-- Smallest heading -->
      
        <!-- Hint: Try adding <h3> and <h4> between them to complete the heading hierarchy -->
      </body> <!-- Ends the body -->`,
    },
    {
      title: "🧩 Exercise 3: The Grocery Scroll - Unleashing Lists",
      description:
        "It's time to organize your pantry and cooking steps using lists! You'll use both unordered and ordered lists to do this.",
      starterCode: `<body>

        <h2>My Grocery List</h2> <!-- Heading for the grocery list -->
        <ul> <!-- Unordered list with bullet points -->
          <li>Milk</li>    <!-- First list item -->
          <li>Eggs</li>     <!-- Second list item -->
          <!-- Add your favorite snack here --> 
          <li></li> <!-- ← User adds another list item here -->
        </ul>
      
        <h2>Steps to Make a Sandwich</h2> <!-- Heading for the step-by-step list -->
        <ol> <!-- Ordered list with numbers -->
          <li>Take two slices of bread</li>
          <li>Spread butter or sauce</li>
          <li>Place your favorite filling</li>
          <li>Put slices together and enjoy!</li>
        </ol>
      
        <!-- Hint: Use <li> tags to list grocery items and sandwich steps. -->
      </body>`,
    },
    {
      title: "🧩 Exercise 4: Picture Perfect - Adding an Image",
      description:
        "Images speak louder than text sometimes. Time to decorate your webpage with an image of your favorite thing!",
      starterCode: `<body>

        <h2>This is My Favorite Animal</h2>  <!-- Heading for the image -->
        
        <img src="https://unsplash.com/photos/a-girl-takes-a-photo-with-her-camera-oGeVYS5PoEI" alt="A girl with camera" width="300"> 
        <!-- Image of a girl with camera from Unsplash; replace the URL with your own image link or path -->
      
        <!-- Hint: Use <img src="..." alt="..."> to embed your image. -->
      
      </body>`,
    },
    {
      title: "🧩 Exercise 5: The Great Divide - Sections, Classes & Divs",
      description:
        "Think of your webpage like rooms in a house. Sections and divs help organize each room",
      starterCode: `<body>
      <section class="about-me"> <!-- A semantic section for personal info -->
        <h2>About Me</h2> <!-- Section title -->
        <p>I am learning frontend development and loving it!</p> <!-- Description inside the section -->
      </section>
    
      <div class="fun-facts"> <!-- A generic container for extra content -->
        <h3>Fun Facts</h3> <!-- Heading for fun facts -->
        <ul> <!-- List of fun facts -->
          <li>I can solve a Rubik's Cube</li>
          <li>I love coffee</li>
          <!-- Add another fun fact about yourself -->
          <li></li> <!-- ← User fills in their own fact -->
        </ul>
      </div>
    
      <!-- Hint: Use <section> and <div> tags to group related content and organize your webpage like rooms. -->
    </body>`,
    },
    {
      title: "🧪 Exercise 6: What is CSS?",
      description:
        "Imagine your website is a plain cake — CSS is the frosting and decorations that make it irresistible! CSS (Cascading Style Sheets) controls how your HTML looks, from colors and fonts to layouts and animations.\nLet's start by adding some global styles to your webpage to make it visually appealing.",
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>CSS Basics</title>

  <style>
    /* This styles the entire body of the webpage */
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Sets a clean font for all text */
      background-color: #f0f8ff; /* Adds a light blue background */
      color: #333; /* Sets default text color to dark grey */
      margin: 20px; /* Adds space around the content */
    }

    /* Style for all headings */
    h1, h2 {
      color: #1e90ff; /* Dodger blue color for headings */
    }

    /* Hint: Use the style tag inside <head> to add CSS and try changing colors or fonts! */
  </style>
</head>
<body>

  <h1>Welcome to CSS!</h1>
  <h2>Making websites beautiful, one style at a time</h2>

  <p>Notice how the background and text colors change the whole mood of the page.</p>

</body>
</html>`,
    },
    {
      title: "🧪 Exercise 7: Styling Lists Like a Pro",
      description:
        "Lists organize your content like a neat shelf. But plain bullet points are boring! Let's spice them up with custom colors, spacing, and styles.",
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>Styled Lists</title>

  <style>
    /* Style all unordered lists */
    ul {
      list-style-type: square; /* Changes bullets from default circles to squares */
      padding-left: 20px; /* Adds space on the left */
      color: green; /* Changes bullet text color */
      font-weight: bold; /* Makes list items bold */
    }

    /* Style all list items */
    li {
      margin-bottom: 10px; /* Adds space between list items */
    }

    /* Hint: Try different list-style-type values and adjust spacing to make lists easier to read. */
  </style>
</head>
<body>

  <ul>
    <li>Learn HTML basics</li>
    <li>Master CSS styling</li>
    <li>Build interactive pages</li>
    <!-- Add your favorite item below -->
  </ul>

</body>
</html>`,
    },
    {
      title: "🧪 Exercise 8: Perfect Your Navbar",
      description:
        "Your navbar is your website's compass. Let's style it so users can easily navigate while making it visually sleek.",
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>Navbar Styling</title>

  <style>
    /* Style the navigation bar */
    nav {
      background-color: #333; /* Dark background */
      overflow: hidden; /* Clear floats */
      padding: 10px 0;
    }

    /* Style the links inside the navbar */
    nav a {
      color: white; /* White text color */
      text-decoration: none; /* Remove underline */
      padding: 14px 20px; /* Spacing around links */
      float: left; /* Align links horizontally */
      font-weight: bold;
      font-family: Arial, sans-serif;
    }

    /* Change link color on hover */
    nav a:hover {
      background-color: #575757; /* Dark grey background on hover */
    }

    /* Hint: Use nav and style a tags with hover effects for interactive navigation. */
  </style>
</head>
<body>

  <nav>
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </nav>

</body>
</html>`,
    },
    {
      title: "🧪 Exercise 9: Beautiful Sections with Classes and Divs",
      description:
        "Websites are like stories broken into chapters. Sections and divisions (<section>, <div>) help organize content — now let's style them!",
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>Styled Sections</title>

  <style>
    /* Style all sections */
    section {
      background-color: #e0f7fa; /* Light cyan background */
      padding: 20px; /* Space inside section */
      margin-bottom: 15px; /* Space below each section */
      border-radius: 8px; /* Rounded corners */
      box-shadow: 0 2px 5px rgba(0,0,0,0.1); /* Subtle shadow */
    }

    /* Style section headings */
    section h2 {
      color: #00796b; /* Teal color */
      font-family: 'Verdana', sans-serif;
    }

    /* Hint: Use section tags and style with backgrounds, padding, and shadows to separate content visually. */
  </style>
</head>
<body>

  <section>
    <h2>About Our Journey</h2>
    <p>This section tells a story about learning web development.</p>
  </section>

  <section>
    <h2>Next Steps</h2>
    <p>What you will learn in the upcoming exercises.</p>
  </section>

</body>
</html>`,
    },
    {
      title: "🧪 Exercise 10: Color Me Stylish - Changing Colors",
      description:
        "Colors set the mood of your website. Let's learn how to change text and background colors dynamically using CSS.",
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>Colorful Web</title>
  <style>
    /* Set background color */
    body {
      background-color: #ffebcd; /* Blanched almond color */
      color: #8b4513; /* Saddle brown text color */
      font-family: 'Georgia', serif;
      padding: 20px;
    }

    /* Style headings */
    h1 {
      color: #d2691e; /* Chocolate color */
    }

    /* Hint: Use color and background-color CSS properties to change your webpage colors. Try different hex or color names! */
  </style>
</head>
<body>

  <h1>Welcome to a Colorful World</h1>
  <p>Playing with colors can make your website pop and feel lively.</p>

</body>
</html>`,
    },
  ];

  await db.exercise.createMany({ data: seedExercises });

  console.log("Seeded 10 placeholder exercises");
};

//here i used immediately invoked function expression
(async () => {
  try {
    await insertSeedExercises();
  } catch (error) {
    console.error(" Seeding failed:", error);
    process.exit(1); // it is a good practise to write this so that when I scale up in future and automate it, it helps there
  } finally {
    await db.$disconnect();
  }
})();
