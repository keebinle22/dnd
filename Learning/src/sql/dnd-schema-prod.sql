drop database if exists dnd;
create database dnd;
use dnd;

-- create table and relationships
create table charInfo(
userID varchar(100) primary key not null,
classType varchar(25) not null,
levels int not null,
race varchar(25) not null,
background varchar(25) not null,
exp int not null
);

create table ability_score (
asID int primary key auto_increment,
strength int not null,
dexterity int not null, 
constitution int not null,
intelligence int not null,
wisdom int not null,
charisma int not null,
userID varchar(125) not null,
constraint fk_as_char_id
	foreign key (userID) 
	references charInfo(userID)
);

create table skills (
skillID int primary key auto_increment,
acrobatics int not null,
animalHandling int not null,
arcana int not null,
athletics int not null,
deception int not null,
hist int not null,
insight int not null,
intimidation int not null,
investigation int not null,
medicine int not null,
nature int not null,
perception int not null,
performance int not null,
persuasion int not null,
religion int not null,
sleightOfHand int not null,
stealth int not null,
survival int not null,
asID int not null,
constraint fk_skill_as_id
	foreign key (asID) 
	references ability_score(asID)
);

create table battle_stat(
bsID int primary key auto_increment,
initiative int not null,
armor int not null,
defense longtext,
inspiration int not null,
profBonus int not null,
asSaveDC int not null,
speed int not null,
userID varchar(25),
constraint fk_bs_charinfo_id
	foreign key (userID)
    references charInfo(userID)
);

create table health(
healthID int primary key auto_increment,
maxHP int not null,
curHP int not null,
tempHP int not null,
totalHitDice int not null,
curHitDice int not null,
successDeathSaves int not null,
failDeathSaves int not null,
userID varchar(25),
constraint fk_health_charinfo_id
	foreign key (userID)
    references charInfo(userID)
);

insert into charInfo (userID, classType, levels, race, background, exp) value ("test", 'test', 1, "test", "test", 1);
insert into ability_score (asID, strength, dexterity, constitution, intelligence, wisdom, charisma, userID) value (1,2,2,2,2,2,2,'test');
insert into skills (acrobatics, animalHandling, arcana, athletics, deception, hist, insight, intimidation, investigation, medicine, nature, perception, performance, persuasion, religion, sleightOfHand, stealth, survival, asID) value
(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
insert into battle_stat (bsID, initiative, armor, defense, inspiration, profBonus, asSaveDC, speed, userID) value (1,1,1,null,1,1,1,1,'test');
insert into health (healthID, maxHP, curHP, tempHP, totalHitDice, curHitDice, successDeathSaves, failDeathSaves, userID) value (1,1,1,1,1,1,1,1,'test');
