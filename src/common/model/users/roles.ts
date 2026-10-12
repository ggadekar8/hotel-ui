export const LoginRole = {
  Customer: 4,
  Admin: 1,
  Counter: 2,
  Waiter: 3,
};

export const getRoleName = (roleId: number): string => {
  switch (roleId) {
    case LoginRole.Customer:
      return "Customer";
    case LoginRole.Admin:
      return "Admin";
    case LoginRole.Counter:
      return "Counter";
    case LoginRole.Waiter:
      return "Waiter";
    default:
      return "Unknown role";
  }
};

export const getRoleHomePath = (roleId: number): string => {
  switch (roleId) {
    case LoginRole.Customer:
        return "/home";
    case LoginRole.Admin:
      return "/active-tables";
    case LoginRole.Waiter:
      return "/waiter-assign-tables";
    case LoginRole.Counter:
         return "/active-tables";
    default:
      return "/active-tables";
  }
};
 


