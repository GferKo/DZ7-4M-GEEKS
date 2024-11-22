import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoList from '../components/todoList/TodoList';
import Button from '../components/button/Button';
import Modal from '../components/modal/Modal';
import Pagination from '../components/pagination/Pagination';

const TodoPage = () => {
    const [show, setShow] = useState(false);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(4);
    const [todoList, setTodoList] = useState([]);
    const [currentId, setCurrentId] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const fetchApi = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/todos?_limit=${limit}&_start=${offset}`);
            setTodoList(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchApi();
    }, [offset, limit]);

    const handleInput = (event) => {
        setInputValue(event.target.value);
    };

    const handleAdd = async () => {
        try {
            const newTodo = {
                title: inputValue,
                completed: false,
            };
            const response = await axios.post('http://localhost:5000/todos', newTodo);
            setTodoList([...todoList, response.data]);
            setInputValue('');
        } catch (e) {
            console.log(e);
        }
    };

    const handleEdit = async (todoEdit) => {
        try {
            const updatedTodo = {
                ...todoEdit,
                title: inputValue,
            };
            const response = await axios.patch(`http://localhost:5000/todos/${todoEdit.id}`, updatedTodo);
            setTodoList(todoList.map(todo => (todo.id === response.data.id ? response.data : todo)));
            setCurrentId(null);
            setInputValue('');
        } catch (e) {
            console.log(e);
        }
    };

    const handleDone = async (id) => {
        try {
            const todo = todoList.find(todo => todo.id === id);
            const updatedTodo = {
                ...todo,
                completed: !todo.completed,
            };
            const response = await axios.patch(`http://localhost:5000/todos/${id}`, updatedTodo);
            setTodoList(todoList.map(todo => (todo.id === response.data.id ? response.data : todo)));
        } catch (e) {
            console.log(e);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/todos/${id}`);
            setTodoList(todoList.filter(todo => todo.id !== id));
        } catch (e) {
            console.log(e);
        }
    };

    const handleShow = () => {
        setShow(!show);
    };

    const page = (offset / Number(limit)) + 1;

    const handleNext = () => {
        setOffset(prevState => prevState + Number(limit));
    };

    const handlePrev = () => {
        setOffset(prevState => prevState - Number(limit));
    };

    return (
        <div>
            <input type="number" onChange={(event) => setLimit(event.target.value)} />
            <Pagination page={page} next={handleNext} prev={handlePrev} />
            <TodoList
                todoList={todoList}
                handleDone={handleDone}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
            <Button name={'Открыть'} action={handleShow} />
            {
                show && <Modal handleShow={handleShow} handleInput={handleInput} handleAdd={handleAdd}>
                    <h1>Добавить задачу</h1>
                </Modal>
            }
        </div>
    );
};

export default TodoPage;
