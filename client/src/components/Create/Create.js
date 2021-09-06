import './Create.css';

const Create = () => {
    return (
        <div className="create-edit">
            <h2>Create post</h2>
            <form className="create-edit-post">
                <label htmlFor="title">Title</label>
                <p><input type="text" id="title" placeholder="Insert title here..." /></p>
                <label htmlFor="description">Description</label>
                <p><textarea rows="15" cols="50" type="text" id="description" /></p>
                <label htmlFor="imageUrl">Image URL</label>
                <p><input type="text" id="imageUrl" placeholder="https://www.nicepicture.com" /></p>
                <input type="submit" id="submitBtn" value="Create post" />
            </form>
        </div>);
};

export default Create;