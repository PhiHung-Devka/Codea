import { notification } from "antd";
import { createContext, useContext } from "react";

type NotificationApi = ReturnType<typeof notification.useNotification>[0];

const NotificationContext = createContext<NotificationApi | null>(null);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [api, contextHolder] = notification.useNotification();

    return (
        <NotificationContext.Provider value={api}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotify = () => {
    const context = useContext(NotificationContext);
    return context;
};
