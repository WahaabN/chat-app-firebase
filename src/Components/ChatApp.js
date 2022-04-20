import { Icon } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatApp = (props) => {
  const addMessage = props.addMessage;
  const messages = props.messages;
  const user = props.user;
  const userid = user.uid;
  const inputValue = props.inputValue;
  const handleUserInput = props.handleUserInput;
  const userSignOut = props.userSignOut

  

  console.log(user.uid);
  console.log(user.displayName);
  return (
    <div className="chat-app">
        
      <div className="message-list-flex">
        {messages.map((message) =>

        
        message.createdById === userid ? <div className="sent-message" key={message.id}>{message.message} </div> : <div className="recieved-message" key={message.id}>   {message.createdByUserName}: {message.message}</div>
          
    )}
        
      </div>
        
      <div className="form message-form">
        <form action="javascript:void(0);">
          <input placeholder="Enter a message..." value = {inputValue} onChange = {handleUserInput} id="input-message" autoComplete="off"></input>
          
          <button
            onClick={() =>
              addMessage(document.getElementById("input-message").value)
            }
          >
                <SendIcon style={{ fontSize: 20 }} />
          </button>
        </form>
        
      </div>
      <div className="sign-out-btn-container"> <button className="sign-out-btn" onClick={userSignOut} >Sign Out</button></div>

    </div>
  );
};

export default ChatApp;
