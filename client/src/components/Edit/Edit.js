import { useEffect, useState } from 'react';
import * as postService from '../../services/postService';
import CreateEditForm from '../shared/CreateEditForm';

const Edit = ({ match, history }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');
    const postId = match.params.id;

    useEffect(() => {
        postService.getById(postId)
            .then(p => {
                if (!p.ok) {
                    throw new Error(p.error);
                }
                setTitle(p.post.title);
                setDescription(p.post.description);
                setImageUrl(p.post.imageUrl);
            })
            .catch(err => {
                setError(err.message);
            });
        return () => {
            setTitle('');
            setDescription('');
            setImageUrl('');
            setError('');
        };
    }, [postId]);

    const createHandler = async e => {
        e.preventDefault();
        try {
            if (title.length < 3 || title.length > 20) {
                throw new Error('Title must be atleast 3 characters long and less than 20!');
            }
            if (description.length < 10) {
                throw new Error('Description must be atleast 10 characters long!');
            }

            const res = await postService.edit({ title, description, imageUrl }, postId);
            if (!res.ok) {
                throw new Error(res.error);
            }
            history.push('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <CreateEditForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            error={error}
            setError={setError}
            createHandler={createHandler}
            btnValue='UPDATE'
        />);
};

export default Edit;