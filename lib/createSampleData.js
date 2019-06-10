db = db.getSiblingDB('sample')  //create a sample db
db.createCollection('users')
usersCollection = db.getCollection('users')
usersCollection.remove({})

usersCollection.insert({
    email: "htran@fake.email.com",
    //all hash are hash value encrypted from password "123456" using Md5
    hash: "e10adc3949ba59abbe56e057f20f883e"
})
usersCollection.insert(
{
    email: "cristinachen1204@gmail.com",
    hash: "e10adc3949ba59abbe56e057f20f883e"
})
usersCollection.insert(
{
    email: "khanh@seattleu.edu",
    hash: "e10adc3949ba59abbe56e057f20f883e"
})

db.createCollection('goals')
goalsCollection = db.getCollection("goals")
goalsCollection.remove({})

goalsCollection.insert(
{
    userId: usersCollection.find()[0]["_id"],
    goalName:"read Effective Java",
    tag: "study",
    goalNumber: 370,
    goalUnit:"page",
    startDate: "2019-05-19", //vali: no earlier than today
    dueDate:"2019-05-29"  ,  //vali: no earlier than startDate 
    owner: "cristinachen1204@gmail.com"
})

goalsCollection.insert(
{
    userId: usersCollection.find()[0]["_id"],
    goalName:"save money for new bag",
    tag: "life",
    goalNumber: 100,
    goalUnit:"dollar",
    startDate: "2019-05-20", //vali: no earlier than today
    dueDate:"2019-06-20",   //vali: no earlier than startDate 
    owner: "cristinachen1204@gmail.com"
})

goalsCollection.insert(
{
    userId: usersCollection.find()[1]["_id"],
    goalName:"workout",
    tag: "health",
    goalNumber: 10,
    goalUnit:"hour",
    startDate: "2019-06-01", //vali: no earlier than today
    dueDate:"2019-06-06" ,  //vali: no earlier than startDate 
    owner: ""
})

db.createCollection('records')
recordsCollection = db.getCollection("records")
recordsCollection.remove({})

goalsCollection.find()[0]["_id"]
recordsCollection.insert({
    goalId: goalsCollection.find()[0]["_id"],
    finishedUnits: 10,
    finishedDate:"2019-05-20" // startDate <= finishedDate <= today
})

recordsCollection.insert({
    goalId: goalsCollection.find()[1]["_id"],
    finishedUnits: 15,
    finishedDate:"2019-05-21" 
})

recordsCollection.insert({
    goalId: goalsCollection.find()[1]["_id"],
    finishedUnits: 35,
    finishedDate:"2019-05-22" 
})






