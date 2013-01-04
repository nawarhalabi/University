echo "create sample collections----------------------"
curl.exe -i -X POST -H "content-type:application/json" -d @JsonFiles/collectiondata1.json http://localhost:3000/collections
curl.exe -i -X POST -H "content-type:application/json" -d @JsonFiles/collectiondata2.json http://localhost:3000/collections
curl.exe -i -X POST -H "content-type:application/json" -d @JsonFiles/collectiondata3.json http://localhost:3000/collections
curl.exe -i -X PUT -H "content-type:application/json" -d @JsonFiles/collectiondata3.json http://localhost:3000/collections/my_collection_id