import React, { useEffect, useState } from 'react';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

//==============================================Notes==================================================================
//isLoading, error, sendRequest, transformTask - comes from useHttp hook
//sendRequest - request function inside of custom hook
//transformTask - custom hook parameter 
//=====================================================================================================================

function App() {

  const [tasks, setTasks] = useState([]);

  const {isLoading, error, sendRequest:fetchTasks} = useHttp(); //this function will be called for us by the custom hook, whenever we get a response
    //comes from our custom hooks second parameter - applyData

  useEffect(() => {
    const transformTask = (taskObj) => { //taskObj is data passed in from custom hook 
      const loadedTasks = [];

      for (const taskKey in taskObj) {//pushing the object and its key values into an array [] (creating an array object)
        loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
      }
      setTasks(loadedTasks);
    };

    fetchTasks(
      {
        url: "https://custom-hook-test-a6b1d-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
      },
      transformTask
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
