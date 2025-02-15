import EventPost from "./models/post";
import EventTag from "./models/tag";

const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
    EventPost.sync({ alter: isDev })
    EventTag.sync({ alter: isDev })
}

export default dbInit;