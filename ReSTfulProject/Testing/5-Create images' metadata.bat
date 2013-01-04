echo "create images metadata--------------------------------"
curl.exe -i -X PUT -H "content-type:application/json" -d @JsonFiles/imetadata1.json http://localhost:3000/collections/collection1_nawar/images/my_image_id_1/metadata
curl.exe -i -X PUT -H "content-type:application/json" -d @JsonFiles/imetadata2.json http://localhost:3000/collections/collection2_wang/images/my_image_id_2/metadata