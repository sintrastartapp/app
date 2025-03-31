import { GetProjectRoleResponse } from "@/services";

export function isProjectAdmin(role: GetProjectRoleResponse) {
  return role === "admin" || role === "owner";
}

export function isUserAdmin(role: "USER" | "ADMIN") {
  return role === "ADMIN";
}
