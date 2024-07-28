#HTTP Request Info

##AbilityScore
    ../api/abilityscore
###GET FindAllAS()

`../user`

####Input: 
None

####Output:
200 status code - List of all AbilityScores in json format.

###GET FindASByUser()

`../user/{userId}`

###Input:

Content-Type: application/json

```
{
    "id": 3,
    "strength": 2,
    "dexterity": 2,
    "constitution": 2,
    "intelligence": 2,
    "wisdom": 2,
    "charisma": 2    
}
```

####Output:

200 or 404 status code - One AbilityScore in a json format

###POST AddAS()

####Input:

Content-Type: application/json

```
{
    "id": 0,
    "strength": 2,
    "dexterity": 2,
    "constitution": 2,
    "intelligence": 2,
    "wisdom": 2,
    "charisma": 2    
}
```

####Output:

204 or 400 status code

###PUT UpdateAS()
`../user/{userId}`
####Input:

Content-Type: application/json

```
{
    "id": 1,
    "strength": 2,
    "dexterity": 2,
    "constitution": 2,
    "intelligence": 2,
    "wisdom": 2,
    "charisma": 2    
}
```

####Output:

204 or 400 status code
