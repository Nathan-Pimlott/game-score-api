create database GAME_SCORE;
use GAME_SCORE;
CREATE USER 'game_score_ui'@'localhost' IDENTIFIED BY 'test123';
GRANT SELECT, INSERT ON GAME_SCORE.* TO 'game_score_ui'@'localhost';
  
create table PLATFORM(
	id varchar(255) not null primary key unique, 
    name varchar(255)
);

create table GENRE(
	id varchar(255) not null primary key unique, 
    name varchar(255)
);

create table SCORE(
	id varchar(255) not null primary key unique, 
    name varchar(255) not null unique,
    score int not null,
    timeToComplete int not null,
	finishDate date not null
);

create table THOUGHT(
	id varchar(255) not null primary key unique, 
    priority int not null,
    title varchar(255) not null,
    body mediumtext not null
);

create table SCORE_GENRES(
	id varchar(255) not null primary key unique, 
    scoreId varchar(255) not null, 
    genreId varchar(255) not null,
    FOREIGN KEY (scoreId) REFERENCES score(id),
    FOREIGN KEY (genreId) REFERENCES genre(id)
);

create table SCORE_PLATFORMS(
	id varchar(255) not null primary key unique, 
    scoreId varchar(255) not null, 
    platformId varchar(255) not null,
    FOREIGN KEY (scoreId) REFERENCES score(id),
    FOREIGN KEY (platformId) REFERENCES platform(id)
);

create table SCORE_THOUGHTS(
	id varchar(255) not null primary key unique, 
    scoreId varchar(255) not null, 
    thoughtId varchar(255) not null,
    FOREIGN KEY (scoreId) REFERENCES score(id),
    FOREIGN KEY (thoughtId) REFERENCES thought(id)
);

--  Set up score platform links
insert into score_platforms(id, scoreId, platformId) values(
	UUID(),
    (select id from score where name="Octopath Traveller"),
    (select id from platform where name="Switch")
);

insert into score_platforms(id, scoreId, platformId) values(
	UUID(),
    (select id from score where name="Octopath Traveller"),
    (select id from platform where name="Steam")
);

insert into score_platforms(id, scoreId, platformId) values(
	UUID(),
    (select id from score where name="Pokemon Scarlet/Violet"),
    (select id from platform where name="Switch")
);

insert into score_platforms(id, scoreId, platformId) values(
	UUID(),
    (select id from score where name="To The Moon"),
    (select id from platform where name="Steam")
);

insert into score_platforms(id, scoreId, platformId) values(
	UUID(),
    (select id from score where name="Spider-Man Remastered"),
    (select id from platform where name="PS4")
);

insert into score_platforms(id, scoreId, platformId) values(
	UUID(),
    (select id from score where name="Spider-Man Remastered"),
    (select id from platform where name="Steam")
);

insert into score_platforms(id, scoreId, platformId) values(
	UUID(),
    (select id from score where name="Octopath Traveller 2"),
    (select id from platform where name="Switch")
);

insert into score_platforms(id, scoreId, platformId) values(
	UUID(),
    (select id from score where name="Octopath Traveller 2"),
    (select id from platform where name="Steam")
);

