echo "create collection comments------------------------------"
curl.exe -i -X POST -H "content-type:application/json" -d @JsonFiles/ccomment1.json http://localhost:3000/collections/collection3_taha/collectioncomments
curl.exe -i -X POST -H "content-type:application/json" -d @JsonFiles/ccomment2.json http://localhost:3000/collections/collection2_wang/collectioncomments
curl.exe -i -X POST -H "content-type:application/json" -d @JsonFiles/ccomment3.json http://localhost:3000/collections/collection2_wang/collectioncomments