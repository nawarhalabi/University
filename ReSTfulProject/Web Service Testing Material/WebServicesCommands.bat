curl.exe -i -X POST -H "content-type:application/json" -d @collectiondata1.json http://localhost:3000/collections
curl.exe -i -X POST -H "content-type:application/json" -d @collectiondata2.json http://localhost:3000/collections
curl.exe -i -X POST -H "content-type:application/json" -d @collectiondata3.json http://localhost:3000/collections
curl.exe -i -X POST -H "content-type:application/json" -d @imagedata1.json http://localhost:3000/collections/collection1_nawar/images
curl.exe -i -X POST -H "content-type:application/json" -d @imagedata2.json http://localhost:3000/collections/collection1_nawar/images
curl.exe -i -X POST -H "content-type:application/json" -d @imagedata3.json http://localhost:3000/collections/collection2_wang/images
curl.exe -i -X POST -H "content-type:application/json" -d @imagedata4.json http://localhost:3000/collections/collection2_wang/images
curl.exe -i -X POST -H "content-type:application/json" -d @imagedata5.json http://localhost:3000/collections/collection3_taha/images
curl.exe -i -X POST -H "content-type:application/json" -d @imagedata6.json http://localhost:3000/collections/collection3_taha/images
echo "collections----------------------------------------------------------------------------------------"
curl.exe -i -X GET http://localhost:3000/collections
echo "images---------------------------------------------------------------------------------------------"
curl.exe -i -X GET http://localhost:3000/collections/collection1_nawar/images
curl.exe -i -X GET http://localhost:3000/collections/collection2_wang/images
curl.exe -i -X GET http://localhost:3000/collections/collection3_taha/images