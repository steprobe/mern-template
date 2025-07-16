interface UserDTO {
  id: string;
  firebaseId: string;
  firstName?: string;
  lastName?: string;
  email: string;
  avatar?: string;
  isSuperUser: boolean;
  hasDevToolsAccess: boolean;
}

export default UserDTO;
