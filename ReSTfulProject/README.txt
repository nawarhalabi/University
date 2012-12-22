*node.js v0.8.12, modules used:
	Mongodb 2.2.2, Mongoose, express 3.0]

*To check dependencies, 
	please check the package.json file in the application root directory.

*Platform:
	The service was built and tested on windows 7 x64. We strongly recommend testing on windows.
-------------------------------------------------------------------------------------------------------------------------
*The routes defined in the web service:

http://localhost:3000/
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
	-For Comments (images or collections): [IN TESTING PAGE CHANGE COMMETS TO COMMENTS]
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
		|YO NAWAR INCLUDE NAMES OF JSON AND BAT FILES HERE
		|YO NAWAR INCLUDE NAMES OF JSON AND BAT FILES HERE
		|YO NAWAR INCLUDE NAMES OF JSON AND BAT FILES HERE
		|YO NAWAR INCLUDE NAMES OF JSON AND BAT FILES HERE
		|YO NAWAR INCLUDE NAMES OF JSON AND BAT FILES HERE
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
		the *.bat files in the folder /testing)
[NAWAR CHECK FOLDER NAMES]

*How to use the testing page:

	NAWAR WRITE THIS HAHAHAHA


