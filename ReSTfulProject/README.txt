*node.js v0.8.12, modules used:
	Mongodb 2.2.2 : a database engine where we store data about images and collections,
	Mongoose an object relational mapper to use mongodb with node,
	express 3.0 MVC application framework.

*To check dependencies, 
	please check the package.json file in the application root directory.

*Platform:
	The service was built and tested on windows 7 x64. We strongly recommend testing on windows.
-------------------------------------------------------------------------------------------------------------------------
*The routes defined in the web service:

http://localhost:3000/ :
	is the automatically generated express page. Please ignore.
http://localhost:3000/collections :                                                                   
	GET, POST, DELETE all the collections. NO PUT allowed.
http://localhost:3000/collections/<collection_id> :                                                    
	GET, POST, DELETE, PUT a specific collection.
http://localhost:3000/collections/<collection_id>/metadata :                                           
	GET, POST, DELETE, PUT to the collection metadata.
http://localhost:3000/collections/<collection_id>/collectioncomments :                                 
	GET, POST, DELETE to all the comments of a specific collection. NO PUT allowed.
http://localhost:3000/collections/<collection_id>/collectioncomments/<collection_comment_id> :         
	GET, POST, DELETE to a specific collection comment. NO PUT allowed because the ids are automatically generated.
http://localhost:3000/collections/<collection_id>/images :                                             
	GET, POST, DELETE to all the images in a specific collection. NO PUT allowed.
http://localhost:3000/collections/<collection_id>/images/<image_id> :                                  
	GET, POST, DELETE, PUT to a specific image in a specific collection.
http://localhost:3000/collections/<collection_id>/images/<image_id>/metadata :                         
	GET, POST, DELETE, PUT to the metadata of a specific image.
http://localhost:3000/collections/<collection_id>/images/<image_id>/imagecomments :                    
	GET, POST, DELETE to all comments of a specific image. NO PUT allowed.
http://localhost:3000/collections/<collection_id>/images/<image_id>/imagecomments/<image_comment_id> : 
	GET, POST, DELETE to a specific image comment. NO PUT allowed because the ids are automatically generated.
-------------------------------------------------------------------------------------------------------------------------
*json schemas used:

	-For Collections: 
	{"name":"collection_name","author":"author_name"}
	-For Images: 
	{"name":"image_name","author":"author_name","uri":"uri_on_the_web"}
	-For Metadata (images or collections): 
	{"description":"desc"}
	-For Comments (images or collections):
	{"text":"text","author":"author_name"}
-------------------------------------------------------------------------------------------------------------------------
*Architectural view of the system:

collections
	   |----- London_buildings
	   |		| - Metadata
	   |		| - CollectionComments
	   |		| - Images
	   |			| - buckingham palace
	   |				| ---- Metadata
	   |				| ---- ImageComments
	   |			| - Bigben
	   |				| ---- Metadata
	   |				| ---- ImageComments
	   |			| - westminster
	   |				| ---- Metadata
	   |				| ---- ImageComments
	   |----- Rabat_buildings
	   |		| - Metadata
	   |		| - CollectionComments
	   |		| - Images
	   |			| - hassanTower
	   |				| ---- Metadata
	   |				| ---- ImageComments
	   |			| - Mausoleum
	   |				| ---- Metadata
	   |				| ---- ImageComments
	   |			| - BabChellah
	   |				| ---- Metadata
	   |				| ---- ImageComments
-------------------------------------------------------------------------------------------------------------------------
*Application file map: (Important files listed only)

submission
	  |mongodb-win32-x86_64-2.2.2
		|bin
	  |node_modules
	  |public
		|JQuery.js
		|testpage.html
	  |routes
		|collection.js
		|collectioncomment.js
		|collectionmetadata.js
		|collectionModel.js
		|image.js
		|imagecomment.js
		|imagemetadata.js
		|imageModel.js
	  |Testing
		|<Here is all the batch files for testing the application>
	  |app.js
	  |package.json
	  |README.txt (This file)
	  |node.exe
	  |cmd.exe
-------------------------------------------------------------------------------------------------------------------------
*Instructions to test the web service:
	
	DB Server: start the mangodb (database) by running the mongodb.bat. This can be found in /mongodb-win32-x86_64-2.2.2/bin
	HTTP Server: start the app.js by running the start.bat file in the root application directory.
	Testing client:	 Open the http://localhost:3000/testPage.html and follow the instructions below. (You can alternatively use curl.exe and 
	the *.bat files in the folder /testing). Please use the batch files in the order specified in the folder (each file is named with a number).

*How to use the testing page:

	After starting the both the database server and the http server (node):
	- use a browser and surf to the page http://localhost:3000/testPage.html. 
	- The text entry at the top is the data to be sent in the body of the http request to the node http server. We provided quick templates for all our
		resources (images, collections, metadata and comments).
	- the accept dropdown box is to choose if the request includes the ACCEPT header.
	- the data Type dropdown box is to choose what is the type of data is provided in the data text-entry mentioned earlier (json or xml).
	- The last dropdown box is to choose the http method (GET, POST, PUT, DELETE or HEAD).
	- Finally the text box at the buttom is to enter the uri. We alos provided uri templates to quickly input the uri into the textbox, all you have to do is
		click on one of the templates and the uri textbox will be filled with it automatically and then put in the ids of the resources.


