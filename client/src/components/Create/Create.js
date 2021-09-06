import { useState } from 'react';
import * as postService from '../../services/postService';
import ErrorBox from '../Notifications/ErrorBox';
import './Create.css';

const Create = ({ history }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');

    const createHandler = async e => {
        e.preventDefault();
        try {
            if(title.length < 3 || title.length > 20) {
                throw new Error('Title must be atleast 3 characters long and less than 20!');
            }
            if(description.length < 10) {
                throw new Error('Description must be atleast 10 characters long!');
            }
            
            const res = await postService.create({ title, description, imageUrl });
            if(!res.ok) {
                throw new Error(res.error);
            }
            history.push('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="create-edit">
            {error && <ErrorBox error={error} setError={setError} />}
            <h2>Create post</h2>
            <form onSubmit={createHandler} className="create-edit-post">
                <label htmlFor="title">Title</label>
                <p>
                    <input
                        type="text"
                        id="title"
                        placeholder="Insert title here..."
                        value={title}
                        onInput={e => setTitle(e.target.value)}
                    />
                </p>
                <label htmlFor="description">Description</label>
                <p>
                    <textarea
                        rows="15"
                        cols="50"
                        type="text"
                        id="description"
                        value={description}
                        onInput={e => setDescription(e.target.value)}
                    />
                </p>
                <label htmlFor="imageUrl">Image URL</label>
                <p>
                    <input
                        type="text"
                        id="imageUrl"
                        placeholder="https://www.nicepicture.com"
                        value={imageUrl}
                        onInput={e => setImageUrl(e.target.value)}
                    />
                </p>
                <input type="submit" id="submitBtn" value="Create post" />
            </form>
        </div>);
};

export default Create;