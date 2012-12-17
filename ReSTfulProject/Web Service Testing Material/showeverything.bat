echo "collections----------------------------------------------------------------------------------------"
curl.exe -X GET http://localhost:3000/collections/
echo "images---------------------------------------------------------------------------------------------"
curl.exe -X GET http://localhost:3000/collections/collection1_nawar/images
curl.exe -X GET http://localhost:3000/collections/collection2_wang/images
curl.exe -X GET http://localhost:3000/collections/collection3_taha/images