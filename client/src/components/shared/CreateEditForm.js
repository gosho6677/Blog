import ErrorBox from "../Notifications/ErrorBox";

const CreateEditForm = ({ 
    error,
    setError,
    createHandler,
    title,
    setTitle,
    description,
    setDescription,
    imageUrl,
    setImageUrl,
    btnValue,
 }) => {
    return (
        <div className="create-edit">
            {error && <ErrorBox error={error} setError={setError} />}
            <h2>{btnValue} POST</h2>
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
                <input type="submit" id="submitBtn" value={btnValue} />
            </form>
        </div>
    );
};

export default CreateEditForm;