import { User, UserFilterParams } from "@/api/types";
import { Rule } from "../rules/rule";

export const userFilterRules: Rule<UserFilterParams, User[]>[] = [
  {
    condition: (filters: UserFilterParams) => filters.active !== undefined,
    perform: (users, filters) : User[] => users.filter(user => user.active === filters.active)
  }
]

export const filterData = (users: User[], filters: UserFilterParams): User[] => {
  userFilterRules.forEach(rule => {
    if (rule.condition && rule.condition(filters)) {
      users = rule.perform(users, filters);
    }
  });
  return users;
}