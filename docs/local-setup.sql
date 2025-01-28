-- CREATE DB AND APP USER

create database GAME_SCORE;
use GAME_SCORE;
create user 'game_score_ui'@'localhost' identified by 'test123';
grant select, insert on GAME_SCORE.* to 'game_score_ui'@'localhost';
  

-- CREATE CORE TABLES


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
    foreign key (scoreId) references score(id),
    foreign key (genreId) references genre(id)
);

create table SCORE_PLATFORMS(
	id varchar(255) not null primary key unique, 
    scoreId varchar(255) not null, 
    platformId varchar(255) not null,
    foreign key (scoreId) references score(id),
    foreign key (platformId) references platform(id)
);

create table SCORE_THOUGHTS(
	id varchar(255) not null primary key unique, 
    scoreId varchar(255) not null, 
    thoughtId varchar(255) not null,
    foreign key (scoreId) references score(id),
    foreign key (thoughtId) references thought(id)
);


--  SETUP SCORE PLATFORMS


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


-- SETUP SCORE GENRES


insert into score_genres(id, scoreId, genreId) values(
	UUID(),
    (select id from score where name="Octopath Traveller"),
    (select id from genre where name="JRPG")
);

insert into score_genres(id, scoreId, genreId) values(
	UUID(),
    (select id from score where name="Octopath Traveller"),
    (select id from genre where name="RPG")
);

insert into score_genres(id, scoreId, genreId) values(
	UUID(),
    (select id from score where name="Octopath Traveller"),
    (select id from genre where name="Action & Adventure")
);
-- 
insert into score_genres(id, scoreId, genreId) values(
	UUID(),
    (select id from score where name="Spider-Man Remastered"),
    (select id from genre where name="Open World")
);

insert into score_genres(id, scoreId, genreId) values(
	UUID(),
    (select id from score where name="Spider-Man Remastered"),
    (select id from genre where name="Action & Adventure")
);

insert into score_genres(id, scoreId, genreId) values(
	UUID(),
    (select id from score where name="Octopath Traveller 2"),
    (select id from genre where name="JRPG")
);

insert into score_genres(id, scoreId, genreId) values(
	UUID(),
    (select id from score where name="Octopath Traveller 2"),
    (select id from genre where name="RPG")
);

insert into score_genres(id, scoreId, genreId) values(
	UUID(),
    (select id from score where name="Octopath Traveller 2"),
    (select id from genre where name="Action & Adventure")
);

insert into score_genres(id, scoreId, genreId) values(
	UUID(),
    (select id from score where name="Pokemon Scarlet/Violet"),
    (select id from genre where name="RPG")
);

insert into score_genres(id, scoreId, genreId) values(
	UUID(),
    (select id from score where name="Pokemon Scarlet/Violet"),
    (select id from genre where name="Open World")
);

insert into score_genres(id, scoreId, genreId) values(
	UUID(),
    (select id from score where name="To The Moon"),
    (select id from genre where name="RPG")
);


-- SETUP THOUGHTS


insert into thought(id, title, body, priority) values(
	UUID(),
    'Spider-Man Overview',
    'This is some content.\nAdd some more info in here...',
    1
);

insert into thought(id, title, body, priority) values(
	UUID(),
    'Spider-Man Good',
    'This is some content.\nAdd some more info in here...',
    2
);

insert into thought(id, title, body, priority) values(
	UUID(),
    'Spider-Man Bad',
    'This is some content.\nAdd some more info in here...',
    3
);


-- LINK THOUGHTS TO SCORES


insert into score_thoughts(id, scoreId, thoughtId) values(
	UUID(),
    (select id from score where name = 'Spider-Man Remastered'),
    (select id from thought where title = 'Spider-Man Overview' limit 1)
);

insert into score_thoughts(id, scoreId, thoughtId) values(
	UUID(),
    (select id from score where name = 'Spider-Man Remastered'),
    (select id from thought where title = 'Spider-Man Good')
);

insert into score_thoughts(id, scoreId, thoughtId) values(
	UUID(),
    (select id from score where name = 'Spider-Man Remastered'),
    (select id from thought where title = 'Spider-Man Bad')
);