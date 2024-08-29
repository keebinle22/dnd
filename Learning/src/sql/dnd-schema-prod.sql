drop database if exists dnd;
create database dnd;
use dnd;

-- create table and relationships

create table dnd_role(
role_id int primary key not null auto_increment,
role_type varchar(10) not null,
role_description longtext not null
);

create table dnd_user(
id int primary key not null auto_increment,
username varchar(100) not null,
pw varchar(250) not null,
role_id int not null,
constraint fk_user_role_id
	foreign key (role_id) 
	references dnd_role(role_id)
);

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
speed longtext,
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
userID varchar(25) not null,
constraint fk_health_charinfo_id
	foreign key (userID)
    references charInfo(userID)
);

create table class_type(
class_type_id int primary key auto_increment,
class_name varchar(10) not null,
userID varchar(25) not null
);

create table spell_slots(
spell_slot_id int primary key auto_increment,
spell_level varchar(10) not null,
total_slot int not null,
cur_slot int not null,
class_type_id int not null,
constraint fk_cur_spell_slots_class_type
	foreign key (class_type_id)
    references class_type(class_type_id)
);

insert into class_type (class_name, userID) value ("wizard", "test");
insert into spell_slots (spell_level, total_slot, cur_slot, class_type_id) value ("1st", 2, 1, 1);
insert into spell_slots (spell_level, total_slot, cur_slot, class_type_id) value ("2nd", 3, 2, 1);
-- insert into spell_slots (spell_level, total_slot, cur_slot, class_type_id) value ("1st", 2, 1, 2);
select * from class_type;
select * from spell_slots;
delete from spell_slots where spell_slot_id = 2;
-- insert into class_type_cur_spell_slots (class_typeID, cur_spellID) value (1, 2);



insert into charInfo (userID, classType, levels, race, background, exp) value ("test", 'wizard', 1, "test", "test", 1);
insert into ability_score (asID, strength, dexterity, constitution, intelligence, wisdom, charisma, userID) value (1,2,2,2,2,2,2,'test');
insert into skills (acrobatics, animalHandling, arcana, athletics, deception, hist, insight, intimidation, investigation, medicine, nature, perception, performance, persuasion, religion, sleightOfHand, stealth, survival, asID) value
(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);
insert into battle_stat (bsID, initiative, armor, defense, inspiration, profBonus, asSaveDC, speed, userID) value (1,1,1,null,1,1,1,null,'test');
insert into health (healthID, maxHP, curHP, tempHP, totalHitDice, curHitDice, successDeathSaves, failDeathSaves, userID) value (1,1,1,1,1,1,1,1,'test');
-- insert into dnd_role (dnd_type, dnd_description) values 
-- ("DM", "The Story Teller"),
-- ("PLAYER", "The Pawns"),
-- ("SUPER", "A Literal God")
select * from dnd_role;
select * from dnd_user inner join dnd_role on dnd_user.role_id = dnd_role.role_id where dnd_user.username = "tester";

select * from charInfo as ci 
inner join ability_score as a on ci.userID = a.userID
inner join health as h on ci.userID = h.userID
inner join class_type as ct on ci.userID = ct.userID
inner join spell_slots as ss on ct.class_type_id = ss.class_type_id;
