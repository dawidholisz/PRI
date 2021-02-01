import React, {useEffect, useState} from 'react';
import {useAsyncFn} from 'react-use';
import {Spinner, Alert,Card,Button} from "react-bootstrap";
import {isEmpty} from 'lodash'


import {useAuth} from "../contexts/AuthContext";
import baseApi from "../utils/baseApi";
import AddTask from "../components/AddTask";

const TasksPage = ({onlyMyTask}) => {
    const [isModalOpen,setIsModalOpen] = useState(false)

        const {user, isAuth} = useAuth()
        const [{loading, value: tasks}, fetchTasks] = useAsyncFn(async () => onlyMyTask && !!user
            ? await baseApi('tasks', {queryParams: {user: user}})
            : await baseApi('tasks')
            , [user,onlyMyTask])

        useEffect(() => fetchTasks(), [fetchTasks])


    const closeModal = () => setIsModalOpen(false)
    const openModal = () => setIsModalOpen(true)

    const finishTask = async taskId =>{
        await baseApi(`tasks/${taskId}`,{method: 'PUT'}).then(fetchTasks)
    }

        return (
            <div>
                <h1>Task list</h1>
                {loading && (<div>
                    <Spinner animation="grow" variant="primary" />
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="success" />
                    <Spinner animation="grow" variant="danger" />
                    <Spinner animation="grow" variant="warning" />
                    <Spinner animation="grow" variant="info" />
                    <Spinner animation="grow" variant="dark" />
                </div>)}

                <div className="d-flex flex-wrap justify-content-around">
                {!isEmpty(tasks)&&tasks.map((task, index) => (
                    <Card
                        border={task.user===user&&"success"}
                        bg={task.isFinished&&task.user===user?"success":task.isFinished?"info":"light"}
                        key={index}
                        text={task.isFinished?'light':'dark'}
                        style={{ width: '18rem', flex:'0 1 30%' }}
                        className="m-2"
                    >
                        <Card.Header>{task.user}</Card.Header>
                        <Card.Body>
                            <Card.Title>{task.name} </Card.Title>
                            <Card.Text>{task.description}</Card.Text>
                            {task.user===user && !task.isFinished && <Button onClick={()=>finishTask(task.id)}>Finish</Button>}
                        </Card.Body>
                    </Card>
                ))}
                {!loading&&isEmpty(tasks) &&(
                    <Alert variant="warning ">
                        No results
                    </Alert>
                )}
                </div>
                {isAuth&&<AddTask user={user} fetchTasks={fetchTasks} closeModal={closeModal} isModalOpen={isModalOpen} openModal={openModal}/>}
            </div>
        );
    }
;

export default TasksPage;