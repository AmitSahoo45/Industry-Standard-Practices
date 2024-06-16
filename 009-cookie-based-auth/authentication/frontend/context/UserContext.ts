import React, { createContext, useContext, useState } from "react";

interface UserContextType {
    email: string | null;
    username: string | null;
    password: string | null;
    token: string | null;
    setUser: () => void;
}

const UserContext = createContext<UserContextType | null>(null);
