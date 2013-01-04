echo "create sample images----------------------"
curl.exe -i -X POST -H "content-type:application/json" -d @JsonFiles/imagedata1.json http://localhost:3000/collections/collection1_nawar/images
curl.exe -i -X PUT -H "content-type:application/json" -d @JsonFiles/imagedata2.json http://localhost:3000/collections/collection1_nawar/images/my_image_id_1
curl.exe -i -X POST -H "content-type:application/json" -d @JsonFiles/imagedata3.json http://localhost:3000/collections/collection2_wang/images
curl.exe -i -X PUT -H "content-type:application/json" -d @JsonFiles/imagedata4.json http://localhost:3000/collections/collection2_wang/images/my_image_id_2
curl.exe -i -X POST -H "content-type:application/json" -d @JsonFiles/imagedata5.json http://localhost:3000/collections/collection3_taha/images
curl.exe -i -X PUT -H "content-type:application/json" -d @JsonFiles/imagedata6.json http://localhost:3000/collections/collection3_taha/images/my_image_id_3
curl.exe -i -X POST -H "content-type:application/json" -d @JsonFiles/imagedata5.json http://localhost:3000/collections/my_collection_id/images
curl.exe -i -X PUT -H "content-type:application/json" -d @JsonFiles/imagedata6.json http://localhost:3000/collections/my_collection_id/images/my_image_id_4