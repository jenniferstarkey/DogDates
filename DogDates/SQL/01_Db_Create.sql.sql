USE [master]

IF db_id('DogDates') IS NULL
  CREATE DATABASE [DogDates]
GO

USE [DogDates]
GO

Alter table [Event] Drop CONSTRAINT [FK_Event_Park];
Alter table [Event] Drop Constraint [FK_Event_UserProfile];
Alter table [EventFavorites] Drop Constraint [FK_EventFavorites_UserProfile];
Alter table [EventFavorites] Drop Constraint [FK_EventFavorites_Event];
Alter table [Comment] Drop Constraint [FK_Comment_UserProfile];
Alter table [Comment] Drop Constraint [FK_Comment_Event];
Alter table [ParkFavorites] Drop Constraint [FK_ParkFavorites_UserProfile];
Alter table [ParkFavorites] Drop Constraint [FK_ParkFavorites_Park];
Alter table [ParkReview] Drop Constraint [FK_ParkReview_ParkId];
Alter table [ParkReview] Drop Constraint [FK_ParkReview_UserId];
GO

DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Park];
DROP TABLE IF EXISTS [Event];
DROP TABLE IF EXISTS [EventFavorites];
DROP TABLE IF EXISTS [Comment];
DROP TABLE IF EXISTS [ParkFavorites];
DROP TABLE IF EXISTS [ParkReview];

GO


CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY IDENTITY,
  [FirebaseId] nvarchar(255) NOT NULL,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [DisplayName] nvarchar(255)NOT NULL ,
  [Email] nvarchar(255) NOT NULL,
  [City] nvarchar(255) NOT NULL,
  [State] nvarchar(255) NOT NULL,
  [ZipCode] integer NOT NULL,
  [Bio] text,
  [ProfileImage] nvarchar(255)
)
GO

CREATE TABLE [Park](
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL,
  [Street] nvarchar(255),
  [City] nvarchar(255) NOT NULL,
  [State] nvarchar(255) NOT NULL,
  [ZipCode] integer NOT NULL,
  [ParkImage] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Event] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserProfileId] integer NOT NULL,
  [Title] nvarchar(255) NOT NULL,
  [Details] text NOT NULL,
  [EventDateTime] datetime NOT NULL,
  [ParkId] integer NOT NULL,
  [CreatedDateTime] datetime NOT NULL,
  CONSTRAINT [FK_Event_Park] FOREIGN KEY ([ParkId]) REFERENCES [Park] ([Id]),
  CONSTRAINT [FK_Event_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)
GO

CREATE TABLE [EventFavorites] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserProfileId] integer NOT NULL,
  [EventId] integer NOT NULL

  CONSTRAINT [FK_EventFavorites_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_EventFavorites_Event] FOREIGN KEY ([EventId]) REFERENCES [Event] ([Id])

)
GO

CREATE TABLE [Comment] (
  [Id] integer PRIMARY KEY IDENTITY,
  [EventId] integer NOT NULL,
  [UserProfileId] integer NOT NULL,
  [CreatedDateTime] datetime NOT NULL,
  [Content] text NOT NULL

  CONSTRAINT [FK_Comment_Event] FOREIGN KEY ([EventId]) REFERENCES [Event] ([Id]),
  CONSTRAINT [FK_Comment_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)
GO

CREATE TABLE [ParkFavorites] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserId] integer NOT NULL,
  [ParkId] integer NOT NULL

  CONSTRAINT [FK_ParkFavorites_Park] FOREIGN KEY ([ParkId]) REFERENCES [Park] ([Id]),
  CONSTRAINT [FK_ParkFavorites_UserProfile] FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
)
GO

CREATE TABLE [ParkReview] (
  [Id] integer PRIMARY KEY IDENTITY,
  [ParkId] integer NOT NULL,
  [UserId] integer NOT NULL,
  [ReviewValue] integer NOT NULL

  CONSTRAINT [FK_ParkReview_ParkId] FOREIGN KEY ([ParkId]) REFERENCES [Park] ([Id]),
  CONSTRAINT [FK_ParkReview_UserId] FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
)
GO

