echo "get 1, put 1 then post 1 metadata----------------------------------------------------------------------------------------"

curl.exe -i -X GET http://localhost:3000/collections/collection1_nawar/metadata

curl.exe -i -X PUT -d @data.json -H "content-type:application/json" http://localhost:3000/collections/collection1_nawar/metadata

curl.exe -i -X POST -d @dataa.json -H "content-type:application/json" http://localhost:3000/collections/collection1_nawar/metadata

echo "collection comments---------------------------------------------------------------------------------------------"
curl.exe -i -X GET http://localhost:3000/collections/collection1_nawar/collectioncomments

echo "PUT 1, POST 4------------------------------------------------------------"

curl.exe -i -X PUT -d @com.json -H "content-type:application/json" http://localhost:3000/collections/collection1_nawar/collectioncomments

curl.exe -i -X POST -d @comm.json -H "content-type:application/json" http://localhost:3000/collections/collection1_nawar/collectioncomments

curl.exe -i -X POST -d @comm.json -H "content-type:application/json" http://localhost:3000/collections/collection1_nawar/collectioncomments

curl.exe -i -X POST -d @comm.json -H "content-type:application/json" http://localhost:3000/collections/collection1_nawar/collectioncomments

curl.exe -i -X POST -d @comm.json -H "content-type:application/json" http://localhost:3000/collections/collection1_nawar/collectioncomments
