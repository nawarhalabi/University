echo "create collection metedata------------------------------"
curl.exe -i -X PUT -H "content-type:application/json" -d @JsonFiles/cmetadata1.json http://localhost:3000/collections/collection1_nawar/metadata
curl.exe -i -X PUT -H "content-type:application/json" -d @JsonFiles/cmetadata1.json http://localhost:3000/collections/collection2_wang/metadata