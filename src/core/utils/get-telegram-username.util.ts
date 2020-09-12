interface User {
  /**
   * User‘s or bot’s first name
   */
  first_name: string;

  /**
   * User‘s or bot’s last name
   */
  last_name?: string;

  /**
   * User‘s or bot’s username
   */
  username?: string;
}

export const getTelegramUsername = (user: User) => {
  if (user.username) return `@${user.username}`;
  if (user.last_name) return `${user.first_name} ${user.last_name}`;
  return user.first_name;
};
