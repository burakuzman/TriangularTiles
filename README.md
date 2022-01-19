# TriangularTiles
JavaScript Code to Create Triangular Tiles in SVG Format.
This work was the result of a self-imposed coding challenge (also an excuse to learn JavaScript). 
The visual inspiration came from the simplicity and beauty of quarter circle Truchet tiles.
 
For the noob coders like myself, here is how it works;
The HTML file reads the JavaScript files, executes them, and renders an SVG on the web browser.
Most of the variables and parameters to play with are in the TriangularTiles.js file.

The algorithm uses a base equilateral triangular tile, which it later decorates with arcs to create a decorated tile.
A tiling is created by using these individual tiles, where all the arcs appear continously connected through the tiles.

![Asset 1 1](https://user-images.githubusercontent.com/95830862/150213013-0e8dec77-3321-4b24-8ffb-a11051dcf621.png)
![Tiles1](https://user-images.githubusercontent.com/95830862/150213023-1cfdfa33-fe83-4898-bef8-30f660b9adfb.png)

The algorithm uses 3 base tile types;

![tiletypes2](https://user-images.githubusercontent.com/95830862/150213811-be0cd9ec-e832-4084-947d-fe734875e0e3.png)


While constructing the tiling, the algorithm selects one of the 3 tiles randomly. For the first tile type, it also picks a random orientation (in 120 rotation increments).

It is also possible to change the tile decorations by changing the radii of the arcs used to decorate the tiles. 
The variable used for this change is called tile_edge_ratio in the file TriangularTiles.js. Edge ratio determines at what fraction of the edge length the arcs intersect each edge. 

![tiling1](https://user-images.githubusercontent.com/95830862/150216046-6ab1c335-c83e-467d-b2ec-55f67cf75fcb.png)
![tiling2](https://user-images.githubusercontent.com/95830862/150216059-52863390-a607-40d5-bc9f-7e0ca8a39435.png)
