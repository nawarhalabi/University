echo "create sample collections----------------------"
curl.exe -i -X POST -H "content-type:application/json" -d @JsonFiles/collectiondata1.json http://localhost:3000/collections
curl.exe -i -X POST -H "content-type:application/json" -d @JsonFiles/collectiondata2.json http://localhost:3000/collections
curl.exe -i -X POST -H "content-type:application/json" -d @JsonFiles/collectiondata3.json http://localhost:3000/collections
curl.exe -i -X PUT -H "content-type:application/json" -d @JsonFiles/collectiondata3.json http://localhost:3000/collections/my_collection_id
echo "create sample images----------------------"
curl.exe -i -X POST -H "content-type:application/json" -d @JsonFiles/imagedata1.json http://localhost:3000/collections/collection1_nawar/images
curl.exe -i -X PUT -H "content-type:application/json" -d @JsonFiles/imagedata2.json http://localhost:3000/collections/collection1_nawar/images/my_image_id_1
curl.exe -i -X POST -H "content-type:application/json" -d @JsonFiles/imagedata3.json http://localhost:3000/collections/collection2_wang/images
curl.exe -i -X PUT -H "content-type:application/json" -d @JsonFiles/imagedata4.json http://localhost:3000/collections/collection2_wang/images/my_image_id_2
curl.exe -i -X POST -H "content-type:application/json" -d @JsonFiles/imagedata5.json http://localhost:3000/collections/collection3_taha/images
curl.exe -i -X PUT -H "content-type:application/json" -d @JsonFiles/imagedata6.json http://localhost:3000/collections/collection3_taha/images/my_image_id_3
curl.exe -i -X POST -H "content-type:application/json" -d @JsonFiles/imagedata5.json http://localhost:3000/collections/my_collection_id/images
curl.exe -i -X PUT -H "content-type:application/json" -d @JsonFiles/imagedata6.json http://localhost:3000/collections/my_collection_id/images/my_image_id_4
echo "create collection metedata------------------------------"
curl.exe -i -X PUT -H "content-type:application/json" -d @JsonFiles/cmetadata1.json http://localhost:3000/collections/collection1_nawar/metadata
curl.exe -i -X PUT -H "content-type:application/json" -d @JsonFiles/cmetadata1.json http://localhost:3000/collections/collection2_wang/metadata
echo "create collection comments------------------------------"
curl.exe -i -X POST -H "content-type:application/json" -d @JsonFiles/ccomment1.json http://localhost:3000/collections/collection3_taha/collectioncomments
curl.exe -i -X POST -H "content-type:application/json" -d @JsonFiles/ccomment2.json http://localhost:3000/collections/collection2_wang/collectioncomments
curl.exe -i -X POST -H "content-type:application/json" -d @JsonFiles/ccomment3.json http://localhost:3000/collections/collection2_wang/collectioncomments
echo "create images metadata--------------------------------"
curl.exe -i -X PUT -H "content-type:application/json" -d @JsonFiles/imetadata1.json http://localhost:3000/collections/collection1_nawar/images/my_image_id_1/metadata
curl.exe -i -X PUT -H "content-type:application/json" -d @JsonFiles/imetadata2.json http://localhost:3000/collections/collection2_wang/images/my_image_id_2/metadata
echo "create images comments--------------------------------"
curl.exe -i -X POST -H "content-type:application/json" -d @JsonFiles/icomment1.json http://localhost:3000/collections/collection1_nawar/images/my_image_id_1/imagecomments
curl.exe -i -X POST -H "content-type:application/json" -d @JsonFiles/icomment2.json http://localhost:3000/collections/collection2_wang/images/my_image_id_2/imagecomments