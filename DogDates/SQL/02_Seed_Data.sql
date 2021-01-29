

set identity_insert [UserProfile] on
INSERT INTO UserProfile (Id, FirebaseId, FirstName, LastName, DisplayName, Email, City, [State], ZipCode, Bio, ProfileImage) VALUES (1, 'jpuhyzaicsokywncxveknzowfpdu', 'Jennifer', 'Starkey', 'Jenn', 'jenn@email.com', 'Nashville', 'TN', 37115, 'Love my Huskies', 'https://robohash.org/numquamutut.png?size=150x150&set=set1')
INSERT INTO UserProfile (Id, FirebaseId, FirstName, LastName, DisplayName, Email, City, [State], ZipCode, Bio, ProfileImage) VALUES (2, 'jpuhyzaicsokywncxveknzowfpdu', 'Alex', 'Johnson', 'AJ', 'alex@email.com', 'Nashville', 'TN', 37115, 'Ready to meet some doggos', 'https://robohash.org/numquamutut.png?size=150x150&set=set1')
INSERT INTO UserProfile (Id, FirebaseId, FirstName, LastName, DisplayName, Email, City, [State], ZipCode, Bio, ProfileImage) VALUES (3, 'jpuhyzaicsokywncxveknzowfpdu', 'Matt', 'Roberts', 'MaximusPrime', 'max@email.com', 'Nashville', 'TN', 37115, 'Nashville guy with 3 dogs.', 'https://robohash.org/numquamutut.png?size=150x150&set=set1')
INSERT INTO UserProfile (Id, FirebaseId, FirstName, LastName, DisplayName, Email, City, [State], ZipCode, Bio, ProfileImage) VALUES (4, 'jpuhyzaicsokywncxveknzowfpdu', 'Amy', 'Bricks', 'theAmy', 'amy@email.com', 'Lebanon', 'TN', 37090, 'Hanging out at dog parks, makin doggo friends.', 'https://robohash.org/numquamutut.png?size=150x150&set=set1')
INSERT INTO UserProfile (Id, FirebaseId, FirstName, LastName, DisplayName, Email, City, [State], ZipCode, Bio, ProfileImage) VALUES (5, 'jpuhyzaicsokywncxveknzowfpdu', 'Miranda', 'Smith', 'randa', 'miranda@email.com', 'Nashville', 'TN', 37115, 'Dog love is the best love', 'https://robohash.org/numquamutut.png?size=150x150&set=set1')
set identity_insert [UserProfile] off
set identity_insert [Park] on
insert into Park (Id, [Name], Street, City, [State], ZipCode, ParkImage) values (1, 'Two Rivers Park', 'McGavok Pike', 'Nashville', 'Tn', '37214','http://lorempixel.com/920/360/');
insert into Park (Id, [Name], City, [State], ZipCode, ParkImage) values (2, 'Stewarts Ferry', 'Nashville', 'Tn', '37214','http://lorempixel.com/920/360/')
set identity_insert [Park] off

set identity_insert [Event] on
insert into event (Id, UserProfileId, Title, Details, EventDateTime, ParkId, CreatedDateTime) values (1, 1, 'Weekend playdate!', 'Going to Two Rivers around 2pm on Saturday', '2021-01-24', 1, '2021-01-22');
set identity_insert [Event] off