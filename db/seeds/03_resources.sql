INSERT INTO resources
    (owner_id, category_id, title, description, url)
VALUES
    (1, 1, 'promises', 'javascript bro', 'example.com'),
    (1, 2, 'flexbox', 'css bro', 'example.com'),
    (2, 3, 'tags', 'html bro', 'example.com'),
    (2, 4, 'queries', 'sql bro', 'example.com');

-- ARTICLES
    (1, 1, 'Javascript Style Guide', 'How to write javascript with correct style', 'https://github.com/airbnb/javascript');
    (1, 2, 'Positioning methods in CSS', 'Overview of the different methods to position elements in css', 'https://learn.shayhowe.com/advanced-html-css/detailed-css-positioning/');
    (1, 2, 'CSS Basics', 'Overview of CSS', 'https://learnxinyminutes.com/docs/css/');
    (1, 2, 'Specificity', 'Explanation of specificity in CSS', 'https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/');
    (1, 2, 'Responsive web design', 'Different methods to go about responsive design in web', 'https://developers.google.com/web/fundamentals/design-and-ux/responsive/patterns');

-- VIDEOS
    (1, 1, 'Recursion', 'How to implement recursion in Javascript', 'https://www.youtube.com/watch?v=k7-N8R0-KY4');
    (1, 1, 'Promises', 'How to use promises in Javascript', 'https://www.youtube.com/watch?v=2d7s3spWAzo');
    (1, 1, 'Closers', 'What are closures?', 'https://www.youtube.com/watch?v=CQqwU2Ixu-U');
    (1, 2, 'Architecture', 'How to build good CSS architecture', 'https://www.youtube.com/watch?v=Nxnp-JLgo5I');
    (1, 4, 'Database design basics', 'Basic introduction to Sequel', 'https://www.youtube.com/watch?v=LKZYoeRfmh4');
    (1, 3, 'Tags', 'Intro to tags in HTML', 'https://www.youtube.com/watch?v=dmovVa0jseU');


-- GAMES
    (1, 2, 'Learn Flexbox', 'Interactive game to learn how to use flexbox', 'https://flexboxfroggy.com/');
    (1, 2, 'Learn CSS grid', 'Interactive game to learn how to use css grid', 'https://cssgridgarden.com/');
    (1, 1, 'Elevator saga', 'Game to practise javascript skills', 'http://play.elevatorsaga.com/');
    (1, 1, 'Checkio Game', 'Games to practise javascript coding', 'https://checkio.org/');
    (1, 2, 'CSS DinerGame', 'Games to learn CSS', 'https://flukeout.github.io/');


    (1, 1, 'Learn JavaScript in 1 Hour', 'JavaScript Tutorial for Beginners.', 'https://www.youtube.com/watch?v=W6NZfCO5SIk'),
    --video
    (1, 1, 'JavaScipt', 'JavaScript course for Beginners.', 'https://www.theodinproject.com/courses/javascript'),
    --online course
    (1, 2, 'CSS Into', 'Introduction to Basic CSS.', 'https://www.freecodecamp.org/learn/responsive-web-design/basic-css'),
    --online course
    (1, 2, 'CSS Grid', 'Grid template areas, columns, rows, and aligning items.', 'https://www.youtube.com/watch?v=EFafSYg-PkI'),
    --video
    (2, 3, 'HTML Tutorial', 'Documentation of HTML on W3Schools.', 'https://www.w3schools.com/html'),
    --documentation
    (2, 4, 'MySQL Tutorial for Beginners', 'Full Course on SQL.', 'https://youtu.be/7S_tz1z_5bA'),
    --video
    (2, 4, 'SQL sandbox', 'SQL playground.', 'https://sqlzoo.net'),
    --interactive sandbox
    (2, 4, 'SQL Join types', 'Explains the type of SQL join there are.', 'https://www.dofactory.com/sql/join'),
    --article
    (2, 1, 'Eloquent JavaScript', 'This is a book about JavaScript and programming; Written by Marijn Haverbeke.', 'https://eloquentjavascript.net'),
    --book
    (2, 1, 'Async/Await', 'An article on the Async and Await keyword in Javascript.', 'https://javascript.info/async-await'),
    --article
    (2, 1, 'What arguments really mean', 'An article on the arguments object in Javascript.', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments'),
    --article
    (2, 1, 'Scope me through the lens', 'Clear explanation of scopes in Javascript.', 'https://dev.to/sandy8111112004/javascript-introduction-to-scope-function-scope-block-scope-d11'),
    --article
    (2, 1, 'This', 'An article on the ''This'' keyword in Javascript.', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this'),
    --article
    (2, 1, 'Array.reduce', 'An article on array.reduce method in Javascript.', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce'),
    --article
    (2, 1, 'Object.entries() In JavaScript', 'An article on the Object.entries function in Javascript.', 'https://www.geeksforgeeks.org/object-entries-javascript'),
    --article
    (2, 3, 'What is HTML?', 'An introductory article on HTML.', 'https://html.com'),
    --article
    (2, 3, 'HTML course on codecademy', 'An introductory course on HTML.', 'https://www.codecademy.com/learn/learn-html'),
    --online course
    (2, 2, 'A Complete Guide to Flexbox', 'A comprehensive article on how to use css flexbox.', 'https://css-tricks.com/snippets/css/a-guide-to-flexbox'),
    --article
    (2, 2, 'Pseudo-classes', 'Article on css pseudo-classes.', 'https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes'),
    --article
    (2, 2, 'Boxes', 'An comprehensive article on the box model.', 'https://www.w3schools.com/css/css_boxmodel.asp'),
    --article
    (2, 2, 'CSS Basics course', 'An comprehensive CSS course provided by MIT and Harvard.', 'https://www.edx.org/course/css-basics'),
    --online course
    (2, 2, 'Using CSS animations', 'An comprehensive article on using CSS animations.', 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations'),
    --article
    (2, 2, 'Learn CSS Position In 9 Minutes', 'Video explaining css positioning.', 'https://www.youtube.com/watch?v=jx5jmI0UlXU'),
    --video
    (2, 4, 'Postgres Data with Node', 'Documentation on how to use postgres in node.', 'https://node-postgres.com'),
    --documentation
    (2, 1, 'Prototypes', 'A video of Daniel explaining prototypes in Javascript.', 'https://www.youtube.com/watch?v=hS_WqkyUah8'),
    --video
    (2, 1, 'var, let and const - What, why and how', 'A video of MPJ explaining var, let and const in Javascript.', 'https://www.youtube.com/watch?v=sjyJBL5fkp8'),
    --video
    (2, 1, '=>', 'Arrows, Arrows, Arrows, Arrows, Arrows EVERYWHERE!!!', 'https://www.youtube.com/watch?v=mrYMzpbFz18');
    --video

