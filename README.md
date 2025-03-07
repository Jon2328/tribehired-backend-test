## Build a REST API


1. Return a list of Top Posts ordered by their number of Comments. 

Consume the API endpoints provided: 

	- comments endpoint – https://jsonplaceholder.typicode.com/comments
	-  View Single Post endpoint – https://jsonplaceholder.typicode.com/posts/{post_id}
	-  View All Posts endpoint – https://jsonplaceholder.typicode.com/posts
	

Your API response should have the following fields: 

		- post_id 
		- post_title
		- post_body 
		- total_number_of_comments


2. Search API 
Create an endpoint that allows a user to filter the comments based on all the available fields. Your solution needs to be scalable. 
	- comments endpoint – https://jsonplaceholder.typicode.com/comments

## Notes

- Once completed, send us a screenshot of your api response for Question 1 & 2. 
- Make your repo public, and send us the link for us to review

## Answer

Start server via "yarn dev"

1. GET Method via localhost:3000/posts/top-posts

2. POST Method via localhost:3000/search/comments with acceptable body payload of
	- postId : number
	- id : number
	- name : string
	- email : string
	- body : string

	Note: require at least one payload to be submitted with the api call