const users = [];

const addUser = ({id, name, room}) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  const existingUser = users.find(user => user.name === name && user.room == room);
  if(existingUser){
    return {
       error:"error user already exist"
    }
  }
    
  user = {id, name, room};
  users.push(user);
  return { user }
}
const getUser = (id) => 
{
 return users.find(user => user.id === id)
};
const removeUser = (id) => {
   const index = users.findIndex(user => user.id == id);
   if(index !== -1){
     return users.splice(index,1)[0];
   }
}
const getUsersInRoom = () => users.filter(user => user.room == room);
const getAll = ()=>users
module.exports = {addUser , removeUser , getUser , getUsersInRoom, getAll}
// const addUser = () => {

// }
