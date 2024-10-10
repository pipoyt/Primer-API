const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api/greet', (req,res)=>{
	res.json({message: 'Primer trabajo de api!'});
})

app.listen(PORT,() =>{
    console.log('Servidor corriendo en http://localhost:$PORT');
})
app.use(express.json()); 
let tareas=[ 
    { id:1,tarea:'Recoger el cuarto' }, 
    { id:2,tarea:'Hacer de comer' },
    { id:3,tarea:'Hacer tarea' },
    { id:4,tarea:'Dormir' },
    { id:5,tarea:'Bañarse' }
];

app.get('/tareas', (req,res)=>{ 
    res.json(tareas); 
});

app.get('/tareas/:id', (req,res)=>{ 
    const id=parseInt(req.params.id) 
    const tarea = tareas.find(e=> e.id===id); 
    if (tarea) {
        res.json(tarea);
    } else {
        res.status(404).send ('Tarea no encontrada');
    }
});

app.post('/tareas', (req,res)=>{ 
    const nuevaTarea={ 
        id:tareas.length+1,
        nombre:req.body.nombre 
    };
    tareas.push(nuevaTarea); 
    res.status(201).json(nuevaTarea); 
});
app.put('/tareas/:id', (req, res) => { 
    const id=parseInt(req.params.id);
    const tarea=tareas.find(e=>e.id===id); 
    if (tarea) {
        tarea.nombre=req.body.nombre; 
        res.json(tarea);
    } else {
        res.status(404).send('Tarea no encontrada'); 
    }
});

app.delete('/tareas/:id', (req, res) => { 
    const id=parseInt(req.params.id); 
    const index=tareas.findIndex(e=>e.id===id); 
    if (index!==-1) {
        tareas.splice(index,1); 
        res.send('Tarea eliminada');
    } else {
        res.status(404).send('Tarea no encontrada'); 
    }
});