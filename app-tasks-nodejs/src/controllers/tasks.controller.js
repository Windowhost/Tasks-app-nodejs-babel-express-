import Tasks from "../models/Tasks";

//Funtion home controller
export const tasksIndexCtr = async (req, res) => {
    const tasks = await Tasks.find({user: req.user.id}).lean().sort({date: "desc"});
      //Renderiza la pagina index y la lista de tareas
    res.render("tasks/tasks-index", {tasks});
}

 // My tasks for the user
export const myTasksCtr = async (req, res) => {
    const tasks = await Tasks.find({user: req.user.id}).lean().sort({date: "desc"});
    res.render("tasks/myTasks", {tasks});
}
 
//Funtion Tasks Post controller
export const tasksPostCtr = async (req, res) => {
    const {title, description} = req.body;
    const errors = [];

    if(!title)
        errors.push({text: "Please write a title"})

    if(!description)
        errors.push({text: "Please write a description"})
    
    if(errors.length > 0){
        res.render("tasks/add", {
            errors,
            title,
            description
        });

    }else{
       const newTask = new Tasks ({title, description});
         //Asigna cada nota a su user
         newTask.user = req.user.id;
         //save the tasks
         await newTask.save();
         req.flash("success_msg", "Task added successfuly");
         res.redirect("myTasks")
        
    }
};

//Funcion que renderiza el formulario para editar o cambiar los datos
export const renderEditCtr = async (req, res) => {
   try {
    //Captura el valor de las tarea a editar
    const tasks = await Tasks.findById(req.params.id).lean();
     res.render("tasks/edit" , {tasks})
   } catch (error) {
     console.log(error)
   }
}

//Funcion que maneja la logica de los datos del formulario a actualizar
export const updateTasksCtr = async (req, res) => {
    const {id} = req.params;

    //Atualiza la tarea o id ya editado. y le agraga los nuevos datos
    await Tasks.findByIdAndUpdate(id, req.body)
    req.flash("success_msg", "Tasks Update succesfuly");
    res.redirect("/tasks/add")
}

//Funcion que maneja la logica para eliminar una tarea
export const deleteTasks =  async (req, res) => {
    const {id} = req.params;
    await Tasks.findByIdAndDelete(id)
    req.flash("success_msg", "Tasks Deleted succesfuly");
    res.redirect("/tasks/myTasks")
};

//Funcion que maneja la logica para cambiar  el estado de Tarea(si esta echa o no)
export const doneToggleTasks = async (req, res) => {
    const {id} = req.params;
    const tasks = await Tasks.findById(id)
    
    tasks.done =  ! tasks.done;

    await tasks.save();

    res.redirect("/tasks/add")
};
