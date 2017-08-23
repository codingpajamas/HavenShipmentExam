# HavenShipmentExam

Clone this repo and run ```npm install```.

To start run ```npm start``` and visit ```http://localhost:3000/``` on your browser.

To test, run ```karma start test/config/karma.conf.js```

### Notes

Packages used in this project are ```expressjs```, ```lodashjs```, ```momentjs```.

### WaitingDays

Problem : "Say you have two vessels that both pass through the port of Hong Kong. You could technically jump from one ship to the other and continue on the next ship's voyage."

Does the 2 vessels passing through the same port (ex. HongKong) should meet at the same date (or at least their date of stay on that port intersect )? Or the shipment can jump off from the first vessel and wait (ex. 2 days waiting) on the port until the second vessel has arrived? The json data given has no 2 vessels on the same port on the same day so I added a "waitDays" where a shipment can jump off on a vessel and wait for a given days for the next vessel. 