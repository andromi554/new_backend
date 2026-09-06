import express from "express";

const app = express();
const port = 3000;
//this is a way of sayikng that we accept the data in json format
app.use(express.json());

let teaData = [];
let nextId = 1;


app.get("/", (req, res) => {
    res.send("Hi Im miwa the useless")
})

app.post("/teas", (req, res) => {
    const { name, price } = req.body;

    const newTea = { id: nextId++, name, price };
    teaData.push(newTea);
    res.status(201).send(newTea);


});


app.get("/teas", (req, res) => {
    res.status(200).send(teaData);
})

app.get("/teas/:id", (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send("Tea not found");
    }
    return res.status(200).send(tea);


})


app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));

    if (!tea) {
        res.status(404).send("tea not found")
    }

    const { name, price } = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
})

app.delete('/teas/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === req.params.id);

    if (index === -1) {
        return res.status(404).send("Tea not found");
    }

    teaData.splice(index, 1);
    return res.status(204).send("the data has been deleted");
})


app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})









//REVIEW NOTES

//dev dependencies ar ethe depencies usedd only in devel;opment environment noit nin the production


// GET – Retrieve Data Used to fetch resources from the server without modifying them. It’s safe and idempotent. Example (Node.js Express):

// app.get('/students', (req, res) => {
// res.json(students);
// });
// Copy
// Client call:

// fetch('/students').then(res => res.json()).then(console.log);
// Copy
// 2. POST – Create New Resource Sends data to the server to create a new record. It’s not idempotent—multiple identical requests create multiple records. Example:

// app.post('/students', (req, res) => {
// students.push(req.body);
// res.json({ message: "Record Added" });
// });
// Copy
// Client call:

// fetch('/students', {
// method: 'POST',
// headers: { "Content-Type": "application/json" },
// body: JSON.stringify({ id: 3, name: "Geek3" })
// });
// Copy
// 3. PUT – Update/Replace Resource Replaces an entire resource with new data. It’s idempotent—repeating the same request yields the same result. Example:

// app.put('/students/:id', (req, res) => {
// const id = req.params.id;
// students = students.map(s => s.id == id ? req.body : s);
// res.json({ message: "Record Updated" });
// });
// Copy
// 4. PATCH – Partial Update Updates specific fields of a resource without replacing the whole object. Example:

// app.patch('/students/:id', (req, res) => {
// const id = req.params.id;
// const updates = req.body;
// students = students.map(s => s.id == id ? { ...s, ...updates } : s);
// res.json({ message: "Record Updated using patch" });
// });
// Copy
// 5. DELETE – Remove Resource Deletes a resource from the server. It’s idempotent—deleting the same resource again has no effect. Example:

// app.delete('/students/:id', (req, res) => {
// students = students.filter(s => s.id != req.params.id);
// res.json({ message: "Record Deleted" });
// });