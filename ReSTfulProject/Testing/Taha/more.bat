echo "DELETE metadata and trying to get it again"

curl.exe -i -X DELETE http://localhost:3000/collections/collection1_nawar/metadata

curl.exe -i -X GET http://localhost:3000/collections/collection1_nawar/metadata

echo "DELETE it, get it, get all, delete all, get all collection comments"

curl.exe -i -X DELETE http://localhost:3000/collections/collection1_nawar/collectioncomments/50d09f89d603849814000006

curl.exe -i -X GET http://localhost:3000/collections/collection1_nawar/collectioncomments/50d09f89d603849814000006

curl.exe -i -X GET http://localhost:3000/collections/collection1_nawar/collectioncomments/

echo "POST TO UNEXISTING COMMENT"

curl.exe -i -X POST -d @comm.json -H "content-type:application/json" http://localhost:3000/collections/collection1_nawar/collectioncomments/50d09f89d603849814000006


