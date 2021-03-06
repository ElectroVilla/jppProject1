* [How to Start](#How_to_Start)
* [Scripts](#Scripts)
* [Authentication](#Authentication)
* [References](#References)


## How_to_Start

1) You need to create a database with name: ecommerce

2) Use PORT=3000

3) Some scripts may not work properly on NON-WINDOWS machine as it contain "set ENV={value}", you need to remove the term "set", the scripts that are affected are:  
    a) "npm run start"
    b) "npm run st"
    c) "npm run test"

## Scripts

1) npm run start
Runs the server using DEV database (the original one)

2) npm run st
Runs the server using TEST database (the test one)

3) npm run watch
Runs the server using DEV database in watch mode (server restarts upon any save command)

4) npm run build
Builds the server using DEV database credentials

5) npm run test
 
## Authentication
I used a general rule for authentication, any GET request should NOT require authentication as it should be available for guest user however any [POST], [PUT], [DELETE] request should use authentication, of course I have some exceptions of this rule.

## References
1) Toys categories and ideas:
https://en.wikipedia.org/wiki/List_of_toys#Cars_and_radio_controlled


