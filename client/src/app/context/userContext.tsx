'use client';
import {createContext, useContext, useState, ReactNode} from 'react';

type UserContextType = {
    user: any;
    setUser: (user: any) => void;
};

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useTheme must be used within UserContext');
    return context;
};

export default function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
