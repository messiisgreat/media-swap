"use server";

import { cookies } from "next/headers";

export const addAgeCheckedCookie = async () => {
  cookies().set("isAgeCheckedThrough", "true");
};
