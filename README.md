Maze Clouds
===========

![screenshot](images/cumulus-violet.png?raw=true) ![screenshot](images/stormy-aqua.png?raw=true)

This is a gewgaw I came up with in September 2017.  You could call it
a generative art technique, or you might feel that makes it sound more
important than it is, so you could call it a gewgaw.

At the time I implemented as a Python program that writes out
an SVG file.  In 2019 I implemented a Javascript version that
builds a SVG element in a web page.  Both implementations are
in this distribution.

To view the Javascript version, clone this repository and open
[demo/maze-clouds.html](demo/maze-clouds.html) locally in a web browser.
(I will also [install it online](https://catseye.tc/article/HTML5_Installations)
at some point RSN -- watch this space.)

The logic for generating the maze is in the Javascript source
[src/maze-clouds.js](src/maze-clouds.js) while the code for
applying the visuals to it is in
[demo/maze-clouds-svg-launcher.js](demo/maze-clouds-svg-launcher.js).
(Normally, seperating content from presentation is a good thing,
although it may be a little overkill in a case like this.
One upshot is that it's not strongly tied to SVG; one could
easily re-implement it for HTML5 canvas, etc.)

The "cumulus" and "stormy" visuals were part of the original Python version;
the others were added in the Javascript version.

The maze-generating logic was originally written as a simple recursive
function, but, since Python does no tail-call optimization, even a modest
grid size would lead to exceeding the maximum recursion depth.  It was thus
re-written in an iterative manner (i.e. as a while loop operating on an
explicit stack.)  The recursive version remains in the Python version for
comparison, but only the iterative version was converted to Javascript.
