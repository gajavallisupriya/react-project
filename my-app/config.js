import { createChatBotMessage } from "react-chatbot-kit";
import CustomBot from "./CustomBot";
const config = {
  initialMessages: [createChatBotMessage(`Hi User!`)],
  botName: "Campus Quoro",
  customStyles: {
    botMessageBox: {
      backgroundColor: '#008f8b',
    },
    chatButton: {
      backgroundColor: '#008f8b',
    },
  },
  customComponents: {
    botAvatar: (props) => <CustomBot {...props} />
  }
};

export default config