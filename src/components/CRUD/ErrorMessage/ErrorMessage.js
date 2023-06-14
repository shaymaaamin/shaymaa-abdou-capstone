const { Message } = require("semantic-ui-react");

function ErrorMessage({ error }) {
    return (
        <Message negative hidden={!error}>
            <Message.Header>Oops! Something went wrong!</Message.Header>
            <p>{error}</p>
        </Message>
    );
}

export default ErrorMessage;