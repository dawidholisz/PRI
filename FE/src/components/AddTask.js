import React from 'react';
import PropTypes from 'prop-types';
import {useFormik} from 'formik';
import baseApi from "../utils/baseApi";
import {Button, Modal} from "react-bootstrap";

const AddTask = ({user, fetchTasks, closeModal, openModal, isModalOpen}) => {

    const addTask = async (newTask) => {
        await baseApi('tasks', {method: "POST", body: {...newTask, id: new Date().valueOf()}}).then(console.log)
    }

    const {handleSubmit, handleChange, values} = useFormik({
        initialValues: {
            name: '',
            description: '',
            user: user,
        },
        onSubmit: values => {
            addTask(values).then(fetchTasks).then(closeModal)
        },
    });

    return (
        <>
            <Button variant="success" size="lg" block onClick={openModal}>Add task</Button>
            <Modal show={isModalOpen} onHide={closeModal}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Adding task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" placeholder="Task name"
                               onChange={handleChange}
                               name="name"
                               value={values.name}/>
                        <textarea placeholder="Task description"
                                  onChange={handleChange}
                                  name="description"
                                  value={values.description}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>

        </>
    )
};

AddTask.propTypes = {
    user: PropTypes.string.isRequired,
    fetchTasks: PropTypes.func.isRequired,
};

export default AddTask;